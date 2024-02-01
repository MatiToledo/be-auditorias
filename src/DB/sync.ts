import { sequelize } from "./";
import "../models";

sequelize.sync({ force: true }).then((res) => {
  console.log("Database synced", res);
});
