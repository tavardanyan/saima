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

export const isYoutubeUrl = (url: string): boolean => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([\w-]{11})$/;
  return youtubeRegex.test(url);
}

export const isCourseraUrl = (url: string): boolean => {
  const courseraRegex = /^(https?:\/\/)?(www\.)?coursera\.org\/learn\/[\w-]+\/lecture\/[\w-]+$/;
  return courseraRegex.test(url);
}