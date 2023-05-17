import { ValidationErrorObject } from './types';
import { Context } from "koa";
import { isCourseraUrl, isYoutubeUrl, response } from "./utils";
import { get as getDoc } from './repository';

export async function create(ctx: Context, next: () => Promise<any>) {
  const errors: ValidationErrorObject[] = [];
  const url: string | undefined = (ctx.request.body as { url?: string })?.url;
  if (url) {
    if (!(isYoutubeUrl(url) || isCourseraUrl(url))) {
      errors.push({
        where: 'url',
        message: 'url is not valid Youtube or Coursera link',
      });
    }
  } else {
    errors.push({
      where: 'body',
      message: 'url is required in body'
    });
  }

  if (errors.length) {
    ctx.state = 422;
    response(ctx, {
      status: 422,
      message: 'Validation Error',
      data: null,
      errors
    })
  } else {
    await next();
  }
}

export async function get(ctx: Context, next: () => Promise<any>) {
  const errors: ValidationErrorObject[] = [];
  const key: string = ctx.params.key;
  const data = await getDoc(key);
  if (data) {
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    if (data.time + day < now) {
      errors.push({
        where: 'time',
        message: 'url is expired'
      });
    }
  } else {
    errors.push({
      where: 'key',
      message: 'Invalid key'
    });
  }
  if (errors.length) {
    ctx.state = 422;
    response(ctx, {
      status: 422,
      message: 'Validation Error',
      data: null,
      errors
    })
  } else {
    ctx.state.video = data;
    await next();
  }
}