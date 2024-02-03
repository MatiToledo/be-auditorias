import { sequelize } from "./";
import "../models";
import { Company } from "../models/company";
import { Group } from "../models/group";
import { Branch } from "../models/branch";
import {
  Auth,
  AuthBO,
  RegisterBar,
  RegisterTicket,
  User,
  UserBO,
} from "../models";
import { encryptPassword } from "../libs/encrypt_password";

sequelize.sync({ force: true }).then((res) => {
  console.log("Database synced", res);
  createBulkDev();
});

export async function createBulkDev() {
  try {
    const company = await Company.create({
      name: "BOTTOM",
    });
    const group = await Group.create({
      name: "CENTRAL",
      CompanyId: company.id,
    });
    const branchs = await Branch.bulkCreate([
      {
        name: "GUEMES",
        GroupId: group.id,
      },
      {
        name: "CERRO",
        GroupId: group.id,
      },
    ]);
    await RegisterBar.bulkCreate([
      {
        name: "Barra 1",
        BranchId: branchs[0].id,
      },
      {
        name: "Barra 2",
        BranchId: branchs[0].id,
      },
    ]);
    await RegisterTicket.bulkCreate([
      {
        name: "Ticket 1",
        BranchId: branchs[0].id,
      },
      {
        name: "Ticket 2",
        BranchId: branchs[0].id,
      },
    ]);
    const auth = await Auth.create({
      email: "mati@gmail.com",
      password: encryptPassword("123"),
    });
    const authBO = await AuthBO.create({
      email: "mati@gmail.com",
      password: encryptPassword("123"),
    });
    await User.create({
      fullName: "Matias Toledo",
      dni: 42336523,
      phone: 3518048259,
      role: "register",
      BranchId: branchs[0].id,
      AuthId: auth.id,
    });
    await UserBO.create({
      fullName: "Matias Toledo",
      role: "admin",
      AuthBOId: authBO.id,
    });
  } catch (error) {
    console.error(error);
  }
}
