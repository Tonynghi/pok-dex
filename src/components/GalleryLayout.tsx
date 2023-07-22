import { Pokemon } from '../types';

import PokemonComponent from './Pokemon';

export type GalleryLayoutProps = {
  pokemonList: Array<Pokemon>;
};

const GalleryLayout = ({ pokemonList }: GalleryLayoutProps) => {
  return (
    <div className='flex justify-center '>
      <div className='grid xl:grid-cols-4 mdl:grid-cols-3 sml:grid-cols-2 gap-[5rem]'>
        {pokemonList.map((pokemon: Pokemon) => (
          <div key={pokemon.id}>
            <PokemonComponent pokemon={pokemon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryLayout;
