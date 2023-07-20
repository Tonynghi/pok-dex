import axios from 'axios';
import { useState, useEffect } from 'react';

import GalleryLayout from './GalleryLayout';
import GenBar from './GenBar';
import Pagination from './Pagination';
import TypeCarousel from './TypeCarousel';

const PokeCarousel = (props: any) => {
  const { limit } = props;

  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`).then((res) => {
      setLoading(false);
      setCount(res.data.count);
      setPokemonList(res.data.results.map((p: any) => p.name));
    });
  }, [offset, limit]);

  if (loading)
    return (
      <div className='w-screen relative top-[5rem] flex flex-col gap-[2.5rem] px-[1.25rem]'>
        Loading...
      </div>
    );

  return (
    <div className='w-screen relative top-[5rem] flex flex-col gap-[2.5rem] px-[1.25rem]'>
      <TypeCarousel />
      <GenBar />
      <div className='relative flex flex-row justify-between items-center'>
        <button type='button' onClick={() => setOffset(offset - limit)}>
          prev
        </button>
        <button type='button' onClick={() => setOffset(offset + limit)}>
          next
        </button>
      </div>
      <GalleryLayout pokemonList={pokemonList} />
      <div className='relative flex flex-row justify-between items-center'>
        <button type='button' onClick={() => setOffset(offset - limit)}>
          prev
        </button>
        <button type='button' onClick={() => setOffset(offset + limit)}>
          next
        </button>
      </div>
      <Pagination count={count} />
    </div>
  );
};

export default PokeCarousel;
