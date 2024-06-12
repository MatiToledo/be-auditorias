import { UUID } from "crypto";
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

  async findOne(name: string, level: number): Promise<Concept> {
    try {
      return await Concept.findOne({ where: { name, level } });
    } catch (error) {
      console.error(error);
      throw new Error(`CONCEPT_NOT_FOUND`);
    }
  }

  async update(id: UUID, data: Partial<Concept>): Promise<Concept> {
    try {
      const [updatedInstitution, affectedRows] = await Concept.update(data, {
        where: { id },
        returning: true,
      });
      return affectedRows[0];
    } catch (error) {
      console.error(error);
      throw new Error(`CONCEPT_NOT_UPDATED`);
    }
  }

  async delete(id: UUID): Promise<boolean> {
    try {
      const res = await Concept.destroy({
        where: { id },
      });
      if (res > 0) {
        return true;
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
      if (error.message) {
        throw new Error("CONCEPT_NOT_DELETED");
      } else {
        throw new Error("CONCEPT_ERROR_DELETED");
      }
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
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      console.error(error);
      throw new Error(`CONCEPTS_NOT_FOUND`);
    }
  }
}
