import { Context } from 'koa';
import ytdl from 'ytdl-core';
import pt from 'puppeteer';
import { isYoutubeUrl, response } from './utils';
import { create, remove } from './repository';
import { Video } from './types';

export async function getUrl(ctx: Context) {
  const data: Video = ctx.state.video;
  let url: any;
  if (isYoutubeUrl(data.url)) {
    const { formats } = await ytdl.getBasicInfo(data.url);
    const video = formats.find((format: { mimeType?: string }) => format.mimeType?.split(';')[0] === 'video/mp4');
    url = video ? video.url : '';
  } else {
    const browser = await pt.launch({
      headless: "new"
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768});
    await page.goto(data.url);
    await page.click('button[data-track-component="click_play_video_button"]');
    url = await page.$eval('#vjs_video_3_html5_api', (el: any) => el.getAttribute('src'));
    await browser.close();
  }
  await remove(ctx.state.video.id)
  response(ctx, {
    message: 'ok',
    status: 200,
    data: { url },
    errors: null
  });
}

export async function createUrl(ctx: Context) {
  try {
    const body: any = ctx.request.body;
    const now: number = Date.now(); 
    const id = await create({
      url: body.url,
      time: now
    });
    console.log(id);
    ctx.status = 201;
    await response(ctx, {
      message: 'created',
      status: ctx.status,
      data: { id },
      errors: null
    });
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
