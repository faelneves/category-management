import { Router } from 'express';
import PingControllerFactory from '../../infrastructure/factories/controller/PingControllerFactory';
import CreateCategoryControllerFactory from '../../infrastructure/factories/controller/CreateCategoryControllerFactory';
import { validateSchema } from './middlewares/ValidateSchema';
import createCategorySchema from './schemas/CreateCategorySchema';
import GetCategoryControllerFactory from '../../infrastructure/factories/controller/GetCategoryControllerFactory';
import CategoryIdSchema from './schemas/CategoryIdSchema';
import updateCategorySchema from './schemas/UpdateCategorySchema';
import UpdateCategoryControllerFactory from '../../infrastructure/factories/controller/UpdateCategoryControllerFactory';
import DeleteCategoryControllerFactory from '../../infrastructure/factories/controller/DeleteCategoryControllerFactory';

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

  routerV1.patch(
    '/category/:id',
    validateSchema(CategoryIdSchema, 'params'),
    validateSchema(updateCategorySchema, 'body'),
    UpdateCategoryControllerFactory.make().execute,
  );

  routerV1.delete(
    '/category/:id',
    validateSchema(CategoryIdSchema, 'params'),
    DeleteCategoryControllerFactory.make().execute,
  );
})();

export default routerV1;
