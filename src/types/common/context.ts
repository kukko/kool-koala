import { ParameterizedContext } from "koa";
import { State } from "./state";

export type Context = ParameterizedContext<State>;