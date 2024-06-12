import { UUID } from "crypto";
import { CreationOptional, DataTypes, Model } from "sequelize";
import { sequelize } from "../DB";
import { Branch } from "./branch";

export class CashRegister extends Model {
  declare id: CreationOptional<UUID>;
  declare date: Date;
  declare amount_actual: number;
  declare amount_theoretical: number;
  declare retirements_total: number;
  declare retirements_finish_total: number;
  declare retirements_finish_expenses_total: number;
  declare treasury_expenses_total: number;
  declare expenses_total: number;
  declare difference: number;
  declare cash_total: number;
  declare postnet_total: number;
  declare transfers_total: number;
  declare BranchId: UUID;
  declare Branch: Branch;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CashRegister.init(
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
    amount_actual: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    amount_theoretical: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    retirements_total: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    retirements_finish_total: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    retirements_finish_expenses_total: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    treasury_expenses_total: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    expenses_total: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    cash_total: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    transfers_total: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    postnet_total: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    difference: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize, modelName: "CashRegister" }
);
