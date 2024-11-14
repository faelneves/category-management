import { Router } from 'express';
import PingControllerFactory from '../../infrastructure/factories/controller/PingControllerFactory';
import CreateCategoryControllerFactory from '../../infrastructure/factories/controller/CreateCategoryControllerFactory';
import { validateSchema } from './middlewares/ValidateSchema';
import createCategorySchema from './schemas/CreateCategorySchema';

const routerV1 = Router();

(async () => {
  routerV1.get('/ping', PingControllerFactory.make().execute);
  routerV1.post(
    '/category',
    validateSchema(createCategorySchema, 'body'),
    CreateCategoryControllerFactory.make().execute,
  );
})();

export default routerV1;
