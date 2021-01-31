import { EntityRepository, Repository } from "typeorm";
import { User } from "./User.model";

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
