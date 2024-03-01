import { UUID } from "crypto";
import { CreationOptional, DataTypes, Model } from "sequelize";
import { sequelize } from "../DB";

export enum TreasuryNightRetirementFinishTypeEnum {
  TICKET = "register_ticket",
  BAR = "register_bar",
}

export class TreasuryNightRetirementFinish extends Model {
  declare id: CreationOptional<UUID>;
  declare type: TreasuryNightRetirementFinishTypeEnum;
  declare date: Date;
  declare expenses: number;
  declare postnet: number;
  declare transfers: number;
  declare amount: number;
  declare RegisterBarId: UUID;
  declare RegisterTicketId: UUID;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TreasuryNightRetirementFinish.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: [
        TreasuryNightRetirementFinishTypeEnum.TICKET,
        TreasuryNightRetirementFinishTypeEnum.BAR,
      ],
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    expenses: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    postnet: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    transfers: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  },
  { sequelize, modelName: "TreasuryNightRetirementFinish" }
);
