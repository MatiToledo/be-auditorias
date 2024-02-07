import { UUID } from "crypto";
import { CreationOptional, DataTypes, Model } from "sequelize";
import { sequelize } from "../DB";
import { Branch } from "./branch";

export enum TreasuryNightExpenseConceptEnum {
  SALARIES = "salaries",
  SALARIES_KITCHEN = "salaries_kitchen",
  SALARIES_BARS = "salaries_bars",
  SECURITY = "security",
  DJ = "dj",
  TECHNIQUE = "technique",
  CLEANING = "cleaning",
  OTHER = "other",
}

export class TreasuryNightRevenue extends Model {
  declare id: CreationOptional<UUID>;
  declare principal: number;
  declare fua_cg: number;
  declare fua_cc: number;
  declare vip: number;
  declare ultra: number;
  declare fuoco: number;
  declare marginal: number;
  declare bar_hours: number;
  declare tickets_men: number;
  declare tickets_woman: number;
  declare tickets_total: number;
  declare total_cash_rendered: number;
  declare BranchId: UUID;
  declare Branch: Branch;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TreasuryNightRevenue.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    principal: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    fua_cg: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    fua_cc: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    vip: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    ultra: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    fuoco: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    marginal: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    bar_hours: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    tickets_men: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    tickets_woman: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    ticets_total: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    total_cash_rendered: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  { sequelize, modelName: "TreasuryNightRevenue" }
);
