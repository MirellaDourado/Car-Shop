import IVehicle from "./IVehicle"

export default interface IMotocycle extends IVehicle{
  category: string
  engineCapacity: number
}