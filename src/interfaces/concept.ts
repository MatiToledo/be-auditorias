import { Concept } from "../models";

export interface IConceptService {
  create(body: Partial<Concept>): Promise<Concept>;
}

export interface IConceptRepository {
  create(data: Partial<Concept>): Promise<Concept>;
}
