import { UUID } from "crypto";
import { CreationOptional, DataTypes, Model } from "sequelize";
import { sequelize } from "../DB";

export class Company extends Model {
  declare id: CreationOptional<UUID>;
  declare name: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Company.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Company", paranoid: true }
);
