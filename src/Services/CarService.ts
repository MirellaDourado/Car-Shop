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
}