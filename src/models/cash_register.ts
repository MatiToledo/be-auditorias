import { date } from "yup";
import { UUID } from "crypto";
import { CreationOptional, DataTypes, Model } from "sequelize";
import { sequelize } from "../DB";
import { Branch } from "./branch";

export class CashRegister extends Model {
  declare id: CreationOptional<UUID>;
  declare actual_amount: number;
  declare theoretical_amount: number;
  declare difference: number;
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
      type: DataTypes.DATE,
      allowNull: false,
    },
    actual_amount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    theoretical_amount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    difference: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  { sequelize, modelName: "CashRegister" }
);
