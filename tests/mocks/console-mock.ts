let originalLog: (...data: any[]) => void;
export function mockConsole() {
  originalLog = console.log;
  console.log = () => { };
}
export function restoreConsole() {
  if (originalLog === undefined) {
    throw new Error('Console was not mocked');
  }
  console.log = originalLog;
  originalLog = undefined;
}
