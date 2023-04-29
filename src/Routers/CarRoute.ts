import { Router, Response, Request } from 'express';
import CarController from '../Controllers/CarController';

const carRouter = Router();

carRouter.post('/', (req: Request, res: Response) => new CarController(req, res).create());

carRouter.get('/', (req: Request, res: Response) => new CarController(req, res).getAll());

carRouter.get('/:id', (req: Request, res: Response) => new CarController(req, res).getById());


export default carRouter;