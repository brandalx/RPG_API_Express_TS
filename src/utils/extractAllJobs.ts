//util to extract all job names from the jobStats object (scalable solution)
import { jobStats } from "@/data";

export const AlljobNames = Object.keys(jobStats);
