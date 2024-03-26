import { UUID } from "crypto";
import { CreationOptional, DataTypes, Model } from "sequelize";
import { sequelize } from "../DB";
import { Branch } from "./branch";
import { Company } from "./company";

export class Group extends Model {
  declare id: CreationOptional<UUID>;
  declare name: string;
  declare CompanyId: UUID;
  declare Company: Company;
  declare Branches: Branch[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Group.init(
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
  { sequelize, modelName: "Group", paranoid: true }
);
