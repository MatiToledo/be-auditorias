import { Request, Response, response } from "express";
import { Example } from "../interface/example.interface";
import { ExampleService } from "../service/example.service";

export class ExampleController {
  private exampleService = new ExampleService();

  exampleControllerMethod = async (req: Request, res: Response) => {
    try {
      const id = 1; // from query for example
      const user: Example = await this.exampleService.find(id);
      res.status(200).json({ result: user, message: "User finded" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Error in example" });
    }
  };
}
