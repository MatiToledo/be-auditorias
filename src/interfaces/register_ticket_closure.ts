import { RegisterTicketClosure } from "../models";

export interface IRegisterTicketClosureService {
  create(body: Partial<RegisterTicketClosure>): Promise<RegisterTicketClosure>;
}

export interface IRegisterTicketClosureRepository {
  create(data: Partial<RegisterTicketClosure>): Promise<RegisterTicketClosure>;
}
