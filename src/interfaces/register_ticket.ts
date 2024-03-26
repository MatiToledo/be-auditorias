import { UUID } from "crypto";
import { RegisterTicket } from "../models";

export interface IRegisterTicketService {
  findByBranchId(BranchId: UUID): Promise<RegisterTicket[]>;
}

export interface IRegisterTicketRepository {
  findByBranchId(BranchId: UUID): Promise<RegisterTicket[]>;
}
