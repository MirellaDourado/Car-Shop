import { Router, Response, Request } from 'express';
import CarController from '../Controllers/CarController';

const carRouter = Router();

carRouter.post('/', (req: Request, res: Response) => new CarController(req, res).create());

export default carRouter;