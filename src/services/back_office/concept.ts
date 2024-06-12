import { UUID } from "crypto";
import { Op, WhereOptions } from "sequelize";
import {
  AllConcept,
  IConceptBackOfficeService,
  QueriesGetAll,
} from "../../interfaces/back_office/concept";
import { buildPagination } from "../../libs/buildPagination";
import { Concept } from "../../models";
import { ConceptBackOfficeRepository } from "../../repositories/back_office/concept";

export class ConceptBackOfficeService implements IConceptBackOfficeService {
  /////////////////////////////////////////////////////////////////////////////////////////////
  private conceptBackOfficeRepository = new ConceptBackOfficeRepository();
  async update(id: UUID, body: Partial<Concept>): Promise<Concept> {
    return await this.conceptBackOfficeRepository.update(id, body);
  }
  async delete(id: UUID): Promise<boolean> {
    return await this.conceptBackOfficeRepository.delete(id);
  }
  async getAll(queries: QueriesGetAll): Promise<{
    rows: AllConcept[];
    count: number;
  }> {
    const where = this.buildQueriesFilters(queries);
    const pagination = buildPagination(queries);
    const concepts = await this.conceptBackOfficeRepository.getAll(
      where,
      pagination
    );

    for (const concept of concepts.rows) {
      const conceptType = await this.conceptBackOfficeRepository.findOne(
        concept.type,
        concept.level + 1
      );
      concept.setDataValue("typeId", conceptType?.id || null);
    }
    return concepts as any;
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
