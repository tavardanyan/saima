import { Context } from 'koa';
import ytdl from 'ytdl-core';
import { response } from './utils';
import { create, get } from './repository';
import { VideoSources } from './types';

export async function getUrl(ctx: Context) {
  const key: string = ctx.params.key;
  const data = await get(key);
  if (data) {
    const { formats } = await ytdl.getBasicInfo(data.url);
    const video = formats.find((format: { mimeType?: string }) => format.mimeType?.split(';')[0] === 'video/mp4');
    response(ctx, {
      message: 'test',
      data: { url: video?.url },
    })
  }
}

export async function createUrl(ctx: Context) {
  try {
    const body: any = ctx.request.body;
    const now: number = Date.now(); 
    const id = await create({
      url: body.url,
      time: now
    });
    ctx.status = 200;
    response(ctx, {
      message: 'created',
      status: ctx.status,
      data: { id },
      errors: null
    })
  } catch (e) {
    response(ctx, {
      message: 'something went wrong',
      status: 500,
      data: null,
      errors: e
    });
    throw e;
  }
}
