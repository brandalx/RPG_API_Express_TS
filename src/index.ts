import "module-alias/register";
import express from "express";
import cors from "cors";
import { PORT } from "@/configs/config";
const app = express();

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

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
