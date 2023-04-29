import { Request, Response } from 'express';
import CarService from '../Services/CarService';

export default class CarController {
  private req: Request;
  private res: Response;
  private service: CarService;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
    this.service = new CarService();
  }

  public async create() {
    const car = this.req.body;
    try {
      if (car.status === undefined) car.status = false;
      const newCar = await this.service.create(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      return this.res.status(500).json({ message: error });
    }
  }

  public async getAll() {
    try {
      const allCars = await this.service.getAll();
      return this.res.status(200).json(allCars);
    } catch (error) {
      return this.res.status(500).json({ message: error });
    }
  }

  public async getById() {
    const { id } = this.req.params
    try {
      const { type, message } = await this.service.getById(id);
      if (type !== 200) return this.res.status(type).json({ message })
      return this.res.status(type).json(message);
    } catch (error) {
      return this.res.status(500).json({ message: error });
    }
  }
}