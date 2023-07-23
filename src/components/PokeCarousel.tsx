import { Pokemon } from '../types';

import GalleryLayout from './GalleryLayout';
import Pagination, { PageChangeHandler } from './Pagination';

export type PokemonCarouselProps = {
  count: number;
  pokemonList: Array<Pokemon>;
  countPerPage: number;
  pageChangeHandler: PageChangeHandler;
};

const PokeCarousel = ({
  count,
  pokemonList,
  countPerPage,
  pageChangeHandler,
}: PokemonCarouselProps) => {
  return (
    <div className='w-screen relative top-[5rem] lg:top-[10rem] flex flex-col gap-[2.5rem] px-[1.25rem] lg:px-[5rem]'>
      <GalleryLayout pokemonList={pokemonList} />
      <Pagination count={count} countPerPage={countPerPage} pageChangeHandler={pageChangeHandler} />
    </div>
  );
};

export default PokeCarousel;
