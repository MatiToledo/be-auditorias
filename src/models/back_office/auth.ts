import { UUID } from "crypto";
import { CreationOptional, DataTypes, Model } from "sequelize";
import { sequelize } from "../../DB";

export class Auth_BO extends Model {
  declare id: CreationOptional<UUID>;
  declare email: string;
  declare password: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Auth_BO.init(
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
  { sequelize, modelName: "Auth_BO", paranoid: true }
);
