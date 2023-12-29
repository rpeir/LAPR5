import { expect } from 'chai';
import sinon from 'sinon';
import UserService from '../../../src/services/userService';
import { User } from "../../../src/domain/user/user";
import {UserEmail} from "../../../src/domain/user/userEmail";
import {UserPassword} from "../../../src/domain/user/userPassword";
import {PhoneNumber} from "../../../src/domain/user/phoneNumber";
import {Role} from "../../../src/domain/role/role";
import {UniqueEntityID} from "../../../src/core/domain/UniqueEntityID";

describe('user service', () => {
  describe('update user', () => {
    it('should update user', async () => {
      // Arrange
      const userDTO = {
        id: '123',
        firstName: "Jonh",
        lastName: "Doe",
        email: "email@isep.ipp.pt",
        password: "Password-10",
        phoneNumber: "912345678",
        nif: "213456789",
        role: "user",
      };
      const roleDTO = {
        id: "123",
        name: "user"
      };
      const user = User.create({
        ...userDTO,
        email: UserEmail.create(userDTO.email).getValue(),
        password: UserPassword.create({value: userDTO.password}).getValue(),
        phoneNumber: PhoneNumber.create({value: userDTO.phoneNumber}).getValue(),
        role: Role.create(roleDTO).getValue(),
      }, new UniqueEntityID(userDTO.id)).getValue();

      const userRepoMock = {
        findById: sinon.stub().resolves(user),
        save: sinon.stub().resolves(user),
      };

      const loggerMock = {
        silly: sinon.stub(),
      };

      const userService = new UserService(
        // @ts-ignore
        userRepoMock,
        null,  null,
        loggerMock
      );

      // Act
      const result = await userService.updateUser(userDTO);

      // Assert
      expect(result.isSuccess).to.be.true;
      sinon.assert.calledOnceWithExactly(userRepoMock.findById, userDTO.id);
      sinon.assert.calledOnceWithExactly(userRepoMock.save, user);
      expect(result.getValue()).to.deep.equal({...userDTO, password: "", role: undefined});

    });

    it("should not update user if user does not exist", async () => {
      // Arrange
      const userDTO = {
        id: '123',
        firstName: "Jonh",
        lastName: "Doe",
        email: "email@isep.ipp.pt",
        password: "Password-10",
        phoneNumber: "912345678",
        nif: "213456789",
        role: "user",
      };
      const roleDTO = {
        id: "123",
        name: "user"
      };
      const user = User.create({
        ...userDTO,
        email: UserEmail.create(userDTO.email).getValue(),
        password: UserPassword.create({value: userDTO.password}).getValue(),
        phoneNumber: PhoneNumber.create({value: userDTO.phoneNumber}).getValue(),
        role: Role.create(roleDTO).getValue(),
      }, new UniqueEntityID(userDTO.id)).getValue();

      const userRepoMock = {
        findById: sinon.stub().resolves(null),
      };

      const loggerMock = {
        silly: sinon.stub(),
      };

      const userService = new UserService(
        // @ts-ignore
        userRepoMock,
        null,  null,
        loggerMock
      );

      // Act
      const result = await userService.updateUser(userDTO);

      // Assert
      expect(result.isFailure).to.be.true;
      sinon.assert.calledOnceWithExactly(userRepoMock.findById, userDTO.id);
      expect(result.errorValue()).to.equal('Utilizador não registado');

    });
  });
});
