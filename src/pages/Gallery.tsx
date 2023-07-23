import axios from 'axios';
import { useState, useEffect } from 'react';

import GalleryLayout from '../components/GalleryLayout';
import GenPicker from '../components/GenPicker';
import Pagination, { PageChangeHandlerProps } from '../components/Pagination';
import TypeCarousel from '../components/TypeCarousel';
import { Pokemon, FilterHandlerProps } from '../types';

const Gallery = () => {
  const [currentFilter, setCurrentFilter] = useState('none');
  const [currentType, setCurrentType] = useState('normal');
  const [currentGen, setCurrentGen] = useState(1);

  const filterHandler: FilterHandlerProps = {
    getCurrentFilter: () => {
      return currentFilter;
    },
    getCurrentType: () => {
      return currentType;
    },
    getCurrentGen: () => {
      return currentGen;
    },
    changeCurrentFilter: (filter) => setCurrentFilter(filter),
    changeCurrentType: (type) => setCurrentType(type),
    changeCurrentGen: (gen) => setCurrentGen(gen),
  };

  const [count, setCount] = useState(0);
  const countLimiter = (estimatedCount: number): number => {
    if (estimatedCount > count) return count;
    return estimatedCount;
  };
  const [pokemonList, setPokemonList] = useState<Array<Pokemon>>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const pageChangeHandler: PageChangeHandlerProps = {
    getCurrentPage: () => {
      return currentPage;
    },
    changePage: (toPage) => setCurrentPage(toPage),
    changePreviousPage: () => setCurrentPage(currentPage - 1),
    changeNextPage: () => setCurrentPage(currentPage + 1),
  };

  const countPerPage = 12;
  const offset = (currentPage - 1) * countPerPage;

  const fetchPokemonList = async () => {
    const { data: fetchResults } = await axios.get<{
      count: number;
      results: Array<{ url: string; name: string }>;
    }>(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${countPerPage}`);

    setLoading(false);
    setCount(fetchResults.count);
    return Promise.all<Array<Promise<Pokemon>>>(
      fetchResults.results.map(async (pokeInfo) => {
        return (await axios.get<Pokemon>(pokeInfo.url)).data;
      })
    );
  };

  const fetchPokemonListByGen = async () => {
    const { data: fetchResults } = await axios.get<{
      pokemon_species: Array<{ name: string; url: string }>;
    }>(`https://pokeapi.co/api/v2/generation/${currentGen}`);

    setLoading(false);
    setCount(fetchResults.pokemon_species.length);
    return Promise.all<Array<Promise<Pokemon>>>(
      fetchResults.pokemon_species
        .slice(offset, countLimiter(currentPage * countPerPage))
        .map(async (pokeInfo) => {
          return (await axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${pokeInfo.name}`))
            .data;
        })
    );
  };

  const fetchPokemonListByType = async () => {
    const { data: fetchResults } = await axios.get<{
      pokemon: Array<{ pokemon: { name: string; url: string }; slot: number }>;
    }>(`https://pokeapi.co/api/v2/type/${currentType}`);

    setLoading(false);
    setCount(fetchResults.pokemon.length);
    return Promise.all<Array<Promise<Pokemon>>>(
      fetchResults.pokemon
        .slice(offset, countLimiter(currentPage * countPerPage))
        .map(async (pokeInfo) => {
          return (await axios.get<Pokemon>(pokeInfo.pokemon.url)).data;
        })
    );
  };

  const getPokemonList = async () => {
    setLoading(true);
    if (currentFilter === 'none') {
      console.log(await fetchPokemonList());
      const fetchList = await fetchPokemonList();
      setPokemonList(fetchList);
    } else if (currentFilter === 'gen') {
      console.log(await fetchPokemonListByGen());
      const fetchList = await fetchPokemonListByGen();
      setPokemonList(fetchList);
    } else {
      console.log(await fetchPokemonListByType());
      const fetchList = await fetchPokemonListByType();
      setPokemonList(fetchList);
    }
  };

  useEffect(() => {
    getPokemonList();
    // if (fetchType === 'default') {
    // } else if (fetchType === 'type') {
    //   axios.get(`https://pokeapi.co/api/v2/type/${type}`).then((res) => {
    //     setLoading(false);
    //     setCount(res.data.pokemon.length);
    //     setPokemonList(
    //       res.data.pokemon
    //         .slice(offset, countLimiter(page * limit))
    //         .map((poke: any) => poke.pokemon.name)
    //     );
    //   });
    // } else if (fetchType === 'gen') {
    //   axios.get(`https://pokeapi.co/api/v2/generation/${gen}`).then((res) => {
    //     setLoading(false);
    //     setCount(res.data.pokemon_species.length);
    //     setPokemonList(
    //       res.data.pokemon_species
    //         .slice(offset, countLimiter(page * limit))
    //         .map((poke: any) => poke.name)
    //     );
    //   });
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, currentFilter, currentGen, currentType]);

  if (loading)
    return (
      <div className='w-screen relative top-[5rem] flex flex-col gap-[2.5rem] px-[1.25rem]'>
        Loading...
      </div>
    );

  return (
    <div className='relative top-[15rem] flex flex-col gap-[2.5rem] px-[1.25rem] lg:px-[5rem]'>
      <TypeCarousel filterHandler={filterHandler} />
      <GenPicker filterHandler={filterHandler} />
      <GalleryLayout pokemonList={pokemonList} />
      <Pagination count={count} countPerPage={countPerPage} pageChangeHandler={pageChangeHandler} />
    </div>
  );
};

export default Gallery;
