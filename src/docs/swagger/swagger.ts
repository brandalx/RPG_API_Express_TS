//swagger documentation settings
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { PORT } from "@/configs";

// swagger options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description: "Neo-Brandon Home Assigment",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`, //dynamic port for deploy
        description: "dev server",
      },
    ],
  },
  apis: ["@config/*.ts"],
};

// swagger docs init
const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app: Express) => {
  // swagger ui
  app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
