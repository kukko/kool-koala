let originalLog: (...data: any[]) => void;
export function mockConsole() {
  originalLog = console.log;
  console.log = () => { };
}
export function restoreConsole() {
  console.log = originalLog;
}
