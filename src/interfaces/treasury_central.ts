import { UUID } from "crypto";
import { Branch } from "../models";
import {
  TreasuryCentral,
  TreasuryCentralTypeEnum,
} from "./../models/treasury_central";

export interface ITreasuryCentralService {
  create(body: Partial<TreasuryCentral>): Promise<TreasuryCentral>;
}

export interface ITreasuryCentralRepository {
  create(data: Partial<TreasuryCentral>): Promise<TreasuryCentral>;
}

export interface TreasuryCentralQuery {
  startDate?: Date;
  endDate?: Date;
}
export interface TreasuryCentralMovements {
  id: UUID;
  date: Date;
  type: TreasuryCentralTypeEnum;
  payment_method: string;
  concept: string;
  description: string;
  amount: number;
  balance: number;
  BranchId: UUID;
  Branch: Branch;
}
