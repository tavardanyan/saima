import Router from '@koa/router';
import { Methods, Route } from "./types";
import * as services from './services';

const router = new Router();

const routes: Route[] = [
  {
    url: '/:key',
    method: Methods.GET,
    handler: services.getUrl
  },
  {
    url: '/',
    method: Methods.POST,
    handler: services.createUrl
  }
];

routes.forEach(({method, url, handler}: Route) => {
  router[method](url, handler);
});

export default router;