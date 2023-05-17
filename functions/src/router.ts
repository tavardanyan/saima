import Router from '@koa/router';
import { Methods, Route } from "./types";
import * as services from './services';
import * as validator from './validator';

const router = new Router();

const routes: Route[] = [
  {
    url: '/:key',
    method: Methods.GET,
    handler: services.getUrl,
    validator: validator.get
  },
  {
    url: '/',
    method: Methods.POST,
    handler: services.createUrl,
    validator: validator.create
  }
];

routes.forEach(({method, url, handler, validator}: Route) => {
  router[method](url, validator, handler);
});

export default router;