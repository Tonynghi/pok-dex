import axios from 'axios';
import { useState, useEffect } from 'react';

import { usePageState, useFetchTypeState, useTypeState, useGenState } from '../store/Store';

import GalleryLayout from './GalleryLayout';
import GenBar from './GenBar';
import Pagination from './Pagination';
import TypeCarousel from './TypeCarousel';

const PokeCarousel = (props: any) => {
  const { limit } = props;

  const fetchType = useFetchTypeState((state) => state.currentFetchType);
  const type = useTypeState((state) => state.currentType);
  const gen = useGenState((state) => state.currentGen);
  const page = usePageState((state) => state.currentPage);
  const offset = (page - 1) * limit;

  const [count, setCount] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const countLimiter = (estimated: number): number => {
      if (estimated > count) return count;
      return estimated;
    };
    if (fetchType === 'default') {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
        .then((res) => {
          setLoading(false);
          setCount(res.data.count);
          setPokemonList(res.data.results.map((poke: any) => poke.name));
        });
    } else if (fetchType === 'type') {
      axios.get(`https://pokeapi.co/api/v2/type/${type}`).then((res) => {
        setLoading(false);
        setCount(res.data.pokemon.length);
        setPokemonList(
          res.data.pokemon
            .slice(offset, countLimiter(page * limit))
            .map((poke: any) => poke.pokemon.name)
        );
      });
    } else if (fetchType === 'gen') {
      axios.get(`https://pokeapi.co/api/v2/generation/${gen}`).then((res) => {
        setLoading(false);
        setCount(res.data.pokemon_species.length);
        setPokemonList(
          res.data.pokemon_species
            .slice(offset, countLimiter(page * limit))
            .map((poke: any) => poke.name)
        );
      });
    }
  }, [offset, limit, fetchType, count, page, type, gen]);

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
