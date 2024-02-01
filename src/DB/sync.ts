import { sequelize } from "./";
import "../model";

sequelize.sync({ force: true }).then((res) => {
  console.log("Database synced", res);
});
