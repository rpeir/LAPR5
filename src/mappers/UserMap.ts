import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {IUserDTO} from "../dto/IUserDTO";

import { User } from "../domain/user/user";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { UserEmail } from "../domain/user/userEmail";
import { UserPassword } from "../domain/user/userPassword";

import RoleRepo from "../repos/roleRepo";
import {PhoneNumber} from "../domain/user/phoneNumber";

export class UserMap extends Mapper<User> {

  public static toDTO( user: User): IUserDTO {
    return {
      id: user.id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber.value,
      email: user.email.value,
      nif: user.nif?user.nif:null,
      password: "",
      role: user.role.id.toString()
    } as IUserDTO;
  }

  public static async toDomain (raw: any): Promise<User> {
    const userEmailOrError = UserEmail.create(raw.email);
    const userPasswordOrError = UserPassword.create({value: raw.password, hashed: true});
    const phoneNrOrError=PhoneNumber.create({value:raw.phoneNumber});
    const repo = Container.get(RoleRepo);
    const role = await repo.findByDomainId(raw.role);
    const nif = raw.nif ? raw.nif : null;

    const userOrError = User.create({
      firstName: raw.firstName,
      lastName: raw.lastName,
      email: userEmailOrError.getValue(),
      phoneNumber:phoneNrOrError.getValue(),
      password: userPasswordOrError.getValue(),
      role: role,
      nif: nif?nif:null
    }, new UniqueEntityID(raw.domainId))

    userOrError.isFailure ? console.log(userOrError.error) : '';

    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  public static toPersistence (user: User): any {
    const a = {
      domainId: user.id.toString(),
      email: user.email.value,
      password: user.password.value,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role.id.toValue(),
      phoneNumber:user.phoneNumber.value,
      nif: user.nif?user.nif:null
    }
    return a;
  }
}
