// data storage

import { Character } from "@/models";

//character instance

// usage of an object with character id's as keys for storing character data to enable O(1) time complexity for direct access, updates, and deletions by id

export const characters: { [id: string]: Character } = {};
