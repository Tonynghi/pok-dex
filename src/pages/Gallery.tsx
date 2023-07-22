import axios from 'axios';
import { useState, useEffect } from 'react';

import DisplayCard from '../components/DisplayCard';
import GenBar from '../components/GenBar';
import PokeCarousel from '../components/PokeCarousel';
import TypeCarousel from '../components/TypeCarousel';
import { usePageState } from '../store/Store';
import { Pokemon } from '../types';

const Gallery = () => {
  const countPerPage = 12;
  const [count, setCount] = useState(0);
  const [pokemonList, setPokemonList] = useState<Array<Pokemon>>([]);
  const [loading, setLoading] = useState(true);

  // const fetchType = useFetchTypeState((state) => state.currentFetchType);
  // const type = useTypeState((state) => state.currentType);
  // const gen = useGenState((state) => state.currentGen);
  const page = usePageState((state) => state.currentPage);
  const offset = (page - 1) * countPerPage;

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

  const getPokemonList = async () => {
    setLoading(true);
    console.log(await fetchPokemonList());
    const fetchList = await fetchPokemonList();
    setPokemonList(fetchList);
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
  });

  if (loading)
    return (
      <div className='w-screen relative top-[5rem] flex flex-col gap-[2.5rem] px-[1.25rem]'>
        Loading...
      </div>
    );

  return (
    <div>
      <DisplayCard />
      <TypeCarousel />
      <GenBar />
      <div>
        <PokeCarousel count={count} countPerPage={countPerPage} pokemonList={pokemonList} />
      </div>
    </div>
  );
};

export default Gallery;
