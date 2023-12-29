import { NextFunction, Request, Response } from "express";

import { Container } from 'typedi';

import config from '../../config';

import IUserRepo from '../services/IRepos/IUserRepo';

import { UserMap } from '../mappers/UserMap';
import { IUserDTO } from '../dto/IUserDTO';
import IUserService from "../services/IServices/IUserService";
import IUserRequestService from "../services/IServices/IUserRequestService";

export async function updateUser(req, res: Response, next: NextFunction) {

  const id = req.auth.id;

  if (!id) return res.json(new Error('Token inexistente ou inválido')).status(401);

  const userService = Container.get(config.services.user.name) as IUserService;

  const userDTO = await userService.updateUser({...req.body, id: id} as IUserDTO);

  if (userDTO.isFailure) return res.status(402).json(userDTO.error);

  return res.status(200).json(userDTO.getValue());
}


export async function getUserById(req, res: Response, next: NextFunction) {

  const userRepo = Container.get(config.repos.user.name) as IUserRepo;

  const userId = req.params.id;

  const user = await userRepo.findById(userId);
  if (!user) return res.json(new Error('Utilizador não registado')).status(401);

  const userDTO = UserMap.toDTO(user) as IUserDTO;
  return res.json(userDTO).status(200);
}


exports.getMe = async function(req, res: Response) {
  // NB: a arquitetura ONION não está a ser seguida aqui

  const userRepo = Container.get(config.repos.user.name) as IUserRepo;

  if (!req.token || req.token == undefined) return res.json(new Error('Token inexistente ou inválido')).status(401);

  const user = await userRepo.findById(req.token.id);
  if (!user) return res.json(new Error('Utilizador não registado')).status(401);

  const userDTO = UserMap.toDTO(user) as IUserDTO;
  return res.json(userDTO).status(200);
}
export async function deleteUser(req, res: Response, next: NextFunction){
  const id = req.auth.id;

  if (!id) return res.json(new Error('Token inexistente ou inválido')).status(401);

  const userService = Container.get(config.services.user.name) as IUserService;

  const requestService=Container.get(config.services.userRequest.name) as IUserRequestService;
  try {
    await requestService.deleteUserRequest(id);

    const result = await userService.deleteUser(id);

    if (result.isFailure) return res.status(402).json(result.error);


    return res.status(200).json('User deleted successfully');
  }catch (err) {
    return res.status(402).json(err);
  }
}

