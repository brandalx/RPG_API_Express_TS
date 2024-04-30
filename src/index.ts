//main app
import "module-alias/register";
import express from "express";
import cors from "cors";
import http from "http";
import { PORT } from "@/configs/config";
import { routesConfig } from "@/configs/index";
import setupSwagger from "@/docs/swagger/swagger";
const app = express();

//enables swagger
setupSwagger(app);

// Parse incoming request body as JSON
app.use(express.json());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(
  cors({
    //todo: add domain name (for frontend)
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization", "token", "x-api-key"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

// initilization of the routes
routesConfig(app);

// HTTP server initilization and listening for requests
const server = http.createServer(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
