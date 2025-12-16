import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// PROTOBUF AUTO-GENERATOR FOR KOTLIN COMPATIBILITY
// ============================================================================

export interface ProtobufField {
  name: string;
  type: string;
  number: number;
  kotlinWrapper?: string;
  isRepeated: boolean;
}

export interface ProtobufMessage {
  name: string;
  fields: ProtobufField[];
}

export interface MessageData {
  [key: string]: any;
}

export class ProtobufGenerator {
  private static schemas: Map<string, ProtobufMessage> = new Map();

  // ============================================================================
  // SCHEMA PARSING
  // ============================================================================

  /**
   * Parse a .proto file and extract message definitions
   */
  static parseSchema(schemaPath: string): ProtobufMessage[] {
    const content = fs.readFileSync(schemaPath, 'utf8');
    const messages: ProtobufMessage[] = [];
    
    // Split into lines and parse
    const lines = content.split('\n');
    let currentMessage: ProtobufMessage | null = null;
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Skip empty lines, comments, package, import, and syntax declarations
      if (!trimmedLine || 
          trimmedLine.startsWith('//') || 
          trimmedLine.startsWith('package') || 
          trimmedLine.startsWith('import') || 
          trimmedLine.startsWith('syntax')) continue;
      
      // Parse message definition
      const messageMatch = trimmedLine.match(/^message\s+(\w+)\s*\{$/);
      if (messageMatch) {
        currentMessage = {
          name: messageMatch[1],
          fields: []
        };
        continue;
      }
      
      // Parse field definition
      if (currentMessage && trimmedLine.includes('=')) {
        const field = this.parseField(trimmedLine);
        if (field) {
          currentMessage.fields.push(field);
        }
      }
      
      // End of message
      if (trimmedLine === '}') {
        if (currentMessage) {
          messages.push(currentMessage);
          this.schemas.set(currentMessage.name, currentMessage);
          currentMessage = null;
        }
      }
    }
    
    return messages;
  }

  /**
   * Parse a single field definition
   */
  private static parseField(line: string): ProtobufField | null {
    // Match: type field_name = number [kotlin_annotation];
    const fieldRegex = /^(\w+)\s+(\w+)\s*=\s*(\d+)(?:\s*\[([^\]]+)\])?/;
    const match = line.match(fieldRegex);
    
    if (!match) return null;
    
    const [, type, name, numberStr, annotation] = match;
    const number = parseInt(numberStr);
    
    // Parse Kotlin wrapper annotation
    let kotlinWrapper: string | undefined;
    if (annotation) {
      const wrapperMatch = annotation.match(/protokt\.property\)\.wrap\s*=\s*"([^"]+)"/);
      if (wrapperMatch) {
        kotlinWrapper = wrapperMatch[1];
      }
    }
    
    return {
      name,
      type,
      number,
      kotlinWrapper,
      isRepeated: type.startsWith('repeated ')
    };
  }

  // ============================================================================
  // ENCODING
  // ============================================================================

  /**
   * Encode a message object to protobuf wire format
   */
  static encode(messageType: string, data: MessageData): Buffer {
    const schema = this.schemas.get(messageType);
    if (!schema) {
      throw new Error(`Unknown message type: ${messageType}`);
    }
    
    const chunks: Buffer[] = [];
    
    for (const field of schema.fields) {
      // Try both snake_case and camelCase field names
      const snakeCaseValue = data[field.name];
      const camelCaseValue = data[this.snakeToCamel(field.name)];
      const value = snakeCaseValue !== undefined ? snakeCaseValue : camelCaseValue;
      
      if (value === undefined || value === null) continue;
      
      const encodedField = this.encodeField(field, value);
      if (encodedField) {
        chunks.push(encodedField);
      }
    }
    
    return Buffer.concat(chunks);
  }

  /**
   * Convert snake_case to camelCase
   */
  private static snakeToCamel(str: string): string {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  }

  /**
   * Encode a single field
   */
  private static encodeField(field: ProtobufField, value: any): Buffer | null {
    const wireType = this.getWireType(field.type);
    const fieldNumber = field.number;
    const tag = (fieldNumber << 3) | wireType;
    
    switch (wireType) {
      case 0: // Varint
        return this.encodeVarintField(tag, this.convertValue(field, value));
      case 1: // 64-bit
        return this.encode64BitField(tag, value);
      case 2: // Length-delimited
        return this.encodeLengthDelimitedField(tag, this.convertValue(field, value));
      case 5: // 32-bit
        return this.encode32BitField(tag, value);
      default:
        throw new Error(`Unsupported wire type: ${wireType}`);
    }
  }

  /**
   * Convert value based on Kotlin wrapper annotations
   */
  private static convertValue(field: ProtobufField, value: any): any {
    if (!field.kotlinWrapper) return value;
    
    switch (field.kotlinWrapper) {
      case 'java.util.UUID':
        return this.stringToUuidBytes(value);
      case 'java.time.LocalDate':
        return value; // Already in YYYY-MM-DD format
      default:
        return value;
    }
  }

  /**
   * Convert string UUID to 16-byte binary
   */
  private static stringToUuidBytes(uuidString: string): Buffer {
    // Remove hyphens and convert to bytes
    const cleanUuid = uuidString.replace(/-/g, '');
    const bytes = Buffer.alloc(16);
    
    for (let i = 0; i < 16; i++) {
      const hexByte = cleanUuid.substr(i * 2, 2);
      bytes[i] = parseInt(hexByte, 16);
    }
    
    return bytes;
  }

  /**
   * Get wire type for field type
   */
  private static getWireType(type: string): number {
    const cleanType = type.replace('repeated ', '');
    
    switch (cleanType) {
      case 'int32':
      case 'int64':
      case 'uint32':
      case 'uint64':
      case 'sint32':
      case 'sint64':
      case 'bool':
      case 'enum':
        return 0; // Varint
      case 'fixed64':
      case 'sfixed64':
      case 'double':
        return 1; // 64-bit
      case 'string':
      case 'bytes':
      case 'message':
        return 2; // Length-delimited
      case 'fixed32':
      case 'sfixed32':
      case 'float':
        return 5; // 32-bit
      default:
        throw new Error(`Unknown field type: ${type}`);
    }
  }

  // ============================================================================
  // WIRE FORMAT ENCODING
  // ============================================================================

  /**
   * Encode varint field (wire type 0)
   */
  private static encodeVarintField(tag: number, value: any): Buffer {
    const tagBuffer = this.encodeVarint(tag);
    const valueBuffer = this.encodeVarint(value);
    return Buffer.concat([tagBuffer, valueBuffer]);
  }

  /**
   * Encode 64-bit field (wire type 1)
   */
  private static encode64BitField(tag: number, value: number): Buffer {
    const tagBuffer = this.encodeVarint(tag);
    const valueBuffer = Buffer.alloc(8);
    valueBuffer.writeDoubleLE(value, 0);
    return Buffer.concat([tagBuffer, valueBuffer]);
  }

  /**
   * Encode length-delimited field (wire type 2)
   */
  private static encodeLengthDelimitedField(tag: number, value: any): Buffer {
    const tagBuffer = this.encodeVarint(tag);
    let dataBuffer: Buffer;
    
    if (Buffer.isBuffer(value)) {
      dataBuffer = value;
    } else if (typeof value === 'string') {
      dataBuffer = Buffer.from(value, 'utf8');
    } else {
      throw new Error(`Cannot encode value as length-delimited: ${typeof value}`);
    }
    
    const lengthBuffer = this.encodeVarint(dataBuffer.length);
    return Buffer.concat([tagBuffer, lengthBuffer, dataBuffer]);
  }

  /**
   * Encode 32-bit field (wire type 5)
   */
  private static encode32BitField(tag: number, value: number): Buffer {
    const tagBuffer = this.encodeVarint(tag);
    const valueBuffer = Buffer.alloc(4);
    valueBuffer.writeFloatLE(value, 0);
    return Buffer.concat([tagBuffer, valueBuffer]);
  }

  /**
   * Encode varint
   */
  private static encodeVarint(value: number): Buffer {
    const bytes: number[] = [];
    
    while (value >= 0x80) {
      bytes.push((value & 0x7F) | 0x80);
      value >>>= 7;
    }
    bytes.push(value & 0x7F);
    
    return Buffer.from(bytes);
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  /**
   * Load all schemas from configs directory
   */
  static loadAllSchemas(): void {
    const protobufDir = path.join(process.cwd(), 'configs', 'protobuf');
    const files = fs.readdirSync(protobufDir);
    
    for (const file of files) {
      if (file.endsWith('.proto')) {
        const schemaPath = path.join(protobufDir, file);
        this.parseSchema(schemaPath);
      }
    }
  }

  /**
   * Get available message types
   */
  static getAvailableMessageTypes(): string[] {
    return Array.from(this.schemas.keys());
  }

  /**
   * Validate message data against schema
   */
  static validateMessage(messageType: string, data: MessageData): string[] {
    const schema = this.schemas.get(messageType);
    if (!schema) {
      return [`Unknown message type: ${messageType}`];
    }
    
    const errors: string[] = [];
    
    for (const field of schema.fields) {
      // Try both snake_case and camelCase field names
      const snakeCaseValue = data[field.name];
      const camelCaseValue = data[this.snakeToCamel(field.name)];
      const value = snakeCaseValue !== undefined ? snakeCaseValue : camelCaseValue;
      
      if (value === undefined) {
        errors.push(`Missing required field: ${field.name} (or ${this.snakeToCamel(field.name)})`);
        continue;
      }
      
      // Validate UUID format
      if (field.kotlinWrapper === 'java.util.UUID' && typeof value === 'string') {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(value)) {
          errors.push(`Invalid UUID format for field ${field.name}: ${value}`);
        }
      }
      
      // Validate date format
      if (field.kotlinWrapper === 'java.time.LocalDate' && typeof value === 'string') {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(value)) {
          errors.push(`Invalid date format for field ${field.name}: ${value}. Expected YYYY-MM-DD`);
        }
      }
    }
    
    return errors;
  }

  /**
   * Generate TypeScript interface for a message type
   */
  static generateTypeScriptInterface(messageType: string): string {
    const schema = this.schemas.get(messageType);
    if (!schema) {
      throw new Error(`Unknown message type: ${messageType}`);
    }
    
    let interfaceCode = `export interface ${messageType} {\n`;
    
    for (const field of schema.fields) {
      let tsType = this.getTypeScriptType(field);
      if (field.isRepeated) {
        tsType = `${tsType}[]`;
      }
      interfaceCode += `  ${field.name}: ${tsType};\n`;
    }
    
    interfaceCode += '}\n';
    return interfaceCode;
  }

  /**
   * Get TypeScript type for a protobuf field
   */
  private static getTypeScriptType(field: ProtobufField): string {
    if (field.kotlinWrapper) {
      switch (field.kotlinWrapper) {
        case 'java.util.UUID':
          return 'string';
        case 'java.time.LocalDate':
          return 'string';
        default:
          return 'any';
      }
    }
    
    switch (field.type) {
      case 'string':
        return 'string';
      case 'int32':
      case 'int64':
      case 'uint32':
      case 'uint64':
      case 'sint32':
      case 'sint64':
        return 'number';
      case 'bool':
        return 'boolean';
      case 'bytes':
        return 'Buffer';
      case 'float':
      case 'double':
        return 'number';
      default:
        return 'any';
    }
  }
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/*
// Load schemas on startup
ProtobufGenerator.loadAllSchemas();

// Usage example:
const payrollData = {
  customerUuid: "550e8400-e29b-41d4-a716-446655440409",
  payPeriodUuid: "a0e0d139-5c98-462f-8c1b-4f670aeb0c07",
  checkDate: "2025-01-01",
  isAch: true
};

// Validate data
const errors = ProtobufGenerator.validateMessage('PayrollPosted', payrollData);
if (errors.length > 0) {
  console.error('Validation errors:', errors);
  return;
}

// Encode to protobuf
const buffer = ProtobufGenerator.encode('PayrollPosted', payrollData);

// Send to Pulsar
await producer.send({
  data: buffer,
  properties: { 'x-pulsar-urn': PULSAR_URNS.PAYROLL_POSTED }
});
*/ 