/**
 * QBO Timestamp Utilities
 * Helper functions for generating QuickBooks Online-compatible UTC timestamps
 */

/**
 * Generates a QuickBooks Online-friendly UTC timestamp in ISO8601 format.
 * Example output: "2025-08-14T10:07:38Z"
 *
 * @param offsetMinutes Number of minutes to offset from the current time (optional)
 * @param baseDate Optional base Date object (defaults to current time)
 * @returns Formatted UTC timestamp string without milliseconds
 */
export function getQboUtcTimestamp(offsetMinutes: number = 0, baseDate: Date = new Date()): string {
  const date = new Date(baseDate);
  date.setMinutes(date.getMinutes() + offsetMinutes);
  return date.toISOString().split('.')[0] + 'Z';
}

/**
 * Gets the current QBO UTC timestamp
 * @returns Current timestamp in QBO format
 */
export function getCurrentQboTimestamp(): string {
  return getQboUtcTimestamp();
}

/**
 * Gets a QBO timestamp for a specific number of minutes in the future
 * @param minutes Number of minutes to add
 * @returns Future timestamp in QBO format
 */
export function getFutureQboTimestamp(minutes: number): string {
  return getQboUtcTimestamp(minutes);
}

/**
 * Gets a QBO timestamp for a specific number of minutes in the past
 * @param minutes Number of minutes to subtract
 * @returns Past timestamp in QBO format
 */
export function getPastQboTimestamp(minutes: number): string {
  return getQboUtcTimestamp(-minutes);
}

// Example usage:
// const nowTimestamp = getQboUtcTimestamp();
// console.log(nowTimestamp); // e.g. "2025-08-14T10:07:38Z"
//
// const fiveMinutesLater = getQboUtcTimestamp(5);
// console.log(fiveMinutesLater); // e.g. "2025-08-14T10:12:38Z"
//
// const tenMinutesAgo = getQboUtcTimestamp(-10);
// console.log(tenMinutesAgo); // e.g. "2025-08-14T09:57:38Z" 