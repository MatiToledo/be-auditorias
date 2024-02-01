import { Example, IExampleService } from "../interface/example.interface";
import { ExampleRepository } from "../repository/example.repository";
// ! Dont handle the error here, the controller must take it.

export class ExampleService implements IExampleService {
  private exampleRepository = new ExampleRepository();
  async find(id: number): Promise<Example> {
    return await this.exampleRepository.findById(id);
  }
  create(name: string) {
    throw new Error("Method not implemented.");
  }
}
