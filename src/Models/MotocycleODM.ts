import {
  Model,
  Schema,
  model,
  models,
} from 'mongoose';
import IMotocycle from '../Interfaces/IMotocycle';
  
export default class CarODM {
  private schema: Schema;
  private model: Model<IMotocycle>;

  constructor() {
    this.schema = new Schema<IMotocycle>(
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
              engineCapacity: ret.seatsQty,
              category: ret.doorsQty,
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
    this.model = models.Motocycle || model('Motocycle', this.schema);
  }

  public async create(moto: IMotocycle): Promise<IMotocycle> {
    return this.model.create({ ...moto });
  }
}