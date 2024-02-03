import { RegisterTicket } from "./../models/register_ticket";
import { RegisterBar } from "./../models/register_bar";
import { Group } from "./../models/group";
import { Branch, Company } from "../models";
import { Transaction } from "sequelize";

export interface IGroupService {}

export interface IGroupRepository {
  bulkCreate(
    data: Partial<Group>[],
    transaction: Transaction
  ): Promise<Group[]>;
}
