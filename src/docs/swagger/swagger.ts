//swagger documentation settings
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { PORT } from "@/configs";
import path from "path";
// swagger options

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description: "Neo-Brandon Home Assignment",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "dev server",
      },
    ],
  },
  apis: [path.join(__dirname, "..", "..", "routes", "*ts")], // deploy path
};

// swagger docs init
const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app: Express) => {
  // swagger ui
  app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
