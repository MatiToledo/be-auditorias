import { sequelize } from "./";
import "../models";
import { Company } from "../models/company";
import { Group } from "../models/group";
import { Branch } from "../models/branch";
import { RegisterBar, RegisterTicket } from "../models";

sequelize.sync({ force: true }).then((res) => {
  console.log("Database synced", res);
  createBulkBranchs();
});

export async function createBulkBranchs() {
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
  } catch (error) {
    console.error(error);
  }
}
