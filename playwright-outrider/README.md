# Playwright Outrider 1.3.0
2025-08-07 Wednesday

## Prerequisites:
Install nodejs 16+ (LTS)

## Install:
```bash
npm install
npx playwright install
```

## Configure:
See the `.env` file

## Run:
```bash
# Run all tests
npx playwright test

# Run specific test suites
npx playwright test tests/ui/                    # UI tests only
npx playwright test tests/api/                   # API tests only
npx playwright test tests/api/pulsar/            # Pulsar tests only
npx playwright test tests/api/qbo/               # QBO API tests only
npx playwright test tests/api/accounting/        # Accounting API tests only

# Run specific test file
npx playwright test tests/api/pulsar/pulsar_engineering_ec_payroll.spec.ts --reporter=list
```

## Release Notes:

### 1.3.0 (7th August 2025, Wednesday)
Enhanced release with Pulsar E2E testing and QBO API integration.

**New Features:**
- **Pulsar E2E Testing**: Complete end-to-end payroll processing flow
  - Payroll Posted → Dev Logic → Payroll Transaction → Dev Logic → Accounting Journal
  - Real-time message subscription and decoding
  - Protobuf message encoding/decoding with UUID conversion
  - Serialized test execution with shared resources
- **QBO API Integration**: QuickBooks Online API testing
  - OAuth2 refresh token authentication
  - Journal entry retrieval and validation
  - Dynamic token management
- **Protobuf Generator**: Custom utility for protobuf message handling
  - JSON to protobuf wire format conversion
  - Message validation against schemas
  - Kotlin-compatible encoding
- **Enhanced UI Testing**: Improved Pendo handling and load state management
  - Month picker functionality
  - Robust Pendo popup handling
  - Optimized page load states

**Architecture:**
```
playwright-outrider/
├── .github/
│   └── (GitHub Actions workflows)        # CI/CD automation
├── configs/
│   ├── constants.ts                      # Centralized configuration
│   └── protobuf/
│       ├── payroll_posted.proto          # Payroll Posted message schema
│       ├── payroll_transaction.proto     # Payroll Transaction message schema
│       ├── accounting_journal.proto      # Accounting Journal message schema
│       ├── protokt.proto                 # Kotlin compatibility annotations
│       └── descriptor.proto              # Protobuf field extensions
├── fixtures/
│   └── (custom Playwright test wrappers) # Shared test setup
├── pages/
│   ├── LoginPage.ts                      # Login page interactions
│   ├── AccountingPage.ts                 # Accounting page interactions
│   └── AccountingConnectionsPage.ts      # Connection management interactions
├── playwright-reports/
│   └── (HTML reports and screenshots)    # Test execution reports
├── scripts/
│   └── (automation scripts)              # Build and deployment scripts
├── test-results/
│   └── (test execution artifacts)        # Test results and debugging data
├── tests/
│   ├── ui/
│   │   ├── accounting_activity.spec.ts       # Accounting activity UI tests
│   │   ├── accounting_connections.spec.ts     # Accounting connections UI tests
│   │   ├── accounting_payroll_assignments.spec.ts  # Payroll assignments UI tests
│   │   ├── accounting_payroll_settings.spec.ts     # Payroll settings UI tests
│   │   └── accounting_permissions.spec.ts     # Accounting permissions UI tests
│   └── api/
│       ├── pulsar/
│       │   └── pulsar_engineering_ec_payroll.spec.ts  # Pulsar messaging tests
│       ├── qbo/
│       │   └── qbo_journal_api.spec.ts   # QBO API tests
│       └── accounting/
│           └── paygroup_connections_api.spec.ts       # Accounting API tests
├── utils/
│   ├── protobufGenerator.ts              # Protobuf encoding/validation utility
│   ├── getPulsarToken.ts                 # Pulsar authentication
│   ├── testHelpers.ts                    # Common test utilities
│   └── apiHelpers.ts                     # API testing utilities
├── .env                                 # Environment variables
├── package.json                          # Project dependencies
├── package-lock.json                     # Dependency lock file
├── playwright.config.ts                  # Playwright configuration
├── tsconfig.json                         # TypeScript configuration
└── README.md                             # Project documentation
```

**Key Test Suites:**

### Pulsar E2E Test (`pulsar_engineering_ec_payroll.spec.ts`)
Complete payroll processing flow with 5 serialized test cases:
1. **Validate Pulsar connection and subscriptions** - Ensures connectivity and topic subscriptions
2. **Send PayrollPosted message successfully** - Sends payroll data to dev logic
3. **Receive and decode PayrollTransaction message** - Receives and processes transaction response
4. **Receive and decode Accounting Journal message** - Receives and processes journal creation
5. **Close all Pulsar connections** - Cleanup and resource management

### QBO API Test (`qbo_journal_api.spec.ts`)
QuickBooks Online integration:
- OAuth2 authentication using refresh tokens
- Journal entry retrieval and validation
- Dynamic token management and error handling

### UI Tests (`accounting_activity.spec.ts`)
Enhanced UI automation:
- Month picker functionality
- Robust Pendo popup handling
- Optimized page load states (domcontentloaded vs networkidle)

**Benefits:**
- **Scalable**: Easily extendable for new domains, microservices, or messaging flows
- **Maintainable**: Clear separation of concerns via structured folders and modular design
- **Efficient**: Reusable utilities, fixtures, and centralized configuration enable rapid test development
- **CI-Ready**: GitHub Actions integrated for seamless automation
- **Onboarding Friendly**: Logical layout ensures quick ramp-up for new team members
- **Real-time Testing**: Pulsar integration enables testing of asynchronous messaging flows
- **API Integration**: Comprehensive API testing capabilities for external services

**Recent Improvements:**
- Cleaned up console logging for better readability
- Optimized test execution with shared resources
- Enhanced error handling and validation
- Streamlined protobuf message processing
- Improved test organization and naming conventions
