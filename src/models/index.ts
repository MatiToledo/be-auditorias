import { Auth } from "./auth";
import { Auth_BO } from "./back_office/auth";
import { User_BO } from "./back_office/user";
import { Branch } from "./branch";
import { Company } from "./company";
import { Group } from "./group";
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

export { Auth, User };
