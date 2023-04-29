import { Router, Response, Request, NextFunction } from 'express';
import CarController from '../Controllers/CarController';

const carRouter = Router();

carRouter.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => new CarController(req, res, next).create(),
);

carRouter.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => new CarController(req, res, next).getAll(),
);

carRouter.get(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => new CarController(req, res, next).getById(),
);

export default carRouter;