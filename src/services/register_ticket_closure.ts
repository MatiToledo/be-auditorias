import { UUID } from "crypto";
import { IRegisterTicketClosureService } from "../interfaces/register_ticket_closure";
import { RegisterTicketClosure } from "../models";
import { RegisterTicketClosureRepository } from "../repositories/register_ticket_closure";
import { CloudinaryUpload } from "../libs/cloudinary";

export class RegisterTicketClosureService
  implements IRegisterTicketClosureService
{
  private registerTicketClosureRepository =
    new RegisterTicketClosureRepository();
  async create(
    body: Partial<RegisterTicketClosure>
  ): Promise<RegisterTicketClosure> {
    const photoURL = await CloudinaryUpload(body.photo);
    return await this.registerTicketClosureRepository.create({
      ...body,
      photo: photoURL,
    });
  }

  /////////////////////////////////////////////////////////////////////////////////////////////

  async checkIfAlreadyCloseThatDay(
    body: Partial<RegisterTicketClosure>
  ): Promise<boolean> {
    const registerBarClosure =
      await this.registerTicketClosureRepository.checkIfAlreadyCloseThatDay(
        body.date,
        body.RegisterTicketId
      );
    if (!registerBarClosure) return false;
    return true;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  async getAllByBranchId(BranchId: UUID): Promise<RegisterTicketClosure[]> {
    return await this.registerTicketClosureRepository.getAllByBranchId(
      BranchId
    );
  }
}
