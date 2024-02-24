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
  TreasuryNightExpense,
  TreasuryNightRetirement,
  TreasuryNightRetirementFinish,
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
    const company = await Company.bulkCreate([
      {
        name: "BOTTOM",
      },
      // { name: "414" },
    ]);
    const group = await Group.bulkCreate([
      {
        name: "CENTRAL",
        CompanyId: company[0].id,
      },
      // {
      //   name: "GUEMES",
      //   CompanyId: company[1].id,
      // },
      // {
      //   name: "NORTE",
      //   CompanyId: company[1].id,
      // },
      // {
      //   name: "SUR",
      //   CompanyId: company[1].id,
      // },
    ]);
    const branchs = await Branch.bulkCreate([
      {
        name: "GUEMES",
        GroupId: group[0].id,
      },
      {
        name: "CERRO",
        GroupId: group[0].id,
      },
      // {
      //   name: "PASEO GUEMES",
      //   GroupId: group[1].id,
      // },
      // {
      //   name: "CLUB GUEMES",
      //   GroupId: group[1].id,
      // },
      // {
      //   name: "NORTE",
      //   GroupId: group[2].id,
      // },
      // {
      //   name: "SUR",
      //   GroupId: group[3].id,
      // },
    ]);
    const register_bars = await RegisterBar.bulkCreate([
      {
        name: "Barra 1",
        BranchId: branchs[0].id,
      },
      {
        name: "Barra 2",
        BranchId: branchs[0].id,
      },
      // {
      //   name: "Barra 1",
      //   BranchId: branchs[1].id,
      // },
      // {
      //   name: "Barra 2",
      //   BranchId: branchs[1].id,
      // },
      // {
      //   name: "Barra 1",
      //   BranchId: branchs[2].id,
      // },
      // {
      //   name: "Barra 2",
      //   BranchId: branchs[2].id,
      // },
      // {
      //   name: "Barra 1",
      //   BranchId: branchs[3].id,
      // },
      // {
      //   name: "Barra 2",
      //   BranchId: branchs[3].id,
      // },
      // {
      //   name: "Barra 1",
      //   BranchId: branchs[4].id,
      // },
      // {
      //   name: "Barra 2",
      //   BranchId: branchs[4].id,
      // },
      // {
      //   name: "Barra 1",
      //   BranchId: branchs[5].id,
      // },
      // {
      //   name: "Barra 2",
      //   BranchId: branchs[5].id,
      // },
    ]);
    const register_tickets = await RegisterTicket.bulkCreate([
      {
        name: "Ticket 1",
        BranchId: branchs[0].id,
      },
      {
        name: "Ticket 2",
        BranchId: branchs[0].id,
      },
      // {
      //   name: "Ticket 1",
      //   BranchId: branchs[1].id,
      // },
      // {
      //   name: "Ticket 2",
      //   BranchId: branchs[1].id,
      // },
      // {
      //   name: "Ticket 1",
      //   BranchId: branchs[2].id,
      // },
      // {
      //   name: "Ticket 2",
      //   BranchId: branchs[2].id,
      // },
      // {
      //   name: "Ticket 1",
      //   BranchId: branchs[3].id,
      // },
      // {
      //   name: "Ticket 2",
      //   BranchId: branchs[3].id,
      // },
      // {
      //   name: "Ticket 1",
      //   BranchId: branchs[4].id,
      // },
      // {
      //   name: "Ticket 2",
      //   BranchId: branchs[4].id,
      // },
      // {
      //   name: "Ticket 1",
      //   BranchId: branchs[5].id,
      // },
      // {
      //   name: "Ticket 2",
      //   BranchId: branchs[5].id,
      // },
    ]);
    await TreasuryNightExpense.bulkCreate(
      [
        Array.from({ length: 5 }).map(() => {
          const quantity = Math.floor(Math.random() * 10) + 1;
          const unit_price = Math.floor(Math.random() * 100) + 1;
          const total = quantity * unit_price;

          return {
            date: new Date(),
            concept: "test",
            description: "test",
            quantity: quantity,
            unit_price: unit_price,
            total: total,
            BranchId: branchs[0].id,
          };
        }),
        Array.from({ length: 5 }).map(() => {
          const quantity = Math.floor(Math.random() * 10) + 1;
          const unit_price = Math.floor(Math.random() * 100) + 1;
          const total = quantity * unit_price;

          return {
            date: new Date(),
            concept: "test",
            description: "test",
            quantity: quantity,
            unit_price: unit_price,
            total: total,
            BranchId: branchs[1].id,
          };
        }),
        // Array.from({ length: 5 }).map(() => {
        //   const quantity = Math.floor(Math.random() * 10) + 1;
        //   const unit_price = Math.floor(Math.random() * 100) + 1;
        //   const total = quantity * unit_price;

        //   return {
        //     date: new Date(),
        //     concept: "test",
        //     description: "test",
        //     quantity: quantity,
        //     unit_price: unit_price,
        //     total: total,
        //     BranchId: branchs[2].id,
        //   };
        // }),
        // Array.from({ length: 5 }).map(() => {
        //   const quantity = Math.floor(Math.random() * 10) + 1;
        //   const unit_price = Math.floor(Math.random() * 100) + 1;
        //   const total = quantity * unit_price;

        //   return {
        //     date: new Date(),
        //     concept: "test",
        //     description: "test",
        //     quantity: quantity,
        //     unit_price: unit_price,
        //     total: total,
        //     BranchId: branchs[3].id,
        //   };
        // }),
        // Array.from({ length: 5 }).map(() => {
        //   const quantity = Math.floor(Math.random() * 10) + 1;
        //   const unit_price = Math.floor(Math.random() * 100) + 1;
        //   const total = quantity * unit_price;

        //   return {
        //     date: new Date(),
        //     concept: "test",
        //     description: "test",
        //     quantity: quantity,
        //     unit_price: unit_price,
        //     total: total,
        //     BranchId: branchs[4].id,
        //   };
        // }),
        // Array.from({ length: 5 }).map(() => {
        //   const quantity = Math.floor(Math.random() * 10) + 1;
        //   const unit_price = Math.floor(Math.random() * 100) + 1;
        //   const total = quantity * unit_price;

        //   return {
        //     date: new Date(),
        //     concept: "test",
        //     description: "test",
        //     quantity: quantity,
        //     unit_price: unit_price,
        //     total: total,
        //     BranchId: branchs[5].id,
        //   };
        // }),
      ].flat()
    );
    await TreasuryNightRetirement.bulkCreate(
      [
        Array.from({ length: 2 }).map(() => ({
          date: new Date(),
          amount: Math.floor(Math.random() * 1000) + 1,
          type: "register_ticket",
          RegisterTicketId: register_tickets[0].id,
        })),
        Array.from({ length: 2 }).map(() => ({
          date: new Date(),
          amount: Math.floor(Math.random() * 1000) + 1,
          type: "register_bar",
          RegisterBarId: register_bars[0].id,
        })),
        Array.from({ length: 3 }).map(() => ({
          date: new Date(),
          amount: Math.floor(Math.random() * 1000) + 1,
          type: "register_ticket",
          RegisterTicketId: register_tickets[1].id,
        })),
        Array.from({ length: 3 }).map(() => ({
          date: new Date(),
          amount: Math.floor(Math.random() * 1000) + 1,
          type: "register_bar",
          RegisterBarId: register_bars[1].id,
        })),
        // Array.from({ length: 2 }).map(() => ({
        //   date: new Date(),
        //   amount: Math.floor(Math.random() * 1000) + 1,
        //   type: "register_ticket",
        //   RegisterTicketId: register_tickets[2].id,
        // })),
        // Array.from({ length: 2 }).map(() => ({
        //   date: new Date(),
        //   amount: Math.floor(Math.random() * 1000) + 1,
        //   type: "register_bar",
        //   RegisterBarId: register_bars[2].id,
        // })),
        // Array.from({ length: 3 }).map(() => ({
        //   date: new Date(),
        //   amount: Math.floor(Math.random() * 1000) + 1,
        //   type: "register_ticket",
        //   RegisterTicketId: register_tickets[3].id,
        // })),
        // Array.from({ length: 3 }).map(() => ({
        //   date: new Date(),
        //   amount: Math.floor(Math.random() * 1000) + 1,
        //   type: "register_bar",
        //   RegisterBarId: register_bars[3].id,
        // })),
        // Array.from({ length: 2 }).map(() => ({
        //   date: new Date(),
        //   amount: Math.floor(Math.random() * 1000) + 1,
        //   type: "register_ticket",
        //   RegisterTicketId: register_tickets[4].id,
        // })),
        // Array.from({ length: 2 }).map(() => ({
        //   date: new Date(),
        //   amount: Math.floor(Math.random() * 1000) + 1,
        //   type: "register_bar",
        //   RegisterBarId: register_bars[4].id,
        // })),
        // Array.from({ length: 3 }).map(() => ({
        //   date: new Date(),
        //   amount: Math.floor(Math.random() * 1000) + 1,
        //   type: "register_ticket",
        //   RegisterTicketId: register_tickets[5].id,
        // })),
        // Array.from({ length: 3 }).map(() => ({
        //   date: new Date(),
        //   amount: Math.floor(Math.random() * 1000) + 1,
        //   type: "register_bar",
        //   RegisterBarId: register_bars[5].id,
        // })),
      ].flat()
    );
    await TreasuryNightRetirementFinish.bulkCreate(
      [
        Array.from({ length: 1 }).map(() => ({
          date: new Date(),
          expenses: Math.floor(Math.random() * 1000) + 1,
          type: "register_ticket",
          postnet: Math.floor(Math.random() * 1000) + 1,
          transfers: Math.floor(Math.random() * 1000) + 1,
          amount: Math.floor(Math.random() * 1000) + 1,
          RegisterTicketId: register_tickets[0].id,
        })),
        Array.from({ length: 1 }).map(() => ({
          date: new Date(),
          expenses: Math.floor(Math.random() * 1000) + 1,
          postnet: Math.floor(Math.random() * 1000) + 1,
          transfers: Math.floor(Math.random() * 1000) + 1,
          amount: Math.floor(Math.random() * 1000) + 1,
          type: "register_bar",
          RegisterBarId: register_bars[0].id,
        })),
        Array.from({ length: 1 }).map(() => ({
          date: new Date(),
          expenses: Math.floor(Math.random() * 1000) + 1,
          postnet: Math.floor(Math.random() * 1000) + 1,
          transfers: Math.floor(Math.random() * 1000) + 1,
          type: "register_ticket",
          amount: Math.floor(Math.random() * 1000) + 1,
          RegisterTicketId: register_tickets[1].id,
        })),
        Array.from({ length: 1 }).map(() => ({
          date: new Date(),
          expenses: Math.floor(Math.random() * 1000) + 1,
          postnet: Math.floor(Math.random() * 1000) + 1,
          transfers: Math.floor(Math.random() * 1000) + 1,
          type: "register_bar",
          amount: Math.floor(Math.random() * 1000) + 1,
          RegisterBarId: register_bars[1].id,
        })),
        // Array.from({ length: 2 }).map(() => ({
        //   date: new Date(),
        //   expenses: Math.floor(Math.random() * 1000) + 1,
        //   type: "register_ticket",
        //   postnet: Math.floor(Math.random() * 1000) + 1,
        //   transfers: Math.floor(Math.random() * 1000) + 1,
        //   amount: Math.floor(Math.random() * 1000) + 1,
        //   RegisterTicketId: register_tickets[2].id,
        // })),
        // Array.from({ length: 2 }).map(() => ({
        //   date: new Date(),
        //   expenses: Math.floor(Math.random() * 1000) + 1,
        //   postnet: Math.floor(Math.random() * 1000) + 1,
        //   transfers: Math.floor(Math.random() * 1000) + 1,
        //   amount: Math.floor(Math.random() * 1000) + 1,
        //   type: "register_bar",
        //   RegisterBarId: register_bars[2].id,
        // })),
        // Array.from({ length: 3 }).map(() => ({
        //   date: new Date(),
        //   expenses: Math.floor(Math.random() * 1000) + 1,
        //   postnet: Math.floor(Math.random() * 1000) + 1,
        //   transfers: Math.floor(Math.random() * 1000) + 1,
        //   type: "register_ticket",
        //   amount: Math.floor(Math.random() * 1000) + 1,
        //   RegisterTicketId: register_tickets[3].id,
        // })),
        // Array.from({ length: 3 }).map(() => ({
        //   date: new Date(),
        //   expenses: Math.floor(Math.random() * 1000) + 1,
        //   postnet: Math.floor(Math.random() * 1000) + 1,
        //   transfers: Math.floor(Math.random() * 1000) + 1,
        //   type: "register_bar",
        //   amount: Math.floor(Math.random() * 1000) + 1,
        //   RegisterBarId: register_bars[3].id,
        // })),
        // Array.from({ length: 2 }).map(() => ({
        //   date: new Date(),
        //   expenses: Math.floor(Math.random() * 1000) + 1,
        //   type: "register_ticket",
        //   postnet: Math.floor(Math.random() * 1000) + 1,
        //   transfers: Math.floor(Math.random() * 1000) + 1,
        //   amount: Math.floor(Math.random() * 1000) + 1,
        //   RegisterTicketId: register_tickets[4].id,
        // })),
        // Array.from({ length: 2 }).map(() => ({
        //   date: new Date(),
        //   expenses: Math.floor(Math.random() * 1000) + 1,
        //   postnet: Math.floor(Math.random() * 1000) + 1,
        //   transfers: Math.floor(Math.random() * 1000) + 1,
        //   amount: Math.floor(Math.random() * 1000) + 1,
        //   type: "register_bar",
        //   RegisterBarId: register_bars[4].id,
        // })),
        // Array.from({ length: 3 }).map(() => ({
        //   date: new Date(),
        //   expenses: Math.floor(Math.random() * 1000) + 1,
        //   postnet: Math.floor(Math.random() * 1000) + 1,
        //   transfers: Math.floor(Math.random() * 1000) + 1,
        //   type: "register_ticket",
        //   amount: Math.floor(Math.random() * 1000) + 1,
        //   RegisterTicketId: register_tickets[5].id,
        // })),
        // Array.from({ length: 3 }).map(() => ({
        //   date: new Date(),
        //   expenses: Math.floor(Math.random() * 1000) + 1,
        //   postnet: Math.floor(Math.random() * 1000) + 1,
        //   transfers: Math.floor(Math.random() * 1000) + 1,
        //   type: "register_bar",
        //   amount: Math.floor(Math.random() * 1000) + 1,
        //   RegisterBarId: register_bars[5].id,
        // })),
      ].flat()
    );
    const auth = await Auth.create({
      email: "cajero@gmail.com",
      password: encryptPassword("123"),
    });
    await User.create({
      fullName: "Cajero General",
      dni: 42336523,
      phone: 3518048259,
      role: "register",
      BranchId: branchs[0].id,
      AuthId: auth.id,
    });
    const authtn = await Auth.create({
      email: "tn@gmail.com",
      password: encryptPassword("123"),
    });
    await User.create({
      fullName: "Tesorero Nocturno",
      dni: 42336523,
      phone: 3518048259,
      role: "treasury_night",
      BranchId: branchs[0].id,
      AuthId: authtn.id,
    });
    const autht = await Auth.create({
      email: "tesorero@gmail.com",
      password: encryptPassword("123"),
    });
    await User.create({
      fullName: "Tesorero General",
      dni: 42336523,
      phone: 3518048259,
      role: "treasury",
      BranchId: branchs[0].id,
      AuthId: autht.id,
    });
    const authBO = await AuthBO.create({
      email: "mati@gmail.com",
      password: encryptPassword("123"),
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
