import IMotocycle from '../Interfaces/IMotorcycle';
import { HttpException } from '../Middlewares/HttpException';
import MotorcycleODM from '../Models/MotorcycleODM';

export default class MotorcycleService {
  public async create(motocycle: IMotocycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motocycle);
    return {
      id: newMotorcycle.id,
      model: newMotorcycle.model,
      status: newMotorcycle.status,
      year: newMotorcycle.year,
      color: newMotorcycle.color,
      category: newMotorcycle.category,
      engineCapacity: newMotorcycle.engineCapacity,
      buyValue: newMotorcycle.buyValue,
    };
  }

  public async getAll() {
    const motorcycleODM = new MotorcycleODM();
    const allMotorcycles = await motorcycleODM.getAll();
    return allMotorcycles;
  }

  public async getById(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.getById(id);
    if(motorcycle === null) throw new HttpException(404, 'Motorcycle not found')
    return motorcycle;
  }
}