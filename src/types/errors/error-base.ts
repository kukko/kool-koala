import { StatusCode } from "../../common/status-code";

export class ErrorBase extends Error {
  constructor(public message: string, protected statusCode: StatusCode, protected error?: Error) {
    super(message);
  }
  public getStatusCode(): StatusCode {
    return this.statusCode;
  }
  public getError(): Error | undefined {
    return this.error;
  }
}