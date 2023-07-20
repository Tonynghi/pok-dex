import axios from 'axios';
import { useState, useEffect } from 'react';

import CardGetter from './CardGetter';
import TagGetter from './TagGetter';

const Pokemon = (props: any) => {
  const { pokemonName } = props;
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [sprite, setSprite] = useState('');
  const [types, setTypes] = useState([]);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((res) => {
      setId(res.data.id);
      setName(res.data.name);
      setSprite(res.data.sprites.other.home.front_default);
      setTypes(res.data.types);
    });
  }, [pokemonName]);

  return (
    <div className='relative w-[17.5rem] h-[22.5rem]'>
      <div className='absolute bottom-0 w-[17.5rem] z-0'>
        <CardGetter name={types.slice(0, 1).map((x: any) => x.type.name)} />
      </div>
      <div className='absolute w-[17.5rem] h-[22.5rem] flex flex-col items-center gap-[1rem] justify-start z-10'>
        <img src={sprite} alt={name} className='w-[12.5rem] h-[12.5rem]' />
        <div className='flex flex-col gap-[0.5rem] items-center'>
          <div className='text-[1.25rem] font-bold text-white'>#{id}</div>
          <div className='text-[1.25rem] font-bold text-white'>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </div>
        </div>
        <div className='flex flex-row gap-[2.5rem] items-center text-[1.25rem] font-bold text-white'>
          {types.map((type: any) => (
            <div key={type.type.name}>
              <TagGetter name={type.type.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
