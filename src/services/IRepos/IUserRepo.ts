import { Repo } from "../../core/infra/Repo";
import { User } from "../../domain/user/user";
import { UserEmail } from "../../domain/user/userEmail";

export default interface IUserRepo extends Repo<User> {
	save(user: User): Promise<User>;
	findByEmail (email: UserEmail): Promise<User>;
	findById (id: string): Promise<User>;
  deleteById(id: string): Promise<Boolean>;
  findByRole(role: Role): Promise<User[]>
}
