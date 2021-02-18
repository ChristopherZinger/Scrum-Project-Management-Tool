import { Model, ModelCtor, SaveOptions } from "sequelize";
import { injectable } from "inversify";

@injectable()
export abstract class BaseRepository<TModel extends Model<unknown, unknown>> {
	protected abstract model: ModelCtor<TModel>;

	public async exists(id: number): Promise<boolean> {
		const exists = await this.model.findAll({ where: { id } });
		return exists ? true : false;
	}

	public async findById(id: number): Promise<TModel | null> {
		const result = await this.model.findOne<TModel>({ where: { id } });
		return result || null;
	}

	public async save(model: TModel, options?: SaveOptions) {
		return await model.save(options);
	}
}
