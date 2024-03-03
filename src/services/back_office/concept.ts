import { Op, WhereOptions } from "sequelize";
import { buildPagination } from "../../libs/buildPagination";
import {
  AllConcept,
  IConceptBackOfficeService,
  QueriesGetAll,
} from "../../interfaces/back_office/concept";
import { ConceptBackOfficeRepository } from "../../repositories/back_office/concept";
import { Concept } from "../../models";

export class ConceptBackOfficeService implements IConceptBackOfficeService {
  /////////////////////////////////////////////////////////////////////////////////////////////
  private conceptBackOfficeRepository = new ConceptBackOfficeRepository();

  async getAll(queries: QueriesGetAll): Promise<{
    rows: AllConcept[];
    count: number;
  }> {
    const where = this.buildQueriesFilters(queries);
    const pagination = buildPagination(queries);
    const register_bars_closures =
      await this.conceptBackOfficeRepository.getAll(where, pagination);
    return register_bars_closures as any;
  }
  async create(body: Partial<Concept>): Promise<Concept> {
    return await this.conceptBackOfficeRepository.create(body);
  }
  private buildQueriesFilters(queries: QueriesGetAll) {
    const where = {
      [Op.and]: [],
    };
    for (const query of Object.keys(queries) as []) {
      if (queries[query]) {
        switch (query) {
          case "q":
            where[Op.and].push({
              [Op.or]: [
                { name: { [Op.iLike]: `%${queries.q}%` } },
                { type: { [Op.iLike]: `%${queries.q}%` } },
              ],
            });
            break;
          case "level":
            where[Op.and].push({
              level: parseInt(queries.level),
            });
            break;
          default:
            break;
        }
      }
    }

    return where as WhereOptions;
  }
}
