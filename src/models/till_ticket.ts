import { UUID } from "crypto";
import { CreationOptional, DataTypes, Model } from "sequelize";
import { sequelize } from "../DB";
import { Branch } from "./branch";

export class Till_Ticket extends Model {
  declare id: CreationOptional<UUID>;
  declare retirement_total: number;
  declare retirement_finish: number;
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
  declare BranchId: UUID;
  declare Branch: Branch;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Till_Ticket.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    retirement_total: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    retirement_finish: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    expenses_total: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    expenses_observations: {
      type: DataTypes.STRING,
      allowNull: false,
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
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Till_Ticket" }
);
