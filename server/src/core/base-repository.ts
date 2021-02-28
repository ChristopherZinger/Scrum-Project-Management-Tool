import { Model, ModelCtor, SaveOptions, FindOptions } from "sequelize";
import { injectable } from "inversify";

@injectable()
export abstract class BaseRepository<TModel extends Model<unknown, unknown>> {
	protected abstract model: ModelCtor<TModel>;

	public async exists(id: number): Promise<boolean> {
		const exists = await this.model.findAll({ where: { id } });
		return exists ? true : false;
	}

	public async findById(
		id: number,
		options?: FindOptions
	): Promise<TModel | null> {
		const result = await this.model.findOne<TModel>({
			where: { id },
			...options
		});
		return result || null;
	}

	public async findAllById(
		id: number,
		options?: FindOptions
	): Promise<TModel[]> {
		const result = await this.model.findAll<TModel>({
			where: { id },
			...options
		});
		return result;
	}

	public async save(model: TModel, options?: SaveOptions) {
		return await model.save(options);
	}
}
