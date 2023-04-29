import IMotocycle from '../Interfaces/IMotocycle';
import MotocycleODM from '../Models/MotocycleODM';

export default class CarService {
  public async create(motocycle: IMotocycle) {
    const motocycleODM = new MotocycleODM();
    const newMotocycle = await motocycleODM.create(motocycle);
    return {
      id: newMotocycle.id,
      model: newMotocycle.model,
      status: newMotocycle.status,
      year: newMotocycle.year,
      color: newMotocycle.color,
      category: newMotocycle.category,
      engineCapacity: newMotocycle.engineCapacity,
      buyValue: newMotocycle.buyValue,
    };
  }
}