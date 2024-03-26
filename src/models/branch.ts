import { UUID } from "crypto";
import { CreationOptional, DataTypes, Model } from "sequelize";
import { sequelize } from "../DB";
import { Group } from "./group";
import { RegisterBar } from "./register_bar";
import { RegisterTicket } from "./register_ticket";

export class Branch extends Model {
  declare id: CreationOptional<UUID>;
  declare name: string;
  declare GroupId: UUID;
  declare Group: Group;
  declare RegisterBars: RegisterBar[];
  declare RegisterTickets: RegisterTicket[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Branch.init(
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
  { sequelize, modelName: "Branch", paranoid: true }
);
