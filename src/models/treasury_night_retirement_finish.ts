import { UUID } from "crypto";
import { CreationOptional, DataTypes, Model } from "sequelize";
import { sequelize } from "../DB";
import { Branch } from "./branch";

export enum TreasuryNightRetirementTypeEnum {
  TICKET = "ticket",
  BAR = "bar",
}

export class TreasuryNightRetirementFinish extends Model {
  declare id: CreationOptional<UUID>;
  declare tickets_men: number;
  declare tickets_woman: number;
  declare tickets_total: number;
  declare total_cash_rendered: number;
  declare BranchId: UUID;
  declare Branch: Branch;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TreasuryNightRetirementFinish.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: [
        TreasuryNightRetirementTypeEnum.TICKET,
        TreasuryNightRetirementTypeEnum.BAR,
      ],
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expenses: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    postnet: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    transfers: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  },
  { sequelize, modelName: "TreasuryNightRetirementFinish" }
);
