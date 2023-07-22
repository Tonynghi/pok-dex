type Stat = {
  name: string;
  url: string;
};

type StatObj = {
  base_stat: number;
  effort: number;
  stat: Stat;
};

export type EvolutionChain = {
  first: string[];
  second: string[];
  third: string[];
};

export type Pokemon = {
  Name: string;
  Id: string;
  Sprite: string;
  IsLegendary: boolean; // species
  Type: string[];
  Height: number;
  Weight: number;
  Stats: StatObj[];
  Abilities: string[];
  Evolution: EvolutionChain; // species
  Habitat: string; // species
  Moves: string[];
};
