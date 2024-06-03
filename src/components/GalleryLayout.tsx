import { Pokemon, ModalHandlerProps } from '../types';

import { PokemonCard } from './PokemonCard';

export type GalleryLayoutProps = {
  pokemonList: Array<Pokemon>;
  modalHandler: ModalHandlerProps;
};

const GalleryLayout = ({ pokemonList, modalHandler }: GalleryLayoutProps) => {
  return (
    <div className='flex justify-center '>
      <div className='grid xl:grid-cols-4 mdl:grid-cols-3 sml:grid-cols-2 gap-[5rem]'>
        {pokemonList.map((pokemon: Pokemon) => (
          <div key={pokemon.id}>
            <PokemonCard pokemon={pokemon} modalHandler={modalHandler} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryLayout;
