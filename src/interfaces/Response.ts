import { Character } from "@/models";

export interface SuccessResponse {
  message?: string;
  character?: Character;
}

export interface ErrorResponse {
  message?: string;
  error?: string;
}
