// Generate unique run ID only once per test session using environment variable
export function getRunId(): string {
  // Check if run ID is already stored in environment
  if (!process.env.PLAYWRIGHT_RUN_ID) {
    const now = new Date();
    const date = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const time = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // HH-MM-SS
    //const runNumber = Math.floor(Math.random() * 1000); // 0-999
    
    process.env.PLAYWRIGHT_RUN_ID = `${date}-${time}`;
  }
  return process.env.PLAYWRIGHT_RUN_ID;
} 