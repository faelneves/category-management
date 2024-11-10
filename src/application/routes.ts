import { Router } from 'express';
import routerV1 from './v1/routerV1';

const routes = Router();

routes.use('/category/v1', routerV1);

export default routes;
