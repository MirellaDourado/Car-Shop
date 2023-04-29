import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarService {
  public async create(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return {
      id: newCar.id,
      model: newCar.model,
      status: newCar.status,
      year: newCar.year,
      color: newCar.color,
      seatsQty: newCar.seatsQty,
      doorsQty: newCar.doorsQty,
      buyValue: newCar.buyValue,
    };
  }

  public async getAll() {
    const carODM = new CarODM;
    const allCars = await carODM.getAll();
    return allCars;
  }

  public async getById(id: string): Promise<{ type: number, message: string | ICar }> {
    const carODM = new CarODM;
    const car = await carODM.getById(id);
    if (car === null) return { type: 404, message:'Car not found' }
    return { type: 200, message: car };
  }

}