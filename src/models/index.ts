import { Auth } from "./auth";
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

export { Auth, User };
