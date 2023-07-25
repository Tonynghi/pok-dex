import axios from 'axios';
import { useState, useEffect } from 'react';

import GalleryLayout from '../components/GalleryLayout';
import GenPicker from '../components/GenPicker';
import Modal from '../components/Modal';
import ModalCard from '../components/ModalCard';
import Pagination, { PageChangeHandlerProps } from '../components/Pagination';
import TypeCarousel from '../components/TypeCarousel';
import { Pokemon, FilterHandlerProps, ModalHandlerProps } from '../types';

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

  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalPokemonName, setModalPokemonName] = useState('bulbasaur');
  const [modalPokemon, setModalPokemon] = useState<Array<Pokemon>>([
    {
      name: '',
      id: '',
      sprites: {
        other: {
          home: {
            front_default: '',
          },
          'official-artwork': {
            front_default: '',
          },
        },
      },
      flavor_text_entries: [{ flavor_text: '', language: { name: '', url: '' } }],
      is_legendary: false, // species
      is_mythical: false,
      types: [
        {
          slot: 0,
          type: {
            name: '',
            url: '',
          },
        },
      ],
      height: 0,
      weight: 0,
      stats: [{ base_stat: 0, effort: 0, stat: { name: '', url: '' } }],
      abilities: [
        {
          ability: { name: '', url: '' },
          is_hidden: false,
          base_experience: 0,
        },
      ],
      chain: {
        evolution_details: [''],
        evolves_to: [
          {
            evolution_details: [''],
            evolves_to: [
              {
                evolution_details: [''],
                evolves_to: [{}],
                is_baby: false,
                species: { name: '', url: '' },
              },
            ],
            is_baby: false,
            species: { name: '', url: '' },
          },
        ],
        is_baby: false,
        species: { name: '', url: '' },
      }, // species + evolution-chain
      habitat: { name: '', url: '' }, // species
      moves: [],
    },
  ]);
  const [modalLoading, setModalLoading] = useState(true);

  const modalHandler: ModalHandlerProps = {
    getVisibility: () => {
      return modalVisibility;
    },
    turnOff: () => setModalVisibility(false),
    turnOn: () => setModalVisibility(true),
    fetchName: (name) => setModalPokemonName(name),
    getModalPokemon: () => {
      return modalPokemon;
    },
    getModalLoading: () => {
      return modalLoading;
    },
  };

  const countPerPage = 12;
  const offset = (currentPage - 1) * countPerPage;

  const fetchPokemonList = async () => {
    const { data: fetchResults } = await axios.get<{
      count: number;
      results: Array<{ url: string; name: string }>;
    }>(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${countPerPage}`);

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

    setCount(fetchResults.pokemon.length);
    return Promise.all<Array<Promise<Pokemon>>>(
      fetchResults.pokemon
        .slice(offset, countLimiter(currentPage * countPerPage))
        .map(async (pokeInfo) => {
          return (await axios.get<Pokemon>(pokeInfo.pokemon.url)).data;
        })
    );
  };

  const fetchModalPokemon = async () => {
    const fetchFromPokemon = async () => {
      return (await axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${modalPokemonName}`))
        .data;
    };
    const fetchFromPokemonSpecies = async () => {
      return (
        await axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon-species/${modalPokemonName}`)
      ).data;
    };
    const fetchFromEvolutionchain = async () => {
      const { data: fetchResults } = await axios.get<{ evolution_chain: { url: string } }>(
        `https://pokeapi.co/api/v2/pokemon-species/${modalPokemonName}`
      );
      return (await axios.get<Pokemon>(fetchResults.evolution_chain.url)).data;
    };

    return Promise.all<Array<Promise<Pokemon>>>([
      fetchFromPokemon(),
      fetchFromPokemonSpecies(),
      fetchFromEvolutionchain(),
    ]);
  };

  const getPokemonList = async () => {
    setLoading(true);
    if (currentFilter === 'none') {
      const fetchList = await fetchPokemonList();
      setPokemonList(fetchList);
    } else if (currentFilter === 'gen') {
      const fetchList = await fetchPokemonListByGen();
      setPokemonList(fetchList);
    } else {
      const fetchList = await fetchPokemonListByType();
      setPokemonList(fetchList);
    }
    setLoading(false);
  };

  const getModalPokemonInfo = async () => {
    setModalLoading(true);
    const ModalPokemonInfo = await fetchModalPokemon();
    setModalPokemon(ModalPokemonInfo);
    setModalLoading(false);
  };

  useEffect(() => {
    getPokemonList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, currentFilter, currentGen, currentType]);

  useEffect(() => {
    getModalPokemonInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalPokemonName]);

  if (loading)
    return (
      <div className='w-screen relative top-[5rem] flex flex-col gap-[2.5rem] px-[1.25rem]'>
        Loading...
      </div>
    );

  return (
    <div>
      <Modal modalHandler={modalHandler}>
        <ModalCard modalPokemonInfo={modalPokemon} modalHandler={modalHandler} />
      </Modal>
      <div className='relative top-[15rem] flex flex-col gap-[2.5rem] px-[1.25rem] lg:px-[5rem]'>
        <TypeCarousel filterHandler={filterHandler} pageChangeHandler={pageChangeHandler} />
        <GenPicker filterHandler={filterHandler} pageChangeHandler={pageChangeHandler} />
        <GalleryLayout pokemonList={pokemonList} modalHandler={modalHandler} />
        <Pagination
          count={count}
          countPerPage={countPerPage}
          pageChangeHandler={pageChangeHandler}
        />
      </div>
    </div>
  );
};

export default Gallery;
