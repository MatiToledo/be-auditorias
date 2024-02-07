import { UUID } from "crypto";
import { CreationOptional, DataTypes, Model } from "sequelize";
import { sequelize } from "../../DB";

export class AuthBO extends Model {
  declare id: CreationOptional<UUID>;
  declare email: string;
  declare password: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AuthBO.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "AuthBO", paranoid: true }
);
