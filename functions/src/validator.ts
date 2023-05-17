import { ValidationErrorObject } from './types';
import { Context } from "koa";
import { isCourseraUrl, isYoutubeUrl, response } from "./utils";
import { get as getDoc } from './repository';

export async function create(ctx: Context, next: () => Promise<any>) {
  const errors: ValidationErrorObject[] = [];
  const body: { url: string } = ctx.body as { url: string };
  if (body.url) {
    if (!isYoutubeUrl(body.url) || !isCourseraUrl(body.url)) {
      errors.push({
        where: 'body',
        message: 'url is required in body'
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
    next();
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
    next();
  }
}