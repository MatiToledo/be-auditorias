import { UUID } from "crypto";
import { CreationOptional, DataTypes, Model } from "sequelize";
import { sequelize } from "../DB";
import { RegisterBar } from "./register_bar";

export class RegisterBarClosure extends Model {
  declare id: CreationOptional<UUID>;
  declare retirement_total: number;
  declare retirement_finish: number;
  declare expenses_total: number;
  declare expenses_observations: string;
  declare postnet_total: number;
  declare transfers_total: number;
  declare consumptions: string;
  declare observations: string;
  declare photo: string;
  declare RegisterBarId: UUID;
  declare RegisterBar: RegisterBar;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RegisterBarClosure.init(
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
  { sequelize, modelName: "RegisterBarClosure" }
);
