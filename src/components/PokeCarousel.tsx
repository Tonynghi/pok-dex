import { Pokemon } from '../types';

import GalleryLayout from './GalleryLayout';
import GenBar from './GenBar';
import Pagination from './Pagination';
import TypeCarousel from './TypeCarousel';

export type PokemonCarouselProps = {
  count: number;
  pokemonList: Array<Pokemon>;
  countPerPage: number;
};

const PokeCarousel = ({ count, pokemonList, countPerPage }: PokemonCarouselProps) => {
  return (
    <div className='w-screen relative top-[5rem] lg:top-[10rem] flex flex-col gap-[2.5rem] px-[1.25rem] lg:px-[5rem]'>
      <TypeCarousel />
      <GenBar />
      <GalleryLayout pokemonList={pokemonList} />
      <Pagination count={count} countPerPage={countPerPage} />
    </div>
  );
};

export default PokeCarousel;
