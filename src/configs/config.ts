// Initializing environment variables
import { config } from "dotenv";
config();
//defining port
export const PORT = Number(process.env.PORT) || 3001;
