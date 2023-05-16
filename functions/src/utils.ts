import { Context } from "koa";
import { Response } from './types';

const initialResponse: Response = {
  code: 200,
  message: 'ok',
  data: null,
  errors: null
}
export const response = (ctx: Context, { code, message, data, errors }: Response = initialResponse) => {
  ctx.body = {
    code,
    message,
    data,
    errors
  };
}