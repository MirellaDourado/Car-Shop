import { Schema } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import AbstractODM from './AbstractODM';
  
export default class MotorcycleODM extends AbstractODM<IMotorcycle> {
  constructor() {
    const schema = new Schema<IMotorcycle>(
      {
        model: { type: String, required: true },
        year: { type: Number, required: true },
        color: { type: String, required: true },
        status: { type: Boolean },
        buyValue: { type: Number, required: true },
        category: { type: String, required: true },
        engineCapacity: { type: Number, required: true },
      },
      {
        toJSON: {
          transform(doc, ret) {
            const transformed = {
              id: ret._id,
              buyValue: ret.buyValue,
              engineCapacity: ret.engineCapacity,
              category: ret.category,
              color: ret.color,
              model: ret.model,
              year: ret.year,
              status: ret.status,
            };
            return transformed;
          },
        },
      },
    );
    super(schema, 'Motorcycle');
  }
}