export class Character {
  id: string;
  name: string;
  job: string;
  hp: number;
  maxHP: number;
  strength: number;
  dexterity: number;
  intelligence: number;

  isAlive: boolean;

  constructor(id: string, name: string, job: string, jobStats: any) {
    this.id = id;
    this.name = name;
    this.job = job;
    this.hp = jobStats[job].maxHP;
    this.maxHP = jobStats[job].maxHP;
    this.strength = jobStats[job].strength;
    this.dexterity = jobStats[job].dexterity;
    this.intelligence = jobStats[job].intelligence;

    this.isAlive = true;
  }
}
