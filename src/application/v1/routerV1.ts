import { Router } from 'express';
import PingControllerFactory from '../../infrastructure/factories/controller/PingControllerFactory';
import CreateCategoryControllerFactory from '../../infrastructure/factories/controller/CreateCategoryControllerFactory';
import { validateSchema } from './middlewares/ValidateSchema';
import createCategorySchema from './schemas/CreateCategorySchema';
import GetCategoryControllerFactory from '../../infrastructure/factories/controller/GetCategoryControllerFactory';
import CategoryIdSchema from './schemas/CategoryIdSchema';

const routerV1 = Router();

(async () => {
  routerV1.get('/ping', PingControllerFactory.make().execute);

  routerV1.post(
    '/category',
    validateSchema(createCategorySchema, 'body'),
    CreateCategoryControllerFactory.make().execute,
  );

  routerV1.get(
    '/category/:id',
    validateSchema(CategoryIdSchema, 'params'),
    GetCategoryControllerFactory.make().execute,
  );
})();

export default routerV1;
