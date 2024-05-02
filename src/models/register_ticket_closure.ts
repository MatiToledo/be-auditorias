import { UUID } from "crypto";
import { CreationOptional, DataTypes, Model } from "sequelize";
import { sequelize } from "../DB";
import { Branch } from "./branch";

export class RegisterTicketClosure extends Model {
  declare id: CreationOptional<UUID>;
  declare date: Date;
  declare retirement_total: number;
  declare expenses_total: number;
  declare expenses_observations: string;
  declare postnet_total: number;
  declare transfers_total: number;
  declare sold_total: number;
  declare ticket_persons: number;
  declare ticket_price: number;
  declare persons_cant_branch: number;
  declare persons_cant_bar: number;
  declare observations: string;
  declare photo: string;
  declare RegisterTicketId: UUID;
  declare RegisterTicket: Branch;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RegisterTicketClosure.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    retirement_total: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    expenses_total: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    expenses_observations: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postnet_total: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    transfers_total: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    sold_total: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    ticket_persons: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    ticket_price: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    persons_cant_branch: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    persons_cant_bar: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    observations: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { sequelize, modelName: "RegisterTicketClosure" }
);
