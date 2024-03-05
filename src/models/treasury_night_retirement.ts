import { UUID } from "crypto";
import { CreationOptional, DataTypes, Model } from "sequelize";
import { sequelize } from "../DB";
import { Branch } from "./branch";

export enum TreasuryNightRetirementTypeEnum {
  TICKET = "register_ticket",
  BAR = "register_bar",
}

export class TreasuryNightRetirement extends Model {
  declare id: CreationOptional<UUID>;
  declare type: TreasuryNightRetirementTypeEnum;
  declare date: Date;
  declare register_bar: string;
  declare register_ticket: string;
  declare RegisterBarId: UUID;
  declare RegisterTicketId: UUID;
  declare amount: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TreasuryNightRetirement.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: [
        TreasuryNightRetirementTypeEnum.TICKET,
        TreasuryNightRetirementTypeEnum.BAR,
      ],
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  },
  { sequelize, modelName: "TreasuryNightRetirement" }
);
