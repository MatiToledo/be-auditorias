export interface Example {
  id: number;
  name: string;
}

export interface IExampleService {
  find(id: number): Promise<Example>;
}

export interface IExampleRepository {
  findById(id: number): Promise<Example>;
}
