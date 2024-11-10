import routes from './application/routes';
import AppFactory from './infrastructure/factories/AppFactory';

(async () => {
  const app = await AppFactory.make(routes);
  await app.listen();
})();
