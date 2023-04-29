import { Request, Response, NextFunction } from 'express';
import MotocycleService from '../Services/MotocycleService';

export default class MotocycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotocycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotocycleService();
  }

  public async create() {
    const motocycle = this.req.body;
    try {
      if (motocycle.status === undefined) motocycle.status = false;
      const newMotocycle = await this.service.create(motocycle);
      return this.res.status(201).json(newMotocycle);
    } catch (error) {
      return this.next(error);
    }
  }
}