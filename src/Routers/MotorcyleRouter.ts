import { Router, Response, Request, NextFunction } from 'express';
import MotocycleController from '../Controllers/MotocycleController';

const motorcycleRouter = Router();

motorcycleRouter.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => new MotocycleController(req, res, next).create(),
);

export default motorcycleRouter;