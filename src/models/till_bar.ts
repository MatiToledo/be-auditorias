import { UUID } from "crypto";
import { CreationOptional, DataTypes, Model } from "sequelize";
import { sequelize } from "../DB";
import { Branch } from "./branch";

export class Till_Bar extends Model {
  declare id: CreationOptional<UUID>;
  declare name: string;
  declare retirement_total: number;
  declare retirement_finish: number;
  declare postnet_total: number;
  declare transfers_total: number;
  declare expenses_observations: string;
  declare consumptions: string;
  declare photo: string;
  declare BranchId: UUID;
  declare Branch: Branch;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Till_Bar.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    consumptions: {
      type: DataTypes.STRING,
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
  { sequelize, modelName: "Till_Bar" }
);
