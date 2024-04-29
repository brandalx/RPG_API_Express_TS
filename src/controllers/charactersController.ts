import { Request, Response } from "express-serve-static-core";

export const test = (req: Request, res: Response) => {
  res.send("Hello, World!");
};
