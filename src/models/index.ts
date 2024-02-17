import { Auth } from "./auth";
import { AuthBO } from "./back_office/auth";
import { UserBO } from "./back_office/user";
import { Branch } from "./branch";
import { CashRegister } from "./cash_register";
import { Company } from "./company";
import { Group } from "./group";
import { RegisterBar } from "./register_bar";
import { RegisterBarClosure } from "./register_bar_closure";
import { RegisterTicket } from "./register_ticket";
import { RegisterTicketClosure } from "./register_ticket_closure";
import { TreasuryCentral } from "./treasury_central";
import { TreasuryNightExpense } from "./treasury_night_expense";
import { TreasuryNightRetirement } from "./treasury_night_retirement";
import { TreasuryNightRetirementFinish } from "./treasury_night_retirement_finish";
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

Branch.hasMany(RegisterBar);
RegisterBar.belongsTo(Branch);

RegisterBar.hasMany(RegisterBarClosure);
RegisterBarClosure.belongsTo(RegisterBar);

Branch.hasMany(RegisterTicket);
RegisterTicket.belongsTo(Branch);

RegisterTicket.hasMany(RegisterTicketClosure);
RegisterTicketClosure.belongsTo(RegisterTicket);

Branch.hasMany(TreasuryNightExpense);
TreasuryNightExpense.belongsTo(Branch);

RegisterBar.hasMany(TreasuryNightRetirement);
TreasuryNightRetirement.belongsTo(RegisterBar);

RegisterTicket.hasMany(TreasuryNightRetirement);
TreasuryNightRetirement.belongsTo(RegisterTicket);

RegisterBar.hasMany(TreasuryNightRetirementFinish);
TreasuryNightRetirementFinish.belongsTo(RegisterBar);

RegisterTicket.hasMany(TreasuryNightRetirementFinish);
TreasuryNightRetirementFinish.belongsTo(RegisterTicket);

Branch.hasMany(TreasuryCentral);
TreasuryCentral.belongsTo(Branch);

Branch.hasMany(CashRegister);
CashRegister.belongsTo(Branch);

export {
  Auth,
  User,
  AuthBO,
  UserBO,
  Branch,
  Company,
  Group,
  RegisterBarClosure,
  RegisterTicketClosure,
  RegisterBar,
  RegisterTicket,
  TreasuryCentral,
  TreasuryNightExpense,
  TreasuryNightRetirement,
  TreasuryNightRetirementFinish,
};
