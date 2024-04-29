export interface JobStats {
  maxHP: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  attackFormula: (str: number, dex: number, int: number) => number;
  speedFormula: (dex: number, int: number) => number;
}

export interface JobStatsMap {
  [jobName: string]: JobStats;
}
