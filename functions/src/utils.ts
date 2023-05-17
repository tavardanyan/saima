import { Context } from "koa";
import { Response } from './types';

const initialResponse: Response = {
  status: 200,
  message: 'ok',
  data: null,
  errors: null
}
export const response = (ctx: Context, { status, message, data, errors }: Response = initialResponse) => {
  ctx.body = {
    status,
    message,
    data,
    errors
  };
}