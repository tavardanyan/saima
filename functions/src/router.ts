import Router from '@koa/router';
import * as services from './services';

const router = new Router();

router.get('/:key', services.getUrl);
router.post('/:key', services.createUrl);

export default router;