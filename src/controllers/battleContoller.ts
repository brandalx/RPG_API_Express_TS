//battle controller - all handlers for battle control
import { Request, Response } from "express-serve-static-core";

export const beginBattle = (req: Request, res: Response) => {
  res.send("Controller battle works");
};
