import { IConceptRepository } from "../interfaces/concept";
import { Concept } from "../models";

export class ConceptRepository implements IConceptRepository {
  async create(data: Partial<Concept>): Promise<Concept> {
    try {
      return await Concept.create(data);
    } catch (error) {
      console.error(error);
      throw new Error(`CONCEPT_NOT_CREATED`);
    }
  }
  async getAll(queries: Partial<Concept>): Promise<Concept[]> {
    try {
      return await Concept.findAll({
        where: {
          ...queries,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error(`CONCEPT_NOT_CREATED`);
    }
  }
}
