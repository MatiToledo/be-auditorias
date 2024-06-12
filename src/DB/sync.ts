import { sequelize } from "./";
import "../models";
import { Company } from "../models/company";
import { Group } from "../models/group";
import { Branch } from "../models/branch";
import {
  Auth,
  AuthBO,
  Concept,
  RegisterBar,
  RegisterBarClosure,
  RegisterTicket,
  RegisterTicketClosure,
  TreasuryCentral,
  TreasuryNightExpense,
  TreasuryNightRetirement,
  TreasuryNightRetirementFinish,
  User,
  UserBO,
} from "../models";
import { encryptPassword } from "../libs/encrypt_password";

sequelize.sync({ alter: true }).then((res) => {
  console.log("Database synced", res);
  // createBulkDev();
});

export async function createBulkDev() {
  try {
    const company = await Company.bulkCreate([
      {
        name: "BOTTOM",
      },
      { name: "414" },
    ]);
    const group = await Group.bulkCreate([
      {
        name: "CENTRAL",
        CompanyId: company[0].id,
      },
      {
        name: "GUEMES",
        CompanyId: company[1].id,
      },
      {
        name: "NORTE",
        CompanyId: company[1].id,
      },
      {
        name: "SUR",
        CompanyId: company[1].id,
      },
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
      {
        name: "PASEO GUEMES",
        GroupId: group[1].id,
      },
      {
        name: "CLUB GUEMES",
        GroupId: group[1].id,
      },
      {
        name: "NORTE",
        GroupId: group[2].id,
      },
      {
        name: "SUR",
        GroupId: group[3].id,
      },
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
      {
        name: "Barra 1",
        BranchId: branchs[1].id,
      },
      {
        name: "Barra 2",
        BranchId: branchs[1].id,
      },
      {
        name: "Barra 1",
        BranchId: branchs[2].id,
      },
      {
        name: "Barra 2",
        BranchId: branchs[2].id,
      },
      {
        name: "Barra 1",
        BranchId: branchs[3].id,
      },
      {
        name: "Barra 2",
        BranchId: branchs[3].id,
      },
      {
        name: "Barra 1",
        BranchId: branchs[4].id,
      },
      {
        name: "Barra 2",
        BranchId: branchs[4].id,
      },
      {
        name: "Barra 1",
        BranchId: branchs[5].id,
      },
      {
        name: "Barra 2",
        BranchId: branchs[5].id,
      },
    ]);
    for (const register_bar of register_bars) {
      await RegisterBarClosure.bulkCreate(
        [
          Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => ({
            date: new Date(),
            retirement_total: Math.floor(Math.random() * 1000) + 1,
            retirement_finish: Math.floor(Math.random() * 1000) + 1,
            expenses_total: Math.floor(Math.random() * 1000) + 1,
            expenses_observations: "expenses observations",
            postnet_total: Math.floor(Math.random() * 1000) + 1,
            cash_total_system: Math.floor(Math.random() * 1000) + 1,
            transfers_total_system: Math.floor(Math.random() * 1000) + 1,
            transfers_total: Math.floor(Math.random() * 1000) + 1,
            consumptions: [
              {
                description: "consumicion 1",
                quantity: 2,
              },
            ],
            observations: "observaciones",
            photo:
              "https://res.cloudinary.com/dhneingic/image/upload/v1714898826/rbbh5oud6ins9rdmx1sz.jpg",
            RegisterBarId: register_bar.dataValues.id,
          })),
        ].flat()
      );
    }
    const register_tickets = await RegisterTicket.bulkCreate([
      {
        name: "Ticket 1",
        BranchId: branchs[0].id,
      },
      {
        name: "Ticket 2",
        BranchId: branchs[0].id,
      },
      {
        name: "Ticket 1",
        BranchId: branchs[1].id,
      },
      {
        name: "Ticket 2",
        BranchId: branchs[1].id,
      },
      {
        name: "Ticket 1",
        BranchId: branchs[2].id,
      },
      {
        name: "Ticket 2",
        BranchId: branchs[2].id,
      },
      {
        name: "Ticket 1",
        BranchId: branchs[3].id,
      },
      {
        name: "Ticket 2",
        BranchId: branchs[3].id,
      },
      {
        name: "Ticket 1",
        BranchId: branchs[4].id,
      },
      {
        name: "Ticket 2",
        BranchId: branchs[4].id,
      },
      {
        name: "Ticket 1",
        BranchId: branchs[5].id,
      },
      {
        name: "Ticket 2",
        BranchId: branchs[5].id,
      },
    ]);
    for (const register_ticket of register_tickets) {
      await RegisterTicketClosure.bulkCreate(
        [
          Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => ({
            date: new Date(),
            retirement_total: Math.floor(Math.random() * 1000) + 1,
            retirement_finish: Math.floor(Math.random() * 1000) + 1,
            expenses_total: Math.floor(Math.random() * 1000) + 1,
            expenses_observations: "expenses observations",
            postnet_total: Math.floor(Math.random() * 1000) + 1,
            transfers_total: Math.floor(Math.random() * 1000) + 1,
            sold_total: Math.floor(Math.random() * 1000) + 1,
            ticket_persons: Math.floor(Math.random() * 500) + 1,
            ticket_price: Math.floor(Math.random() * 1000) + 1,
            persons_cant_branch: Math.floor(Math.random() * 1000) + 1,
            persons_cant_bar: Math.floor(Math.random() * 1000) + 1,
            observations: "observations",
            photo:
              "https://res.cloudinary.com/dhneingic/image/upload/v1714898826/rbbh5oud6ins9rdmx1sz.jpg",
            RegisterTicketId: register_ticket.dataValues.id,
          })),
        ].flat()
      );
    }
    const concepts = await Concept.bulkCreate([
      {
        name: "CARGAS FISCALES",
        level: 3,
      },
      {
        name: "COMPRAS",
        level: 3,
      },
      {
        name: "COSTO LABORAL",
        level: 3,
      },
      {
        name: "GASTOS OPERATAVIOS",
        level: 3,
      },
      {
        name: "INGRESOS",
        level: 3,
      },
      {
        name: "MANTENIMIENTO Y REPARACIONES",
        level: 3,
      },
      {
        name: "OTROS EGRESOS",
        level: 3,
      },
      {
        name: "OTROS INGRESOS",
        level: 3,
      },
      {
        name: "IMPUESTO MUNICIPAL",
        type: "CARGAS FISCALES",
        level: 2,
      },
      {
        name: "IMPUESTO NACIONAL",
        type: "CARGAS FISCALES",
        level: 2,
      },
      {
        name: "IMPUESTOS",
        type: "CARGAS FISCALES",
        level: 2,
      },
      {
        name: "PROVEEDORES",
        type: "COMPRAS",
        level: 2,
      },
      {
        name: "PROVEEDORES BEBIDA",
        type: "COMPRAS",
        level: 2,
      },
      {
        name: "PROVEEDORES COMIDA",
        type: "COMPRAS",
        level: 2,
      },
      {
        name: "SUELDOS",
        type: "COSTO LABORAL",
        level: 2,
      },
      {
        name: "SUELDOS JERARQUICOS",
        type: "COSTO LABORAL",
        level: 2,
      },
      {
        name: "SUELDOS OPERATIVOS",
        type: "COSTO LABORAL",
        level: 2,
      },
      {
        name: "ADMINISTRACION",
        type: "GASTOS OPERATAVIOS",
        level: 2,
      },
      {
        name: "ALQUILERES EQUIPOS",
        type: "GASTOS OPERATAVIOS",
        level: 2,
      },
      {
        name: "ALQUILERES INMOBILIARIOS",
        type: "GASTOS OPERATAVIOS",
        level: 2,
      },
      {
        name: "GASTOS VARIOS",
        type: "GASTOS OPERATAVIOS",
        level: 2,
      },
      {
        name: "SERVICIOS",
        type: "GASTOS OPERATAVIOS",
        level: 2,
      },
      {
        name: "PAGOS EXTRAS",
        type: "GASTOS OPERATAVIOS",
        level: 2,
      },
      {
        name: "PERMISOS",
        type: "GASTOS OPERATAVIOS",
        level: 2,
      },
      {
        name: "PUBLICIDAD",
        type: "GASTOS OPERATAVIOS",
        level: 2,
      },
      {
        name: "SERVICIOS",
        type: "GASTOS OPERATAVIOS",
        level: 2,
      },
      {
        name: "MOVIMIENTOS CONTABLES",
        type: "INGRESOS",
        level: 2,
      },
      {
        name: "MOVIMIENTOS CONTABLES",
        type: "INGRESOS",
        level: 2,
      },
      {
        name: "MATERIALES MANTENIMIENTO",
        type: "MANTENIMIENTO Y REPARACIONES",
        level: 2,
      },
      {
        name: "MO DE MANTENIMIENTO",
        type: "MANTENIMIENTO Y REPARACIONES",
        level: 2,
      },
      {
        name: "INVERSION",
        type: "OTROS EGRESOS",
        level: 2,
      },
      {
        name: "RETIRO UTILIDADES",
        type: "OTROS EGRESOS",
        level: 2,
      },
      {
        name: "MOVIMIENTOS CONTABLES",
        type: "OTROS EGRESOS",
        level: 2,
      },
      {
        name: "RETORNO",
        type: "OTROS INGRESOS",
        level: 2,
      },
      {
        name: "MOVIMIENTOS CONTABLES",
        type: "OTROS INGRESOS",
        level: 2,
      },
      {
        name: "MUNICIPALIDAD",
        type: "IMPUESTO MUNICIPAL",
        level: 1,
      },
      {
        name: "AFIP ",
        type: "IMPUESTO NACIONAL ",
        level: 1,
      },
      {
        name: "PLAN DE PAGO AFIP",
        type: "IMPUESTO NACIONAL ",
        level: 1,
      },
      {
        name: "F931",
        type: "IMPUESTO NACIONAL ",
        level: 1,
      },
      {
        name: "UTHGRA (SINDICATO)",
        type: "IMPUESTO NACIONAL ",
        level: 1,
      },
      {
        name: "INGRESOS BRUTOS",
        type: "IMPUESTO NACIONAL ",
        level: 1,
      },
      {
        name: "COSTO MERCADO PAGO",
        type: "IMPUESTOS",
        level: 1,
      },
      {
        name: "DESCARTABLES",
        type: "PROVEEDORES",
        level: 1,
      },
      {
        name: "PRODUCTOS DE LIMPIEZA",
        type: "PROVEEDORES",
        level: 1,
      },
      {
        name: "MOSTO",
        type: "PROVEEDORES BEBIDA",
        level: 1,
      },
      {
        name: "ALPES",
        type: "PROVEEDORES BEBIDA",
        level: 1,
      },
      {
        name: "QUILMES",
        type: "PROVEEDORES BEBIDA",
        level: 1,
      },
      {
        name: "COCA COLA",
        type: "PROVEEDORES BEBIDA",
        level: 1,
      },
      {
        name: "ALO JAPON SRL",
        type: "PROVEEDORES BEBIDA",
        level: 1,
      },
      {
        name: "ASD",
        type: "PROVEEDORES BEBIDA",
        level: 1,
      },
      {
        name: "WAGGON SRL",
        type: "PROVEEDORES COMIDA",
        level: 1,
      },
      {
        name: "SUELDOS COMPRAS",
        type: "SUELDOS",
        level: 1,
      },
      {
        name: "SUELDOS SEGURIDAD",
        type: "SUELDOS",
        level: 1,
      },
      {
        name: "PUBLICAS",
        type: "SUELDOS",
        level: 1,
      },
      {
        name: "SUELDOS ENCARGADOS",
        type: "SUELDOS JERARQUICOS",
        level: 1,
      },
      {
        name: "SUELDOS GERENTES",
        type: "SUELDOS JERARQUICOS",
        level: 1,
      },
      {
        name: "SUELDOS SOCIOS",
        type: "SUELDOS JERARQUICOS",
        level: 1,
      },
      {
        name: "SUELDOS BARRAS/SALON ",
        type: "SUELDOS OPERATIVOS",
        level: 1,
      },
      {
        name: "SUELDOS COCINA",
        type: "SUELDOS OPERATIVOS",
        level: 1,
      },
      {
        name: "SUELDOS TESORERIA NOCTURNA",
        type: "SUELDOS OPERATIVOS",
        level: 1,
      },
      {
        name: "SUELDOS TESORERIA CENTRAL",
        type: "SUELDOS OPERATIVOS",
        level: 1,
      },
      {
        name: "CONSULTORIA",
        type: "ADMINISTRACION",
        level: 1,
      },
      {
        name: "ABOGADO",
        type: "ADMINISTRACION",
        level: 1,
      },
      {
        name: "CONTADOR",
        type: "ADMINISTRACION",
        level: 1,
      },
      {
        name: "AUDITORIA STOCK",
        type: "ADMINISTRACION",
        level: 1,
      },
      {
        name: "HONORARIOS",
        type: "ADMINISTRACION",
        level: 1,
      },
      {
        name: "ALQUILER SONIDO BASICO ",
        type: "ALQUILERES EQUIPOS",
        level: 1,
      },
      {
        name: "ALQUILER LUCES BASICO",
        type: "ALQUILERES EQUIPOS",
        level: 1,
      },
      {
        name: "ALQUILER SONIDO EXTRA",
        type: "ALQUILERES EQUIPOS",
        level: 1,
      },
      {
        name: "ALQUILER LUCES EXTRA",
        type: "ALQUILERES EQUIPOS",
        level: 1,
      },
      {
        name: "ALQUILER MOBILIARIO",
        type: "ALQUILERES EQUIPOS",
        level: 1,
      },
      {
        name: "ALQUILER LOCAL",
        type: "ALQUILERES INMOBILIARIOS",
        level: 1,
      },
      {
        name: "LIBRERIA",
        type: "GASTOS VARIOS",
        level: 1,
      },
      {
        name: "LIMPIEZA",
        type: "SERVICIOS",
        level: 1,
      },
      {
        name: "AGUA",
        type: "SERVICIOS",
        level: 1,
      },
      {
        name: "LUZ",
        type: "SERVICIOS",
        level: 1,
      },
      {
        name: "GAS",
        type: "SERVICIOS",
        level: 1,
      },
      {
        name: "INTERNET",
        type: "SERVICIOS",
        level: 1,
      },
      {
        name: "JUGADORES SEMANAL",
        type: "PAGOS EXTRAS",
        level: 1,
      },
      {
        name: "JUGADORES MENSUAL",
        type: "PAGOS EXTRAS",
        level: 1,
      },
      {
        name: "TASAS Y PERMISOS",
        type: "PERMISOS",
        level: 1,
      },
      {
        name: "SADAIC",
        type: "PERMISOS",
        level: 1,
      },
      {
        name: "ADICAPIF",
        type: "PERMISOS",
        level: 1,
      },
      {
        name: "HABILITACION ",
        type: "PERMISOS",
        level: 1,
      },
      {
        name: "PAGO COMUNICACION PUBLICIDAD",
        type: "PUBLICIDAD",
        level: 1,
      },
      {
        name: "RECOLECCION DE BASURA",
        type: "SERVICIOS",
        level: 1,
      },
      {
        name: "SISTEMA INFORMATICO VENTAS",
        type: "SERVICIOS",
        level: 1,
      },
      {
        name: "SALDO INCIAL ",
        type: "MOVIMIENTOS CONTABLES",
        level: 1,
      },
      {
        name: "INGRESOS CAJAS",
        type: "MOVIMIENTOS CONTABLES",
        level: 1,
      },
      {
        name: "ELECTRICISTA MATERIALES",
        type: "MATERIALES MANTENIMIENTO",
        level: 1,
      },
      {
        name: "GASISTA MATERIALES",
        type: "MATERIALES MANTENIMIENTO",
        level: 1,
      },
      {
        name: "PLOMERO MATERIAL",
        type: "MATERIALES MANTENIMIENTO",
        level: 1,
      },
      {
        name: "OBRA MATERIALES",
        type: "MATERIALES MANTENIMIENTO",
        level: 1,
      },
      {
        name: "ELECTRICISTA MO ",
        type: "MO DE MANTENIMIENTO",
        level: 1,
      },
      {
        name: "GASISTA MO",
        type: "MO DE MANTENIMIENTO",
        level: 1,
      },
      {
        name: "PLOMERO MO",
        type: "MO DE MANTENIMIENTO",
        level: 1,
      },
      {
        name: "OBRA MO",
        type: "MO DE MANTENIMIENTO",
        level: 1,
      },
      {
        name: "INVERSION OBRA",
        type: "INVERSION",
        level: 1,
      },
      {
        name: "INVERSION EQUIPOS",
        type: "INVERSION",
        level: 1,
      },
      {
        name: "RETIRO SOCIOS",
        type: "RETIRO UTILIDADES",
        level: 1,
      },
      {
        name: "RETORNO PROVEEDORES",
        type: "RETORNO",
        level: 1,
      },
      {
        name: "DEVOLUCION DE PRESTAMO",
        type: "MOVIMIENTOS CONTABLES",
        level: 1,
      },
      {
        name: "INGRESO DE PRESTAMO REALIZADO",
        type: "MOVIMIENTOS CONTABLES",
        level: 1,
      },
      {
        name: "PRESTAMO A SUCURSALES ",
        type: "MOVIMIENTOS CONTABLES",
        level: 1,
      },
      {
        name: "ACREDITACIONES TEORICAS",
        type: "MOVIMIENTOS CONTABLES",
        level: 1,
      },
      {
        name: "MOVIMIENTO ENTRE CUENTAS",
        type: "MOVIMIENTOS CONTABLES",
        level: 1,
      },
    ]);
    await TreasuryNightExpense.bulkCreate(
      [
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => {
          const quantity = Math.floor(Math.random() * 10) + 1;
          const unit_price = Math.floor(Math.random() * 100) + 1;
          const total = quantity * unit_price;

          return {
            date: new Date(),
            ConceptId: concepts[Math.floor(Math.random() * 80) + 1].id,
            description: "test",
            quantity: quantity,
            unit_price: unit_price,
            total: total,
            BranchId: branchs[0].id,
          };
        }),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => {
          const quantity = Math.floor(Math.random() * 10) + 1;
          const unit_price = Math.floor(Math.random() * 100) + 1;
          const total = quantity * unit_price;

          return {
            date: new Date(),
            ConceptId: concepts[Math.floor(Math.random() * 80) + 1].id,
            description: "test",
            quantity: quantity,
            unit_price: unit_price,
            total: total,
            BranchId: branchs[1].id,
          };
        }),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => {
          const quantity = Math.floor(Math.random() * 10) + 1;
          const unit_price = Math.floor(Math.random() * 100) + 1;
          const total = quantity * unit_price;

          return {
            date: new Date(),
            conceptId: concepts[Math.floor(Math.random() * 80) + 1].id,
            description: "test",
            quantity: quantity,
            unit_price: unit_price,
            total: total,
            BranchId: branchs[2].id,
          };
        }),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => {
          const quantity = Math.floor(Math.random() * 10) + 1;
          const unit_price = Math.floor(Math.random() * 100) + 1;
          const total = quantity * unit_price;

          return {
            date: new Date(),
            conceptId: concepts[Math.floor(Math.random() * 80) + 1].id,
            description: "test",
            quantity: quantity,
            unit_price: unit_price,
            total: total,
            BranchId: branchs[3].id,
          };
        }),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => {
          const quantity = Math.floor(Math.random() * 10) + 1;
          const unit_price = Math.floor(Math.random() * 100) + 1;
          const total = quantity * unit_price;

          return {
            date: new Date(),
            conceptId: concepts[Math.floor(Math.random() * 80) + 1].id,
            description: "test",
            quantity: quantity,
            unit_price: unit_price,
            total: total,
            BranchId: branchs[4].id,
          };
        }),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => {
          const quantity = Math.floor(Math.random() * 10) + 1;
          const unit_price = Math.floor(Math.random() * 100) + 1;
          const total = quantity * unit_price;

          return {
            date: new Date(),
            conceptId: concepts[Math.floor(Math.random() * 80) + 1].id,
            description: "test",
            quantity: quantity,
            unit_price: unit_price,
            total: total,
            BranchId: branchs[5].id,
          };
        }),
      ].flat()
    );
    await TreasuryNightRetirement.bulkCreate(
      [
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => ({
          date: new Date(),
          amount: Math.floor(Math.random() * 1000) + 1,
          type: "register_ticket",
          RegisterTicketId: register_tickets[0].id,
        })),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => ({
          date: new Date(),
          amount: Math.floor(Math.random() * 1000) + 1,
          type: "register_bar",
          RegisterBarId: register_bars[0].id,
        })),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => ({
          date: new Date(),
          amount: Math.floor(Math.random() * 1000) + 1,
          type: "register_ticket",
          RegisterTicketId: register_tickets[1].id,
        })),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => ({
          date: new Date(),
          amount: Math.floor(Math.random() * 1000) + 1,
          type: "register_bar",
          RegisterBarId: register_bars[1].id,
        })),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => ({
          date: new Date(),
          amount: Math.floor(Math.random() * 1000) + 1,
          type: "register_ticket",
          RegisterTicketId: register_tickets[2].id,
        })),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => ({
          date: new Date(),
          amount: Math.floor(Math.random() * 1000) + 1,
          type: "register_bar",
          RegisterBarId: register_bars[2].id,
        })),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => ({
          date: new Date(),
          amount: Math.floor(Math.random() * 1000) + 1,
          type: "register_ticket",
          RegisterTicketId: register_tickets[3].id,
        })),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => ({
          date: new Date(),
          amount: Math.floor(Math.random() * 1000) + 1,
          type: "register_bar",
          RegisterBarId: register_bars[3].id,
        })),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => ({
          date: new Date(),
          amount: Math.floor(Math.random() * 1000) + 1,
          type: "register_ticket",
          RegisterTicketId: register_tickets[4].id,
        })),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => ({
          date: new Date(),
          amount: Math.floor(Math.random() * 1000) + 1,
          type: "register_bar",
          RegisterBarId: register_bars[4].id,
        })),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => ({
          date: new Date(),
          amount: Math.floor(Math.random() * 1000) + 1,
          type: "register_ticket",
          RegisterTicketId: register_tickets[5].id,
        })),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => ({
          date: new Date(),
          amount: Math.floor(Math.random() * 1000) + 1,
          type: "register_bar",
          RegisterBarId: register_bars[5].id,
        })),
      ].flat()
    );
    await TreasuryNightRetirementFinish.bulkCreate(
      [
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => ({
          date: new Date(),
          expenses: Math.floor(Math.random() * 1000) + 1,
          type: "register_ticket",
          postnet: Math.floor(Math.random() * 1000) + 1,
          transfers: Math.floor(Math.random() * 1000) + 1,
          amount: Math.floor(Math.random() * 1000) + 1,
          RegisterTicketId: register_tickets[0].id,
        })),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => ({
          date: new Date(),
          expenses: Math.floor(Math.random() * 1000) + 1,
          postnet: Math.floor(Math.random() * 1000) + 1,
          transfers: Math.floor(Math.random() * 1000) + 1,
          amount: Math.floor(Math.random() * 1000) + 1,
          type: "register_bar",
          RegisterBarId: register_bars[0].id,
        })),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => ({
          date: new Date(),
          expenses: Math.floor(Math.random() * 1000) + 1,
          postnet: Math.floor(Math.random() * 1000) + 1,
          transfers: Math.floor(Math.random() * 1000) + 1,
          type: "register_ticket",
          amount: Math.floor(Math.random() * 1000) + 1,
          RegisterTicketId: register_tickets[1].id,
        })),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => ({
          date: new Date(),
          expenses: Math.floor(Math.random() * 1000) + 1,
          postnet: Math.floor(Math.random() * 1000) + 1,
          transfers: Math.floor(Math.random() * 1000) + 1,
          type: "register_bar",
          amount: Math.floor(Math.random() * 1000) + 1,
          RegisterBarId: register_bars[1].id,
        })),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => ({
          date: new Date(),
          expenses: Math.floor(Math.random() * 1000) + 1,
          type: "register_ticket",
          postnet: Math.floor(Math.random() * 1000) + 1,
          transfers: Math.floor(Math.random() * 1000) + 1,
          amount: Math.floor(Math.random() * 1000) + 1,
          RegisterTicketId: register_tickets[2].id,
        })),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => ({
          date: new Date(),
          expenses: Math.floor(Math.random() * 1000) + 1,
          postnet: Math.floor(Math.random() * 1000) + 1,
          transfers: Math.floor(Math.random() * 1000) + 1,
          amount: Math.floor(Math.random() * 1000) + 1,
          type: "register_bar",
          RegisterBarId: register_bars[2].id,
        })),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => ({
          date: new Date(),
          expenses: Math.floor(Math.random() * 1000) + 1,
          postnet: Math.floor(Math.random() * 1000) + 1,
          transfers: Math.floor(Math.random() * 1000) + 1,
          type: "register_ticket",
          amount: Math.floor(Math.random() * 1000) + 1,
          RegisterTicketId: register_tickets[3].id,
        })),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => ({
          date: new Date(),
          expenses: Math.floor(Math.random() * 1000) + 1,
          postnet: Math.floor(Math.random() * 1000) + 1,
          transfers: Math.floor(Math.random() * 1000) + 1,
          type: "register_bar",
          amount: Math.floor(Math.random() * 1000) + 1,
          RegisterBarId: register_bars[3].id,
        })),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => ({
          date: new Date(),
          expenses: Math.floor(Math.random() * 1000) + 1,
          type: "register_ticket",
          postnet: Math.floor(Math.random() * 1000) + 1,
          transfers: Math.floor(Math.random() * 1000) + 1,
          amount: Math.floor(Math.random() * 1000) + 1,
          RegisterTicketId: register_tickets[4].id,
        })),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => ({
          date: new Date(),
          expenses: Math.floor(Math.random() * 1000) + 1,
          postnet: Math.floor(Math.random() * 1000) + 1,
          transfers: Math.floor(Math.random() * 1000) + 1,
          amount: Math.floor(Math.random() * 1000) + 1,
          type: "register_bar",
          RegisterBarId: register_bars[4].id,
        })),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => ({
          date: new Date(),
          expenses: Math.floor(Math.random() * 1000) + 1,
          postnet: Math.floor(Math.random() * 1000) + 1,
          transfers: Math.floor(Math.random() * 1000) + 1,
          type: "register_ticket",
          amount: Math.floor(Math.random() * 1000) + 1,
          RegisterTicketId: register_tickets[5].id,
        })),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => ({
          date: new Date(),
          expenses: Math.floor(Math.random() * 1000) + 1,
          postnet: Math.floor(Math.random() * 1000) + 1,
          transfers: Math.floor(Math.random() * 1000) + 1,
          type: "register_bar",
          amount: Math.floor(Math.random() * 1000) + 1,
          RegisterBarId: register_bars[5].id,
        })),
      ].flat()
    );
    await TreasuryCentral.bulkCreate(
      [
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => {
          return {
            date: new Date(),
            type: "expense",
            payment_method: "bank",
            description: "descripcion",
            amount: Math.floor(Math.random() * 1000) + 1,
            BranchId: branchs[1].id,
            ConceptId: concepts[Math.floor(Math.random() * 80) + 1].id,
          };
        }),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => {
          return {
            date: new Date(),
            type: "revenue",
            payment_method: "bank",
            description: "descripcion",
            amount: Math.floor(Math.random() * 1000) + 1,
            BranchId: branchs[1].id,
            ConceptId: concepts[Math.floor(Math.random() * 80) + 1].id,
          };
        }),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => {
          return {
            date: new Date(),
            type: "revenue",
            payment_method: "cash",
            description: "descripcion",
            amount: Math.floor(Math.random() * 1000) + 1,
            BranchId: branchs[1].id,
            ConceptId: concepts[Math.floor(Math.random() * 80) + 1].id,
          };
        }),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => {
          return {
            date: new Date(),
            type: "expense",
            payment_method: "cash",
            description: "descripcion",
            amount: Math.floor(Math.random() * 1000) + 1,
            BranchId: branchs[1].id,
            ConceptId: concepts[Math.floor(Math.random() * 80) + 1].id,
          };
        }),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => {
          return {
            date: new Date(),
            type: "revenue",
            payment_method: "transfer",
            description: "descripcion",
            amount: Math.floor(Math.random() * 1000) + 1,
            BranchId: branchs[1].id,
            ConceptId: concepts[Math.floor(Math.random() * 80) + 1].id,
          };
        }),
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => {
          return {
            date: new Date(),
            type: "expense",
            payment_method: "transfer",
            description: "descripcion",
            amount: Math.floor(Math.random() * 1000) + 1,
            BranchId: branchs[1].id,
            ConceptId: concepts[Math.floor(Math.random() * 80) + 1].id,
          };
        }),
      ].flat()
    );
    const auth = await Auth.create({
      email: "cajero@gmail.com",
      password: encryptPassword("123123123"),
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
      password: encryptPassword("123123123"),
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
      password: encryptPassword("123123123"),
    });
    await User.create({
      fullName: "Tesorero General",
      dni: 42336523,
      phone: 3518048259,
      role: "treasury_central",
      BranchId: branchs[0].id,
      AuthId: autht.id,
    });
    const authBO = await AuthBO.create({
      email: "toledo.nicolas.matias@gmail.com",
      password: encryptPassword("123123123"),
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
