import express, { Express } from "express";
import { Request, Response } from "express-serve-static-core";
import characterRouter from "@/routes/characters";
export const routesConfig = (app: Express) => {
  app.use("/api/characters", characterRouter);

  app.use((req: Request, res: Response) => {
    res.status(404).json({
      msg: "Error 404: The page you are looking for could not be found. Please check the URL and try again",
    });
  });
};
