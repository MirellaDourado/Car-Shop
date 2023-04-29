import { Router, Response, Request, NextFunction } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motorcycleRouter = Router();

motorcycleRouter.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => new MotorcycleController(req, res, next)
    .create(),
);

motorcycleRouter.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => new MotorcycleController(req, res, next)
    .getAll(),
);

motorcycleRouter.get(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => new MotorcycleController(req, res, next)
    .getById(),
);

export default motorcycleRouter;