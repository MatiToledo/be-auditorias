import { UUID } from "crypto";
import { CreationOptional, DataTypes, Model } from "sequelize";
import { sequelize } from "../DB";
import { Branch } from "./branch";
export enum TreasuryCentralTypeEnum {
  REVENUE = "revenue",
  EXPENSE = "expense",
}
export class Treasury_Central extends Model {
  declare id: CreationOptional<UUID>;
  declare type: TreasuryCentralTypeEnum;
  declare payment_method: string;
  declare concept: string;
  declare description: string;
  declare amount: number;
  declare BranchId: UUID;
  declare Branch: Branch;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Treasury_Central.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: [
        TreasuryCentralTypeEnum.EXPENSE,
        TreasuryCentralTypeEnum.REVENUE,
      ],
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    concept: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Treasury_Central" }
);
