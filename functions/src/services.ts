import { Context } from 'koa';
import { response } from './utils';

export async function getUrl(ctx: Context) {
  
}

export async function createUrl(ctx: Context) {
  // const { formats } = await ytdl.getBasicInfo('https://www.youtube.com/watch?v=BJFkmXPZbF0');
  // const video = formats.find((format) => format.mimeType.split(';')[0] === 'video/mp4')
  // console.log(video);
  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'application/json');
  // res.end(JSON.stringify({ msg: 'ok', video}));
  ctx.status = 200;
  response(ctx, {
    message: 'test',
    data: ctx.params,
  })
}
