import { Context } from 'koa';
import ytdl from 'ytdl-core';
import { v4 as uuid } from 'uuid';
import { response } from './utils';
import { create } from './repository';
import { VideoSources } from './types';

export async function getUrl(ctx: Context) {
  // await getVideo()
  response(ctx, {
    message: 'test',
    data: ctx.params,
  })
}

export async function createUrl(ctx: Context) {
  try {
    const body: any = ctx.request.body;
    const { formats } = await ytdl.getBasicInfo(body.url);
    const video = formats.find((format: { mimeType?: string }) => format.mimeType?.split(';')[0] === 'video/mp4');
    const now: number = Date.now();
    if (video) {
      const id = await create({
        url: video.url,
        source: VideoSources.Youtube,
        time: now
      });
      ctx.status = 200;
      response(ctx, {
        message: 'created',
        status: ctx.status,
        data: { id },
        errors: null
      })
    }
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
