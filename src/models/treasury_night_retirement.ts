import { UUID } from "crypto";
import { CreationOptional, DataTypes, Model } from "sequelize";
import { sequelize } from "../DB";
import { Branch } from "./branch";

export enum TreasuryNightRetirementTypeEnum {
  TICKET = "ticket",
  BAR = "bar",
}

export class TreasuryNightRetirement extends Model {
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

TreasuryNightRetirement.init(
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
    tickets_men: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    tickets_woman: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  },
  { sequelize, modelName: "TreasuryNightRetirement" }
);
