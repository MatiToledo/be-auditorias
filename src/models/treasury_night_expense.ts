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

export class TreasuryNightExpense extends Model {
  declare id: CreationOptional<UUID>;
  declare concept: TreasuryNightExpenseConceptEnum;
  declare description: string;
  declare quantity: number;
  declare unit_price: number;
  declare total: number;
  declare BranchId: UUID;
  declare Branch: Branch;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TreasuryNightExpense.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    concept: {
      type: DataTypes.ENUM,
      values: [
        TreasuryNightExpenseConceptEnum.SALARIES,
        TreasuryNightExpenseConceptEnum.SALARIES_KITCHEN,
        TreasuryNightExpenseConceptEnum.SALARIES_BARS,
        TreasuryNightExpenseConceptEnum.SECURITY,
        TreasuryNightExpenseConceptEnum.DJ,
        TreasuryNightExpenseConceptEnum.TECHNIQUE,
        TreasuryNightExpenseConceptEnum.CLEANING,
        TreasuryNightExpenseConceptEnum.OTHER,
      ],
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    total: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  { sequelize, modelName: "TreasuryNightExpense" }
);
