import { JobStatsMap } from "@/interfaces";

export class Character {
  id: string;
  name: string;
  job: string;
  hp: number;
  maxHP: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  attackModifier: number;
  speedModifier: number;
  isAlive: boolean;

  constructor(id: string, name: string, job: string, jobStats: JobStatsMap) {
    this.id = id;
    this.name = name;
    this.job = job;
    this.hp = jobStats[job].maxHP;
    this.maxHP = jobStats[job].maxHP;
    this.strength = jobStats[job].strength;
    this.dexterity = jobStats[job].dexterity;
    this.intelligence = jobStats[job].intelligence;
    this.attackModifier = this.calculateAttackModifier(jobStats);
    this.speedModifier = this.calculateSpeedModifier(jobStats);
    this.isAlive = true;
  }

  calculateAttackModifier(jobStats: JobStatsMap): number {
    const { strength, dexterity, intelligence } = this;
    return jobStats[this.job].attackFormula(strength, dexterity, intelligence);
  }

  calculateSpeedModifier(jobStats: JobStatsMap): number {
    const { dexterity, intelligence } = this;
    return jobStats[this.job].speedFormula(dexterity, intelligence);
  }
}
