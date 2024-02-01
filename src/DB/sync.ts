import { sequelize } from "./";
import "../models";
import { Company } from "../models/company";
import { Group } from "../models/group";
import { Branch } from "../models/branch";

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
    await Branch.bulkCreate([
      {
        name: "GUEMES",
        GroupId: group.id,
      },
      {
        name: "CERRO",
        GroupId: group.id,
      },
    ]);
  } catch (error) {
    console.error(error);
  }
}
