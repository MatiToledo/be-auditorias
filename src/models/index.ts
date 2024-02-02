import { Auth } from "./auth";
import { Auth_BO } from "./back_office/auth";
import { User_BO } from "./back_office/user";
import { Branch } from "./branch";
import { Company } from "./company";
import { Group } from "./group";
import { Till_Bar } from "./till_bar";
import { Till_Ticket } from "./till_ticket";
import { Treasury_Central } from "./treasury_central";
import { Treasury_Night_Expense } from "./treasury_night_expense";
import { Treasury_Night_Revenue } from "./treasury_night_revenue";
import { User } from "./user";

Auth.hasOne(User);
User.belongsTo(Auth, { onDelete: "CASCADE" });

Company.hasMany(Group);
Group.belongsTo(Company);

Group.hasMany(Branch);
Branch.belongsTo(Group);

Branch.hasMany(User);
User.belongsTo(Branch);

Auth_BO.hasOne(User_BO);
User_BO.belongsTo(Auth_BO);

Branch.hasMany(User_BO, {
  foreignKey: {
    allowNull: true,
    name: "BranchId",
  },
  constraints: false,
});
User_BO.belongsTo(Branch, {
  foreignKey: "BranchId",
});

Branch.hasMany(Till_Bar);
Till_Bar.belongsTo(Branch);

Branch.hasMany(Till_Ticket);
Till_Ticket.belongsTo(Branch);

Branch.hasMany(Treasury_Night_Expense);
Treasury_Night_Expense.belongsTo(Branch);

Branch.hasMany(Treasury_Night_Revenue);
Treasury_Night_Revenue.belongsTo(Branch);

Branch.hasMany(Treasury_Central);
Treasury_Central.belongsTo(Branch);

export {
  Auth,
  User,
  Auth_BO,
  User_BO,
  Branch,
  Company,
  Group,
  Till_Bar,
  Till_Ticket,
  Treasury_Central,
  Treasury_Night_Expense,
  Treasury_Night_Revenue,
};
