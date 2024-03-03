import { WhereOptions } from "sequelize";
import { IConceptBackOfficeRepository } from "../../interfaces/back_office/concept";
import { Concept } from "../../models";

export class ConceptBackOfficeRepository
  implements IConceptBackOfficeRepository
{
  async create(data: Partial<Concept>): Promise<Concept> {
    try {
      return await Concept.create(data);
    } catch (error) {
      console.error(error);
      throw new Error(`CONCEPT_NOT_CREATED`);
    }
  }
  async getAll(
    where: WhereOptions,
    pagination: { offset: number; limit: number }
  ): Promise<{ rows: Concept[]; count: number }> {
    try {
      return await Concept.findAndCountAll({
        where,
        distinct: true,

        limit: pagination.limit,
        offset: pagination.offset,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`CONCEPTS_NOT_FOUND`);
    }
  }
}
