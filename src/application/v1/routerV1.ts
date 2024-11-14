import { Router } from 'express';
import PingControllerFactory from '../../infrastructure/factories/controller/PingControllerFactory';
import CreateCategoryControllerFactory from '../../infrastructure/factories/controller/CreateCategoryControllerFactory';

const routerV1 = Router();

(async () => {
  routerV1.get('/ping', PingControllerFactory.make().execute);
  routerV1.post('/category', CreateCategoryControllerFactory.make().execute);
})();

export default routerV1;
