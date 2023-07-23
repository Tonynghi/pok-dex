export type FilterHandlerProps = {
  getCurrentFilter: () => string;
  getCurrentType: () => string;
  getCurrentGen: () => number;
  changeCurrentFilter: (filter: string) => void;
  changeCurrentType: (type: string) => void;
  changeCurrentGen: (gen: number) => void;
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
  stats: Array<{ base_state: number; effort: number; stat: { name: string; url: string } }>;
  abilities: string[];
  evolution: EvolutionChain; // species
  habitat: string; // species
  moves: string[];
};
