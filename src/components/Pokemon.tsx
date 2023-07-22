// import axios from 'axios';
// import { useState, useEffect } from 'react';

// import silhouette from '../assets/images/Silhouette.png';
// import { usePokemonState, useDisplayState } from '../store/Store';
// import { Pokemon, EvolutionChain } from '../types';

import { Pokemon, PokemonType } from '../types';

import CardGetter from './CardGetter';
import TagGetter from './TagGetter';

export type PokemonCardProps = {
  pokemon: Pokemon;
};

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  // const SampleEvolChain: EvolutionChain = {
  //   first: [],
  //   second: [],
  //   third: [],
  // };

  // const [name, setName] = useState('');
  // const [id, setId] = useState('');
  // const [sprite, setSprite] = useState('');
  // const [types, setTypes] = useState([]);
  // const [height, setHeight] = useState(0);
  // const [weight, setWeight] = useState(0);
  // const [stats, setStats] = useState([]);
  // const [abilites, setAbilities] = useState([]);
  // const [moves, setMoves] = useState([]);
  // const [evolution, setEvolution] = useState(SampleEvolChain);
  // const [habitat, setHabitat] = useState('');
  // const [isLengendary, setIsLegendary] = useState(false);
  /*
  const [loading, setLoading] = useState(0);
  */

  /*
type Stat = {
  name: string;
  url: string;
};

type StatObj = {
  base_stat: number;
  effort: number;
  stat: Stat;
};

export type Pokemon = {
  Name: string;
  Id: string;
  Sprite: string;
  Trait: string; // species
  Type: string[];
  Height: number;
  Weight: number;
  Stats: StatObj[];
  Abilities: string[];
  Evolution: string[]; // species
  Habitat: string; // species
  Moves: string[];
};

*/
  // const changeDisplayState = useDisplayState((state) => state.changeDisplayState);
  // const changePokemon = usePokemonState((state) => state.changePokemon);

  // useEffect(() => {
  //   // setLoading(0);
  //   axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((res) => {
  //     // setLoading(loading + 1);
  //     setId(res.data.id);
  //     setName(res.data.name);
  //     // if (res.data.sprites.other.home.front_default) {
  //     //   setSprite(res.data.sprites.other.home.front_default);
  //     // } else if (res.data.sprites.other['official-artwork'].front_default === null)
  //     //   setSprite(silhouette);
  //     // else setSprite(res.data.sprites.other['official-artwork'].front_default);
  //     setSprite(
  //       res.data.sprites.other.home.front_default ||
  //         res.data.sprites.other['official-artwork'].front_default ||
  //         silhouette
  //     );
  //     setTypes(res.data.types);
  //     setHeight(res.data.height);
  //     setWeight(res.data.height);
  //     setStats(res.data.stats);
  //     setAbilities(res.data.abilities.map((abil: any) => abil.ability.name));
  //     setMoves(res.data.moves.map((move: any) => move.move.name));
  //   });

  //   axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`).then((res) => {
  //     // setLoading(loading + 1);
  //     setIsLegendary(res.data.is_legendary);
  //     setHabitat(res.data.habitat.name);
  //     const EvolChain: EvolutionChain = {
  //       first: [],
  //       second: [],
  //       third: [],
  //     };

  //     axios
  //       .get(res.data.evolution_chain.url)
  //       .then((resEvoChain) => {
  //         EvolChain.first.push(resEvoChain.data.chain.species.name);
  //         EvolChain.second = resEvoChain.data.chain.evolves_to.map(
  //           (form: any) => form.species.name
  //         );
  //         if (EvolChain.second.length > 0) {
  //           for (let i = 0; i < EvolChain.second.length; i += 1) {
  //             EvolChain.third = resEvoChain.data.chain.evolves_to[i].evolves_to.map(
  //               (form: any) => form.species.name
  //             );
  //           }
  //         }
  //         /*
  //           if (res.data.chain.evoles_to[i].evoles_to.length > 0) {
  //             for (let j = 0; j < res.data.chain.evoles_to[i].evoles_to.length; i += 1) {
  //               EvolChain.second.push(res.data.chain.evoles_to[i].evoles_to[j].species.name);
  //             }
  //           }
  //           */

  //         setEvolution(EvolChain);
  //       })
  //       .catch((error) => {
  //         // error is handled in catch block
  //         if (error.response) {
  //           // status code out of the range of 2xx
  //           console.log('Message :', error.response.data.message);
  //         } else if (error.request) {
  //           // The request was made but no response was received
  //           console.log(error.request);
  //         } else {
  //           // Error on setting up the request
  //           console.log('Error', error.message);
  //         }
  //       });
  //   });
  // }, [pokemonName /* loading */]);

  // const CurrentPokemon: Pokemon = {
  //   Name: name,
  //   Id: id,
  //   Sprite: sprite,
  //   IsLegendary: isLengendary, // isLengendary  // species
  //   Type: types.map((type: any) => type.type.name),
  //   Height: height,
  //   Weight: weight,
  //   Stats: stats,
  //   Abilities: abilites,
  //   Evolution: evolution, // species
  //   Habitat: habitat, // habitat, // species
  //   Moves: moves,
  // };

  //  if (loading === 3) return <div>Loading</div>;

  return (
    <button
      type='button'
      className='relative w-[17.5rem] h-[22.5rem]'
      onClick={() => {
        // changePokemon(pokemon);
        // changeDisplayState(true);
      }}
    >
      <div className='absolute bottom-0 w-[17.5rem] z-0'>
        <CardGetter name={pokemon.types[0]} />
      </div>
      <div className='absolute top-0 w-[17.5rem] h-[22.5rem] flex flex-col items-center gap-[1rem] justify-start z-10'>
        <img src={pokemon.sprite} alt={pokemon.name} className='w-[12.5rem] h-[12.5rem]' />
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
