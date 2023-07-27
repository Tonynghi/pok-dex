export type FilterHandlerProps = {
  getCurrentFilter: () => string;
  getCurrentType: () => string;
  getCurrentGen: () => number;
  changeCurrentFilter: (filter: string) => void;
  changeCurrentType: (type: string) => void;
  changeCurrentGen: (gen: number) => void;
  changeSearchPokemon: (name: string) => void;
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

type PokemonSprites = {
  other: {
    home: {
      front_default: string;
    };
    'official-artwork': {
      front_default: string;
    };
  };
};

export type Pokemon = {
  name: string;
  id: string;
  sprites: PokemonSprites;
  flavor_text_entries: Array<{ flavor_text: string; language: { name: string; url: string } }>;
  is_legendary: boolean; // species
  is_mythical: boolean; // species
  types: Array<PokemonType>;
  height: number;
  weight: number;
  stats: Array<{ base_stat: number; effort: number; stat: { name: string; url: string } }>;
  abilities: Array<{
    ability: { name: string; url: string };
    is_hidden: boolean;
    base_experience: number;
  }>;
  chain: {
    evolution_details: Array<string>;
    evolves_to: Array<{
      evolution_details: Array<string>;
      evolves_to: Array<{
        evolution_details: Array<string>;
        evolves_to: Array<{}>;
        is_baby: boolean;
        species: { name: string; url: string };
      }>;
      is_baby: boolean;
      species: { name: string; url: string };
    }>;
    is_baby: boolean;
    species: { name: string; url: string };
  }; // species + evolution-chain
  habitat: { name: string; url: string }; // species
  moves: Array<{
    move: { name: string; url: string };
    version_group_details: Array<{
      level_learned_at: number;
      move_learn_method: { name: string; url: string };
      version_group: {
        name: string;
        url: string;
      };
    }>;
  }>;
};

export type ModalHandlerProps = {
  getVisibility: () => boolean;
  turnOn: () => void;
  turnOff: () => void;
  fetchName: (name: string) => void;
  getModalPokemon: () => Array<Pokemon>;
  getModalLoading: () => boolean;
};
