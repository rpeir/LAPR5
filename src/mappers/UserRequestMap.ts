import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {IUserDTO} from "../dto/IUserDTO";

import { User } from "../domain/user/user";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { UserEmail } from "../domain/user/userEmail";
import { UserPassword } from "../domain/user/userPassword";

import RoleRepo from "../repos/roleRepo";
import {UserRequest} from "../domain/user/userRequest";
import {PhoneNumber} from "../domain/user/phoneNumber";
import {IUserRequestDTO} from "../dto/IUserRequestDTO";

export class UserRequestMap extends Mapper<UserRequest> {

    public static toDTO( user: UserRequest): IUserRequestDTO {
        return {
            id: user.id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email.value,
            phoneNumber:user.phoneNumber.value,
            password: "",
            nif:user.nif,
        } as IUserRequestDTO;
    }

    public static async toDomain (raw: any): Promise<UserRequest> {
        const userEmailOrError = UserEmail.create(raw.email);
        const userPasswordOrError = UserPassword.create({value: raw.password, hashed: true});
        const phoneNrOrError=PhoneNumber.create({value:raw.phoneNumber});
        const repo = Container.get(RoleRepo);
       // const role = await repo.findByDomainId(raw.role);

        const userOrError = UserRequest.create({
            firstName: raw.firstName,
            lastName: raw.lastName,
            email: userEmailOrError.getValue(),
            phoneNumber: phoneNrOrError.getValue(),
            password: userPasswordOrError.getValue(),
            nif:raw.nif,
        }, new UniqueEntityID(raw.domainId))

        userOrError.isFailure ? console.log(userOrError.error) : '';

        return userOrError.isSuccess ? userOrError.getValue() : null;
    }

    public static toPersistence (user: UserRequest): any {
        const a = {
            domainId: user.id.toString(),
            email: user.email.value,
            password: user.password.value,
            phoneNumber:user.phoneNumber.value,
            firstName: user.firstName,
            lastName: user.lastName,
            nif:user.nif
        }
        return a;
    }
}
