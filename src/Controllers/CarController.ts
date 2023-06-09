import { Request, Response, NextFunction } from 'express';
import CarService from '../Services/CarService';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const car = this.req.body;
    try {
      if (car.status === undefined) car.status = false;
      const newCar = await this.service.create(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      return this.next(error);
    }
  }

  public async getAll() {
    try {
      const allCars = await this.service.getAll();
      return this.res.status(200).json(allCars);
    } catch (error) {
      return this.next(error);
    }
  }

  public async getById() {
    const { id } = this.req.params;
    try {
      const car = await this.service.getById(id);
      return this.res.status(200).json(car);
    } catch (error) {
      return this.next(error);
    }
  }

  public async update() {
    const { id } = this.req.params;
    const carUpdate = this.req.body;
    try {
      const carUpdated = await this.service.update(id, carUpdate);
      return this.res.status(200).json(carUpdated);
    } catch (error) {
      return this.next(error);
    }
  }
}