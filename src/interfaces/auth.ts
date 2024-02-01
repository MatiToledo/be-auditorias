import { Auth } from "../models";

export interface IAuthService {
  create(data: Partial<Auth>): Promise<boolean>;
}

export interface IAuthRepository {
  createInDB(data: Partial<Auth>): Promise<Auth>;
}
