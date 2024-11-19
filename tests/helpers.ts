import supertest, { Test } from 'supertest';
import { validateSchema } from '../src/application/v1/middlewares/ValidateSchema';
import { AppConfig } from '../src/config/AppConfig';
import { json, RequestHandler, Router } from 'express';
import App from '../src/application/App';
import TestAgent from 'supertest/lib/agent';
import updateCategorySchema from '../src/application/v1/schemas/UpdateCategorySchema';
import createCategorySchema from '../src/application/v1/schemas/CreateCategorySchema';
import listCategorySchema from '../src/application/v1/schemas/ListCategorySchema';
import CategoryIdSchema from '../src/application/v1/schemas/CategoryIdSchema';
import CreateCategoryControllerFactory from '../src/infrastructure/factories/controller/CreateCategoryControllerFactory';
import DeleteCategoryControllerFactory from '../src/infrastructure/factories/controller/DeleteCategoryControllerFactory';
import GetCategoryControllerFactory from '../src/infrastructure/factories/controller/GetCategoryControllerFactory';
import UpdateCategoryControllerFactory from '../src/infrastructure/factories/controller/UpdateCategoryControllerFactory';
import ListCategoryControllerFactory from '../src/infrastructure/factories/controller/ListCategoryControllerFactory';

const routes = (): Router => {
  const router = Router();

  router.post(
    '/v1/category',
    validateSchema(createCategorySchema, 'body'),
    CreateCategoryControllerFactory.make().execute,
  );

  router.delete(
    '/v1/category/:id',
    validateSchema(CategoryIdSchema, 'params'),
    DeleteCategoryControllerFactory.make().execute,
  );

  router.get(
    '/v1/category/:id',
    validateSchema(CategoryIdSchema, 'params'),
    GetCategoryControllerFactory.make().execute,
  );

  router.patch(
    '/v1/category/:id',
    validateSchema(CategoryIdSchema, 'params'),
    validateSchema(updateCategorySchema, 'body'),
    UpdateCategoryControllerFactory.make().execute,
  );

  router.get('/v1/category', validateSchema(listCategorySchema, 'query'), ListCategoryControllerFactory.make().execute);

  return router;
};

export const mockApp = (): App => {
  const middlewares: RequestHandler[] = [json()];

  const app = new App({
    port: AppConfig.PORT,
    routes: routes(),
    middlewares,
    environment: AppConfig.APP_ENVIRONMENT,
  });

  return app;
};

export const mockServer = (): TestAgent<Test> => {
  const app = mockApp();
  return supertest(app.app);
};
