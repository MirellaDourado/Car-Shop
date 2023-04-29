import {
  Model,
  Schema,
  model,
  models,
} from 'mongoose';

export default abstract class AbstractODM<T> {
  protected schema: Schema;
  protected model: Model<T>;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.model = models[modelName] || model(modelName, schema);
  }

  public async create(content: T): Promise<T> {
    return this.model.create({ ...content });
  }

  public async getAll(): Promise<T[]> {
    return this.model.find();
  }

  public async getById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  public async update(id: string, contentUpdate: T): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, contentUpdate, { new: true });
  }
}