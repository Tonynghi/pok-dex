import axios from 'axios';
import { useEffect, useState } from 'react';

import { Pokemon } from '../types';

import { spriteHandler } from './PokemonCard';

type GetPokemonSpriteProps = {
  name: string;
};

const GetPokemonSprite = ({ name }: GetPokemonSpriteProps) => {
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon>({
    name: '',
    id: '',
    sprites: {
      other: {
        home: {
          front_default: '',
        },
        'official-artwork': {
          front_default: '',
        },
      },
    },
    flavor_text_entries: [{ flavor_text: '', language: { name: '', url: '' } }],
    is_legendary: false, // species
    is_mythical: false,
    types: [
      {
        slot: 0,
        type: {
          name: '',
          url: '',
        },
      },
    ],
    height: 0,
    weight: 0,
    stats: [{ base_stat: 0, effort: 0, stat: { name: '', url: '' } }],
    abilities: [
      {
        ability: { name: '', url: '' },
        is_hidden: false,
        base_experience: 0,
      },
    ],
    chain: {
      evolution_details: [''],
      evolves_to: [
        {
          evolution_details: [''],
          evolves_to: [
            {
              evolution_details: [''],
              evolves_to: [{}],
              is_baby: false,
              species: { name: '', url: '' },
            },
          ],
          is_baby: false,
          species: { name: '', url: '' },
        },
      ],
      is_baby: false,
      species: { name: '', url: '' },
    }, // species + evolution-chain
    habitat: { name: '', url: '' }, // species
    moves: [],
  });

  const fetchPokemon = async () => {
    return (await axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`)).data;
  };

  const getPokemon = async () => {
    const pokemon = await fetchPokemon();
    setCurrentPokemon(pokemon);
  };

  useEffect(() => {
    getPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <img
        src={spriteHandler(currentPokemon)}
        alt={currentPokemon.name.charAt(0).toUpperCase() + currentPokemon.name.slice(1)}
        className='relative w-[5rem] aspect-square z-20'
      />
    </div>
  );
};

export default GetPokemonSprite;
