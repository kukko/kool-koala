import { StatusCode } from "../common";
import { BaseResponse, ErrorBase } from "../types";
import { Context } from "../types/common/context";

export const errorHandlerMiddleware = async (context: Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error) {
    console.log(error);
    if (error instanceof ErrorBase) {
      context.status = error.getStatusCode();
      context.body = <BaseResponse>{
        success: false,
        message: error.message
      };
    }
    else {
      context.status = StatusCode.INTERNAL_SERVER_ERROR;
      context.body = <BaseResponse>{
        success: false
      };
    }
  }
}
