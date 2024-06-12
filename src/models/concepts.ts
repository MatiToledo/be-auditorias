import { UUID } from "crypto";
import { CreationOptional, DataTypes, Model } from "sequelize";
import { sequelize } from "../DB";

export class Concept extends Model {
  declare id: CreationOptional<UUID>;
  declare name: string;
  declare type: string;
  declare level: number;
  declare typeId: UUID;
  declare visible: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Concept.init(
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
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    visible: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  { sequelize, modelName: "Concept", paranoid: true }
);
