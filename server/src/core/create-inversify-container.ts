import { Container } from "inversify";
import * as glob from "glob";

class AutoBinder {
	private ignorePatterns: RegExp[] = [];

	public constructor(private container: Container) {}

	public autobind(globs: string[]) {
		for (const pattern of globs) {
			const matches = glob.sync(pattern);

			for (const match of matches) {
				this.autobindFile(match);
			}
		}
	}

	public ignore(...patterns: RegExp[]) {
		this.ignorePatterns.push(...patterns);

		return this;
	}

	private autobindFile(file: string) {
		for (const pattern of this.ignorePatterns) {
			if (pattern.test(file)) {
				return;
			}
		}

		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const exports = require(file);

		for (const clas of Object.keys(exports)) {
			// Checks if the class has been decorated by @injectable and is not already bound in the container.
			if (
				Reflect.hasMetadata("inversify:paramtypes", exports[clas]) &&
				!this.container.isBound(exports[clas])
			) {
				this.container.bind(exports[clas]).toSelf();
			}
		}
	}
}

const container = new Container();

new AutoBinder(container).autobind([
	`${__dirname}/../models/*/model/*.repository.{ts,js}`, // Repositories
	`${__dirname}/../models/*/services/*.service.{ts,js}`, // Services
	`${__dirname}/../models/*/graphql/**/*.{query,mutation,resolver}.{ts,js}`, // GraphQL queries / mutations
	`${__dirname}/../models/*/datamappers/*.dm.{ts,js}` // datamappers
]);

export { container };
