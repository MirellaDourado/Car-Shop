import Car from "../Domains/Car";
import ICar from "../Interfaces/ICar";
import CarODM from "../Models/CarODM";

export default class CarService {
  public async create (car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car)
    return new Car(newCar);
  }
}