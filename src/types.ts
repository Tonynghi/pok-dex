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

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type Pokemon = {
  name: string;
  id: string;
  sprites: {
    other: {
      home: {
        front_default: string;
      };
      'official-artwork': {
        front_default: string;
      };
    };
  };
  isLegendary: boolean; // species
  types: Array<PokemonType>;
  height: number;
  weight: number;
  stats: StatObj[];
  abilities: string[];
  evolution: EvolutionChain; // species
  habitat: string; // species
  moves: string[];
};
