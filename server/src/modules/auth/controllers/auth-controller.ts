import { Request, Response } from "express";
import { authByCodeSchema } from "../schemas/auth-by-code.schema";
import { AuthByCodeUseCase } from "../use-cases/auth-by-code.usecase";

export class AuthController {
  constructor(
    private readonly authByCodeUseCase: AuthByCodeUseCase,
  ) {}

  async authByCode(req: Request, res: Response) {
    const { code } = authByCodeSchema.parse(req.body);
  
    return res.send(await this.authByCodeUseCase.execute(code));
  }
}
