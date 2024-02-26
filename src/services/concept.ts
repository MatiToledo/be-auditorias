import { IConceptService } from "../interfaces/concept";
import { Concept } from "../models";
import { ConceptRepository } from "../repositories/concept";

export class ConceptService implements IConceptService {
  private conceptRepository = new ConceptRepository();
  async create(body: Partial<Concept>): Promise<Concept> {
    return await this.conceptRepository.create(body);
  }
  async getAll(queries: Partial<Concept>): Promise<Concept[]> {
    return await this.conceptRepository.getAll(queries);
  }
}
