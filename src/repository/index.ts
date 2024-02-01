// in this folder we have only the DB calls

import { Example, IExampleRepository } from "../interface/example.interface";

export class ExampleRepository implements IExampleRepository {
  async findById(id: number): Promise<Example> {
    try {
      const foo: Example = { id: 1, name: "Tester" };
      return foo;
    } catch (error) {
      throw new Error(`${error.message}. Error findById with: ${id}`);
    }
  }
}
