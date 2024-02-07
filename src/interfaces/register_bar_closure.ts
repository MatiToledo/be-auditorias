import { RegisterBarClosure } from "../models";

export interface IRegisterBarClosureService {
  create(body: Partial<RegisterBarClosure>): Promise<RegisterBarClosure>;
}

export interface IRegisterBarClosureRepository {
  create(data: Partial<RegisterBarClosure>): Promise<RegisterBarClosure>;
}
