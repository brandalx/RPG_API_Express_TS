//help utility to create unique id with uud library
import { v4 as uuidv4 } from "uuid";

export function generateUniqueId(): string {
  return uuidv4().toString();
}
