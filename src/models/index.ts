import { Auth } from "./auth";
import { AuthBO } from "./back_office/auth";
import { UserBO } from "./back_office/user";
import { Branch } from "./branch";
import { Company } from "./company";
import { Group } from "./group";
import { TillBar } from "./till_bar";
import { TillTicket } from "./till_ticket";
import { TreasuryCentral } from "./treasury_central";
import { TreasuryNightExpense } from "./treasury_night_expense";
import { TreasuryNightRevenue } from "./treasury_night_revenue";
import { User } from "./user";

Auth.hasOne(User);
User.belongsTo(Auth, { onDelete: "CASCADE" });

Company.hasMany(Group);
Group.belongsTo(Company);

Group.hasMany(Branch);
Branch.belongsTo(Group);

Branch.hasMany(User);
User.belongsTo(Branch);

AuthBO.hasOne(UserBO);
UserBO.belongsTo(AuthBO);

Branch.hasMany(UserBO, {
  foreignKey: {
    allowNull: true,
    name: "BranchId",
  },
  constraints: false,
});
UserBO.belongsTo(Branch, {
  foreignKey: "BranchId",
});

Branch.hasMany(TillBar);
TillBar.belongsTo(Branch);

Branch.hasMany(TillTicket);
TillTicket.belongsTo(Branch);

Branch.hasMany(TreasuryNightExpense);
TreasuryNightExpense.belongsTo(Branch);

Branch.hasMany(TreasuryNightRevenue);
TreasuryNightRevenue.belongsTo(Branch);

Branch.hasMany(TreasuryCentral);
TreasuryCentral.belongsTo(Branch);

export {
  Auth,
  User,
  AuthBO,
  UserBO,
  Branch,
  Company,
  Group,
  TillBar,
  TillTicket,
  TreasuryCentral,
  TreasuryNightExpense,
  TreasuryNightRevenue,
};
