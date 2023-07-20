import axios from 'axios';
import { useState, useEffect } from 'react';

import { usePageState, useFetchTypeState } from '../store/Store';

import GalleryLayout from './GalleryLayout';
import GenBar from './GenBar';
import Pagination from './Pagination';
import TypeCarousel from './TypeCarousel';

const PokeCarousel = (props: any) => {
  const { limit } = props;

  const fetchType = useFetchTypeState((state) => state.currentType);
  const offset = (usePageState((state) => state.currentPage) - 1) * limit;

  const [count, setCount] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (fetchType === 'none') {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
        .then((res) => {
          setLoading(false);
          setCount(res.data.count);
          setPokemonList(res.data.results.map((p: any) => p.name));
        });
    }
  }, [offset, limit, fetchType]);

  if (loading)
    return (
      <div className='w-screen relative top-[5rem] flex flex-col gap-[2.5rem] px-[1.25rem]'>
        Loading...
      </div>
    );

  return (
    <div className='w-screen relative top-[5rem] lg:top-[10rem] flex flex-col gap-[2.5rem] px-[1.25rem] lg:px-[5rem]'>
      <TypeCarousel />
      <GenBar />
      <GalleryLayout pokemonList={pokemonList} />
      <Pagination count={count} countPerPage={limit} />
    </div>
  );
};

export default PokeCarousel;
