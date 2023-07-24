import silhouette from '../assets/images/Silhouette.png';
import { Pokemon, PokemonType } from '../types';

import CardGetter from './CardGetter';
import { ModalHandlerProps } from './Modal';
import TagGetter from './TagGetter';

export type PokemonCardProps = {
  pokemon: Pokemon;
  modalHandler: ModalHandlerProps;
};

const PokemonCard = ({ pokemon, modalHandler }: PokemonCardProps) => {
  const spriteHandler = (): string => {
    if (pokemon.sprites.other.home.front_default !== null)
      return pokemon.sprites.other.home.front_default;
    if (pokemon.sprites.other['official-artwork'].front_default !== null)
      return pokemon.sprites.other['official-artwork'].front_default;
    return silhouette;
  };

  return (
    <button
      type='button'
      className='relative w-[17.5rem] h-[22.5rem]'
      onClick={() => {
        modalHandler.turnOn();
        // changePokemon(pokemon);
        // changeDisplayState(true);
      }}
    >
      <div className='absolute bottom-0 w-[17.5rem] z-0'>
        <CardGetter name={pokemon.types[0].type.name} />
      </div>
      <div className='absolute top-0 w-[17.5rem] h-[22.5rem] flex flex-col items-center gap-[1rem] justify-start z-10'>
        <img src={spriteHandler()} alt={pokemon.name} className='w-[12.5rem] h-[12.5rem]' />
        <div className='flex flex-col gap-[0.5rem] items-center'>
          <div className='text-[1.25rem] font-bold text-white'>#{pokemon.id}</div>
          <div
            className={`${
              pokemon.name.length > 22 ? 'text-[0.75rem]' : 'text-[1.25rem]'
            } font-bold text-white text-center`}
          >
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </div>
        </div>
        <div className='flex flex-row gap-[2.5rem] items-center text-[1.25rem] font-bold text-white'>
          {pokemon.types.map((element: PokemonType) => (
            <div key={element.type.name}>
              <TagGetter name={element.type.name} />
            </div>
          ))}
        </div>
      </div>
    </button>
  );
};

export default PokemonCard;
