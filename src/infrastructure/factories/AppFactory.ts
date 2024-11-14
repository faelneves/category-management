import { RequestHandler, Router, json } from 'express';
import { AppConfig } from '../../config/AppConfig';
import App from '../../application/App';

export default class AppFactory {
  static async make(routes: Router): Promise<App> {
    const middlewares: RequestHandler[] = [];

    middlewares.push(json());

    return new App({
      port: AppConfig.PORT,
      routes,
      middlewares,
      environment: AppConfig.APP_ENVIRONMENT,
    });
  }
}
