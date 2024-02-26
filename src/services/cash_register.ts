import { UUID } from "crypto";
import { ICashRegisterService } from "../interfaces/cash_register";
import {
  RegisterBar,
  RegisterTicket,
  TreasuryNightExpense,
  TreasuryNightRetirement,
  TreasuryNightRetirementFinish,
} from "../models";
import { TreasuryNightRetirementTypeEnum } from "../models/treasury_night_retirement";
import { CashRegisterRepository } from "../repositories/cash_register";
import { CashRegister } from "./../models/cash_register";
import { RegisterBarService } from "./register_bar";
import { RegisterTicketService } from "./register_ticket";
import { TreasuryNightExpenseService } from "./treasury_night_expense";
import { TreasuryNightRetirementService } from "./treasury_night_retirement";
import { TreasuryNightRetirementFinishService } from "./treasury_night_retirement_finish";

export class CashRegisterService implements ICashRegisterService {
  private cashRegisterRepository = new CashRegisterRepository();
  private TreasuryNightRetirementFinishService =
    new TreasuryNightRetirementFinishService();
  private TreasuryNightRetirementService = new TreasuryNightRetirementService();
  private TreasuryNightExpenseService = new TreasuryNightExpenseService();
  private registerBarService = new RegisterBarService();
  private registerTicketService = new RegisterTicketService();
  async create(body: Partial<CashRegister>): Promise<CashRegister> {
    const retirements_finish =
      await this.TreasuryNightRetirementFinishService.getAllByBranchAndDateId({
        BranchId: body.BranchId,
        date: body.date,
      });
    const retirements =
      await this.TreasuryNightRetirementService.getAllByBranchAndDateId({
        BranchId: body.BranchId,
        date: body.date,
      });
    const expenses =
      await this.TreasuryNightExpenseService.getAllByBranchAndDateId({
        BranchId: body.BranchId,
        date: body.date,
      });

    const retirements_total = this.getTotalAmountRetirements(retirements);

    const retirements_finish_total =
      this.getTotalAmountRetirementsFinish(retirements_finish);

    const retirements_finish_expenses_total =
      this.getTotalExpensesRetirementsFinish(retirements_finish);

    const treasury_expenses_total = this.getTotalExpenses(expenses);
    const expenses_total =
      treasury_expenses_total + retirements_finish_expenses_total;
    const cash_total =
      retirements_total +
      retirements_finish_total +
      retirements_finish_expenses_total;
    const amount_theoretical = cash_total + expenses_total;
    const difference = amount_theoretical - body.amount_actual;

    return await this.cashRegisterRepository.create({
      ...body,
      amount_theoretical,
      retirements_total,
      retirements_finish_total,
      retirements_finish_expenses_total,
      treasury_expenses_total,
      expenses_total,
      cash_total,
      difference,
    });
  }

  async checkIfExistByDayAndBranchId(
    body: Partial<CashRegister>
  ): Promise<boolean> {
    const cash_register =
      await this.cashRegisterRepository.checkIfExistByDayAndBranchId(body);
    if (!cash_register) return false;
    return true;
  }
  async getMovementsByDayAndBranchId(
    queries: Partial<CashRegister>
  ): Promise<any> {
    const register_bars = await this.registerBarService.findByBranchId(
      queries.BranchId
    );
    const register_tickets = await this.registerTicketService.findByBranchId(
      queries.BranchId
    );
    const treasury_night_retirements =
      await this.TreasuryNightRetirementService.getAllByBranchAndDateId({
        date: queries.date,
        BranchId: queries.BranchId,
      });
    const expenses =
      await this.TreasuryNightExpenseService.getAllByBranchAndDateId({
        BranchId: queries.BranchId,
        date: queries.date,
      });
    const treasury_night_retirements_finish =
      await this.TreasuryNightRetirementFinishService.getAllByBranchAndDateId({
        date: queries.date,
        BranchId: queries.BranchId,
      });

    const { registerRowsLabel, registerColumnsLabels, registerData } =
      await this.createRegistersTable(
        register_bars,
        register_tickets,
        treasury_night_retirements,
        treasury_night_retirements_finish
      );
    const { expenseRowLabels, expenseColumnLabels, expenseData } =
      await this.createExpensesTable(
        treasury_night_retirements_finish,
        expenses
      );
    const { totalCashColumnLabels, totalCashRowLabels, totalCashData } =
      await this.createTotalCashTable(
        treasury_night_retirements,
        treasury_night_retirements_finish,
        expenses
      );
    const { principalColumnLabels, principalRowLabels, principalData } =
      await this.createPrincipalTable(
        register_bars,
        register_tickets,
        treasury_night_retirements,
        treasury_night_retirements_finish
      );

    return {
      principal: {
        columnLabels: principalColumnLabels,
        rowLabels: principalRowLabels,
        data: principalData,
      },
      registers: {
        columnLabels: registerColumnsLabels,
        rowLabels: registerRowsLabel,
        data: registerData,
      },
      expenses: {
        columnLabels: expenseColumnLabels,
        rowLabels: expenseRowLabels,
        data: expenseData,
      },
      totalCash: {
        columnLabels: totalCashColumnLabels,
        rowLabels: totalCashRowLabels,
        data: totalCashData,
      },
    };
  }

  private async createTotalCashTable(
    retirements: TreasuryNightRetirement[],
    retirements_finish: TreasuryNightRetirementFinish[],
    expenses: TreasuryNightExpense[]
  ) {
    const retirements_total = this.getTotalAmountRetirements(retirements);

    const retirements_finish_total =
      this.getTotalAmountRetirementsFinish(retirements_finish);
    const treasury_expenses_total = this.getTotalExpenses(expenses);
    return {
      totalCashColumnLabels: ["Monto"],
      totalCashRowLabels: ["Total Eft", "Total Gastos", "Saldo real eft"],
      totalCashData: [
        [
          {
            value: (retirements_total + retirements_finish_total).toString(),
          },
        ],
        [
          {
            value: treasury_expenses_total.toString(),
          },
        ],
        [
          {
            value: (
              retirements_total +
              retirements_finish_total +
              treasury_expenses_total
            ).toString(),
          },
        ],
      ],
    };
  }
  private async createExpensesTable(
    retirements_finish: TreasuryNightRetirementFinish[],
    expenses: TreasuryNightExpense[]
  ) {
    const retirements_finish_expenses_total =
      await this.getTotalExpensesRetirementsFinish(retirements_finish);
    const retirements_expenses_total = await this.getTotalExpenses(expenses);
    return {
      expenseColumnLabels: ["Monto"],
      expenseRowLabels: ["Gastos de la barra", "Gastos de admin"],
      expenseData: [
        [
          {
            value: retirements_finish_expenses_total.toString(),
          },
        ],
        [
          {
            value: retirements_expenses_total.toString(),
          },
        ],
      ],
    };
  }

  private async createRegistersTable(
    register_bars: RegisterBar[],
    register_tickets: RegisterTicket[],
    treasury_night_retirements: TreasuryNightRetirement[],
    treasury_night_retirements_finish: TreasuryNightRetirementFinish[]
  ) {
    const columnsLabels = ["Efectivo", "Postnet + Transferencias"];
    const { columnLabels: rowsLabel, columnLabelsWithId: rowsLabelWithId } =
      this.getColumnsLabels(register_bars, register_tickets);
    const data = this.createRowsRegistersTable(
      treasury_night_retirements,
      treasury_night_retirements_finish,
      rowsLabelWithId
    );
    rowsLabel.push("Total");
    let sumColumnOne = 0;
    let sumColumnTwo = 0;

    // Suma de la primera columna
    for (let i = 0; i < data.length; i++) {
      sumColumnOne += parseInt(data[i][0].value);
    }

    // Suma de la segunda columna
    for (let i = 0; i < data.length; i++) {
      sumColumnTwo += parseInt(data[i][1].value);
    }
    data.push([
      { value: sumColumnOne.toString() },
      {
        value: sumColumnTwo.toString(),
      },
    ]);
    return {
      registerRowsLabel: rowsLabel,
      registerColumnsLabels: columnsLabels,
      registerData: data,
    };
  }

  private createRowsRegistersTable(
    treasury_night_retirements: TreasuryNightRetirement[],
    treasury_night_retirements_finish: TreasuryNightRetirementFinish[],
    rowsLabelWithId: { id: UUID; label: string }[]
  ) {
    const tableData = [];

    // Iteramos sobre cada Caja/Boletería
    for (let i = 0; i < rowsLabelWithId.length; i++) {
      const row = rowsLabelWithId[i];
      const rowData = [];

      const relevantRetirements = treasury_night_retirements.filter(
        (retirement) =>
          retirement.RegisterBarId === row.id ||
          retirement.RegisterTicketId === row.id
      );

      const cashSum = relevantRetirements.reduce(
        (acc, retirement) => acc + retirement.amount,
        0
      );

      // Buscamos los treasury_night_retirements_finish que pertenecen a la Caja/Boletería actual
      const relevantFinishRetirements =
        treasury_night_retirements_finish.filter(
          (retirement) =>
            retirement.RegisterBarId === row.id ||
            retirement.RegisterTicketId === row.id
        );

      // Calculamos la suma total de amount y expenses para la columna de "Efectivo"
      const cashAndExpensesSum = relevantFinishRetirements.reduce(
        (acc, retirement) => acc + retirement.amount + retirement.expenses,
        0
      );

      // Calculamos la suma total de postnet y transfers para la columna de "Postnet + Transferencias"
      const postnetTransferSum = relevantFinishRetirements.reduce(
        (acc, retirement) => acc + retirement.postnet + retirement.transfers,
        0
      );

      rowData.push({ value: (cashAndExpensesSum + cashSum).toString() });
      rowData.push({ value: postnetTransferSum.toString() });

      // Agregamos la fila actual a la tabla
      tableData.push(rowData);
    }

    return tableData;
  }

  private async createPrincipalTable(
    register_bars: RegisterBar[],
    register_tickets: RegisterTicket[],
    treasury_night_retirements: TreasuryNightRetirement[],
    treasury_night_retirements_finish: TreasuryNightRetirementFinish[]
  ) {
    const { columnLabels, columnLabelsWithId } = this.getColumnsLabels(
      register_bars,
      register_tickets
    );
    const rowLabels = await this.rowLabels(treasury_night_retirements);
    const data = this.getDataRowsRetirements(
      treasury_night_retirements,
      columnLabelsWithId,
      rowLabels
    );
    this.createSumRow(data, rowLabels);

    this.createTreasuryNightRetirementFinishRow(
      treasury_night_retirements_finish,
      columnLabelsWithId,
      rowLabels,
      data
    );

    this.createTreasuryNightExpensesRow(
      treasury_night_retirements_finish,
      columnLabelsWithId,
      rowLabels,
      data
    );
    this.createCashTotal(data, rowLabels);
    this.createPostnetRow(
      treasury_night_retirements_finish,
      columnLabelsWithId,
      rowLabels,
      data
    );
    this.createTransfersRow(
      treasury_night_retirements_finish,
      columnLabelsWithId,
      rowLabels,
      data
    );
    this.createTotalBilled(data, rowLabels);

    return {
      principalColumnLabels: columnLabels,
      principalRowLabels: rowLabels,
      principalData: data,
    };
  }

  private createTotalBilled(tableData: any[][], rowLabels: string[]) {
    rowLabels.push("Facturación total");
    const sumRow = [];

    // Obtenemos las dos últimas filas
    const lastRow = tableData[tableData.length - 1];
    const secondLastRow = tableData[tableData.length - 2];
    const thirtyLastRow = tableData[tableData.length - 3];

    // Verificamos que ambas filas tengan la misma longitud
    if (lastRow.length !== secondLastRow.length) {
      throw new Error("Las dos últimas filas deben tener la misma longitud");
    }

    // Iteramos sobre cada columna
    for (let i = 0; i < lastRow.length; i++) {
      let columnSum = 0;

      // Sumamos los valores de las celdas correspondientes en ambas filas
      const lastCellValue = parseInt(lastRow[i].value) || 0;
      const secondLastCellValue = parseInt(secondLastRow[i].value) || 0;
      const thirtyLastCellValue = parseInt(thirtyLastRow[i].value) || 0;

      columnSum = lastCellValue + secondLastCellValue + thirtyLastCellValue;

      // Agregamos el resultado de la suma a la fila de suma
      sumRow.push({ value: columnSum.toString() });
    }
    tableData.push(sumRow);
  }
  private createTransfersRow(
    treasury_night_retirements_finish: any[],
    columnsLabels: any[],
    rowLabels: any[],
    tableData: any[][]
  ) {
    rowLabels.push("Trasnferencias");

    const amountRow = [];

    // Iteramos sobre cada columna (barra o boletería)
    for (let i = 0; i < columnsLabels.length; i++) {
      const columnId = columnsLabels[i].id;

      // Buscamos el monto correspondiente al ID de la barra o boletería en los treasury_night_retirements
      const correspondingRetirement = treasury_night_retirements_finish.find(
        (retirement) =>
          retirement.RegisterBarId === columnId ||
          retirement.RegisterTicketId === columnId
      );

      if (correspondingRetirement) {
        amountRow.push({ value: correspondingRetirement.transfers.toString() });
      } else {
        amountRow.push({ value: null });
      }
    }
    tableData.push(amountRow);
  }
  private createPostnetRow(
    treasury_night_retirements_finish: any[],
    columnsLabels: any[],
    rowLabels: any[],
    tableData: any[][]
  ) {
    rowLabels.push("Postnet");

    const amountRow = [];

    // Iteramos sobre cada columna (barra o boletería)
    for (let i = 0; i < columnsLabels.length; i++) {
      const columnId = columnsLabels[i].id;

      const correspondingRetirement = treasury_night_retirements_finish.find(
        (retirement) =>
          retirement.RegisterBarId === columnId ||
          retirement.RegisterTicketId === columnId
      );

      if (correspondingRetirement) {
        amountRow.push({ value: correspondingRetirement.postnet.toString() });
      } else {
        amountRow.push({ value: null });
      }
    }
    tableData.push(amountRow);
  }

  private createCashTotal(tableData: any[][], rowLabels: string[]) {
    rowLabels.push("Total efectivo");
    const sumRow = [];

    // Obtenemos las dos últimas filas
    const lastRow = tableData[tableData.length - 1];
    const secondLastRow = tableData[tableData.length - 2];
    const thirtyLastRow = tableData[tableData.length - 3];

    // Verificamos que ambas filas tengan la misma longitud
    if (lastRow.length !== secondLastRow.length) {
      throw new Error("Las dos últimas filas deben tener la misma longitud");
    }

    // Iteramos sobre cada columna
    for (let i = 0; i < lastRow.length; i++) {
      let columnSum = 0;

      // Sumamos los valores de las celdas correspondientes en ambas filas
      const lastCellValue = parseInt(lastRow[i].value) || 0;
      const secondLastCellValue = parseInt(secondLastRow[i].value) || 0;
      const thirtyLastCellValue = parseInt(thirtyLastRow[i].value) || 0;

      columnSum = lastCellValue + secondLastCellValue + thirtyLastCellValue;

      // Agregamos el resultado de la suma a la fila de suma
      sumRow.push({ value: columnSum.toString() });
    }
    tableData.push(sumRow);
  }
  private createTreasuryNightExpensesRow(
    treasury_night_expenses: any[],
    columnsLabels: any[],
    rowLabels: any[],
    tableData: any[][]
  ) {
    rowLabels.push("Gastos de barras");

    const amountRow = [];

    // Iteramos sobre cada columna (barra o boletería)
    for (let i = 0; i < columnsLabels.length; i++) {
      const columnId = columnsLabels[i].id;

      // Buscamos el monto correspondiente al ID de la barra o boletería en los treasury_night_retirements
      const correspondingRetirement = treasury_night_expenses.find(
        (retirement) =>
          retirement.RegisterBarId === columnId ||
          retirement.RegisterTicketId === columnId
      );
      //TODO Pasar asociacion con RegisterBarId y RegisterTicketId
      if (correspondingRetirement) {
        amountRow.push({
          value: correspondingRetirement.expenses.toString(),
        });
      } else {
        amountRow.push({ value: null });
      }
    }
    tableData.push(amountRow);
  }
  private createTreasuryNightRetirementFinishRow(
    treasury_night_retirements_finish: any[],
    columnsLabels: any[],
    rowLabels: any[],
    tableData: any[][]
  ) {
    rowLabels.push("Retiro final");

    const amountRow = [];

    // Iteramos sobre cada columna (barra o boletería)
    for (let i = 0; i < columnsLabels.length; i++) {
      const columnId = columnsLabels[i].id;

      // Buscamos el monto correspondiente al ID de la barra o boletería en los treasury_night_retirements
      const correspondingRetirement = treasury_night_retirements_finish.find(
        (retirement) =>
          retirement.RegisterBarId === columnId ||
          retirement.RegisterTicketId === columnId
      );

      if (correspondingRetirement) {
        amountRow.push({ value: correspondingRetirement.amount.toString() });
      } else {
        amountRow.push({ value: null });
      }
    }
    tableData.push(amountRow);
  }

  private getDataRowsRetirements(
    treasury_night_retirements: TreasuryNightRetirement[],
    columnsLabels: { label: string; id: string }[],
    rowLabels: any[]
  ) {
    let tableData = [];

    // Iteramos sobre cada fila (retiro)
    for (let i = 0; i < rowLabels.length; i++) {
      const rowData = [];

      // Iteramos sobre cada columna (barra o boletería)
      for (let j = 0; j < columnsLabels.length; j++) {
        const columnId = columnsLabels[j].id;

        // Buscamos el retiro correspondiente a la fila y columna actual
        const correspondingRetirement = treasury_night_retirements.find(
          (retirement) =>
            (retirement.type === "register_bar" &&
              retirement.RegisterBarId === columnId) ||
            (retirement.type === "register_ticket" &&
              retirement.RegisterTicketId === columnId)
        );

        if (correspondingRetirement) {
          // Agregamos el monto del retiro a la fila actual
          rowData.push({ value: correspondingRetirement.amount.toString() });

          // Eliminamos el retiro encontrado para evitar que se repita en futuras celdas
          treasury_night_retirements.splice(
            treasury_night_retirements.indexOf(correspondingRetirement),
            1
          );
        } else {
          // Si no hay retiro correspondiente, agregamos null
          rowData.push({ value: null });
        }
      }

      tableData.push(rowData);
    }

    return tableData;
  }

  private getColumnsLabels(
    register_bars: RegisterBar[],
    register_tickets: RegisterTicket[]
  ) {
    let columnLabelsWithId = [];
    let columnLabels = [];
    for (const registerBar of register_bars) {
      columnLabelsWithId.push({ label: registerBar.name, id: registerBar.id });
      columnLabels.push(registerBar.name);
    }
    for (const registerTicket of register_tickets) {
      columnLabelsWithId.push({
        label: registerTicket.name,
        id: registerTicket.id,
      });
      columnLabels.push(registerTicket.name);
    }
    return { columnLabels, columnLabelsWithId };
  }
  private async rowLabels(
    treasury_night_retirements: TreasuryNightRetirement[]
  ) {
    const uniqueBarIds = new Set<string>();
    const uniqueTicketIds = new Set<string>();

    // Iteramos sobre los retiros para obtener los identificadores únicos
    treasury_night_retirements.forEach((retirement) => {
      if (retirement.type === TreasuryNightRetirementTypeEnum.BAR) {
        uniqueBarIds.add(retirement.RegisterBarId);
      } else if (retirement.type === TreasuryNightRetirementTypeEnum.TICKET) {
        uniqueTicketIds.add(retirement.RegisterTicketId);
      }
    });

    // Encontramos la cantidad máxima de retiros por tipo
    const maxBarRetirements = Math.max(
      ...Array.from(uniqueBarIds).map(
        (id) =>
          treasury_night_retirements.filter(
            (retirement) =>
              retirement.RegisterBarId === id &&
              retirement.type === TreasuryNightRetirementTypeEnum.BAR
          ).length
      )
    );

    const maxTicketRetirements = Math.max(
      ...Array.from(uniqueTicketIds).map(
        (id) =>
          treasury_night_retirements.filter(
            (retirement) =>
              retirement.RegisterTicketId === id &&
              retirement.type === TreasuryNightRetirementTypeEnum.TICKET
          ).length
      )
    );

    // Tomamos el máximo de retiros entre barras y boleterías
    const maxRetirements = Math.max(maxBarRetirements, maxTicketRetirements);

    // Creamos las etiquetas de las filas
    const retirementsLabels = [];
    for (let i = 1; i <= maxRetirements; i++) {
      retirementsLabels.push("Retiro " + i);
    }

    return retirementsLabels;
  }

  private createSumRow(tableData: any[][], rowLabels: string[]) {
    rowLabels.push("Suma Retiros");
    const sumRow = [];

    for (let i = 0; i < tableData[0].length; i++) {
      let columnSum = 0;

      for (let j = 0; j < tableData.length; j++) {
        const cellValue = parseInt(tableData[j][i].value);
        if (!isNaN(cellValue)) {
          columnSum += cellValue;
        }
      }

      sumRow.push({ value: columnSum.toString() });
    }

    tableData.push(sumRow);
  }

  private getTotalAmountRetirements(retirements: TreasuryNightRetirement[]) {
    let total = 0;
    for (const retirement of retirements) {
      total += retirement.amount;
    }
    return total;
  }
  private getTotalAmountRetirementsFinish(
    retirements_finish: TreasuryNightRetirementFinish[]
  ) {
    let total = 0;
    for (const retirement_finish of retirements_finish) {
      total += retirement_finish.amount;
    }
    return total;
  }
  private getTotalExpensesRetirementsFinish(
    retirements_finish: TreasuryNightRetirementFinish[]
  ) {
    let total = 0;
    for (const retirement_finish of retirements_finish) {
      total += retirement_finish.expenses;
    }
    return total;
  }
  private getTotalExpenses(expenses: TreasuryNightExpense[]) {
    let total = 0;
    for (const expense of expenses) {
      total += expense.total;
    }
    return total;
  }
}
