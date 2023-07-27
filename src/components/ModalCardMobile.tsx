import { useEffect, useState } from 'react';

import next from '../assets/images/NextEvo.png';
import pokeballIconSmall from '../assets/images/Pokeball Icon Small.png';
import pokedexLegendaryMobile from '../assets/images/Pokedex Legendary (Mobile).png';
import pokedexLoadingMobile from '../assets/images/Pokedex Loading (Mobile).png';
import pokedexMythicalMobile from '../assets/images/Pokedex Mythical (Mobile).png';
import pokedexNormalMobile from '../assets/images/Pokedex Normal (Mobile).png';
import { PokemonType } from '../types';

import GetPokemonSprite from './GetPokemonSprite';
import HabitatPicker from './HabitatPicker';
import { ModalCardProps, StatDisplayProps, TabChangeButtonProps } from './ModalCard';
import { spriteHandler } from './PokemonCard';
import TagGetter from './TagGetter';

const TabChangeButton = ({ currentTab, name, onClick }: TabChangeButtonProps) => {
  return (
    <button
      type='button'
      className={`${
        currentTab === name ? 'bg-black  cursor-default' : 'hover:bg-primary bg-[#363636]'
      } relative w-[3.75rem] h-[1.25rem] flex justify-center items-center text-center text-white text-[0.5rem] font-bold duration-200`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

const StatDisplay = ({ name, stat }: StatDisplayProps) => {
  const statToBarWidth = (): number => {
    if (stat > 200) return 160;
    return (stat / 200) * 160;
  };
  return (
    <div className='relative h-[1.25rem] flex flex-row items-center gap-[0.75rem] text-white font-bold text-[0.5rem]'>
      <div className='relative w-[3rem]'>{name}:</div>
      <div className='relative w-[1rem]'>{stat}</div>
      <div className='relative w-[10rem] h-[0.5rem] bg-[#001534] rounded-lg items-center'>
        <div className='h-[0.5rem] rounded-lg' style={{ width: statToBarWidth() }}>
          <div className=' h-[0.5rem] bg-[#0083FC] rounded-lg animate-progress-bar' />
        </div>
      </div>
    </div>
  );
};

const ModalCardMobile = ({ modalPokemonInfo, modalHandler }: ModalCardProps) => {
  const [tab, setTab] = useState('Overall');

  const modalVisibility = modalHandler.getVisibility();

  useEffect(() => {
    setTab('Overall');
  }, [modalVisibility]);

  const getModalCard = (): string => {
    if (modalPokemonInfo[1].is_legendary) return pokedexLegendaryMobile;
    if (modalPokemonInfo[1].is_mythical) return pokedexMythicalMobile;
    return pokedexNormalMobile;
  };

  const getFlavorText = (): string => {
    for (let i = modalPokemonInfo[1].flavor_text_entries.length - 1; i >= 0; i -= 1) {
      if (modalPokemonInfo[1].flavor_text_entries[i].language.name === 'en')
        return modalPokemonInfo[1].flavor_text_entries[i].flavor_text;
    }
    return '';
  };

  const hasSecondEvolution = (): boolean => {
    return modalPokemonInfo[2].chain.evolves_to.length > 0;
  };

  const hasThirdEvolution = (): boolean => {
    if (!hasSecondEvolution()) return false;
    let hasThird = false;
    for (let i = 0; i < modalPokemonInfo[2].chain.evolves_to.length; i += 1) {
      if (modalPokemonInfo[2].chain.evolves_to[i].evolves_to.length > 0) {
        hasThird = true;
        break;
      }
    }
    return hasThird;
  };

  if (modalHandler.getModalLoading())
    return (
      <div
        className='flex mdl:hidden w-[20rem] h-[38.25rem] '
        style={{ backgroundImage: `url('${pokedexLoadingMobile}')` }}
      >
        <div className='relative w-[52.5rem] h-[25rem] top-0 flex items-center justify-center text-[#363636] font-bold text-[2.5rem]'>
          <div
            className='relative w-[7.5rem] h-[7.5rem] animate-spin'
            style={{ backgroundImage: `url('${pokeballIconSmall}')` }}
          />
        </div>
      </div>
    );

  return (
    <div
      className='flex mdl:hidden w-[20rem] h-[38.25rem] flex-wrap flex-col pt-[7rem] pb-[6rem] gap-[0.5rem]'
      style={{ backgroundImage: `url('${getModalCard()}')` }}
    >
      <div className='relative w-[20rem] h-[10rem] flex flex-row px-[1.25rem] items-center justify-center '>
        <img
          src={spriteHandler(modalPokemonInfo[0])}
          alt={modalPokemonInfo[0].name.charAt(0).toUpperCase() + modalPokemonInfo[0].name.slice(1)}
          className='relative w-[7.5rem] aspect-square z-20'
        />
      </div>
      {tab === 'Overall' && (
        <div className='relative w-[20rem] h-[12.5rem] z-20 flex flex-col justify-between items-center py-[0.75rem] px-[1.25rem]'>
          <div className='relative w-[17.5rem] z-30 flex flex-col gap-[0.5rem] items-center px-[1.25rem]'>
            <div className='relative text-white font-bold text-[1rem]'>
              {modalPokemonInfo[0].name.charAt(0).toUpperCase() + modalPokemonInfo[0].name.slice(1)}
            </div>
            <div className='flex flex-row gap-[1rem] items-center text-[1.25rem] font-bold text-white'>
              {modalPokemonInfo[0].types.map((element: PokemonType) => (
                <div key={element.type.name}>
                  <TagGetter name={element.type.name} />
                </div>
              ))}
            </div>
            <div className='relative text-white text-[0.5rem] text-center'>{getFlavorText()}</div>
          </div>
          <div className='relative w-[17.5rem] px-[1.25rem] h-[5rem] grid grid-cols-4 grid-rows-4 self-start text-white text-[0.5rem] gap-[0.5rem]'>
            <div className='font-bold col-start-1'>ID:</div>
            <div className='col-start-2'>#{modalPokemonInfo[0].id}</div>
            <div className='font-bold col-start-1'>Height:</div>
            <div className='col-start-2'>{modalPokemonInfo[0].height * 10} cm</div>
            <div className='font-bold col-start-1'>Weight:</div>
            <div className='col-start-2'>{modalPokemonInfo[0].weight / 10} kg</div>
            <div className='font-bold col-start-1'>Abilities:</div>
            <div
              className={`${
                modalPokemonInfo[0].abilities.length >= 3
                  ? 'text-[0.5rem] items-end col-span-3'
                  : 'col-span-3'
              } flex flex-row gap-[0.75rem] col-span-3`}
            >
              {modalPokemonInfo[0].abilities.map(
                (ability: {
                  ability: { name: string; url: string };
                  is_hidden: boolean;
                  base_experience: number;
                }) => (
                  <div key={ability.ability.name}>{ability.ability.name}</div>
                )
              )}
            </div>
          </div>
        </div>
      )}
      {tab === 'Stats' && (
        <div className='relative w-[20rem] h-[12.5rem] z-20 flex flex-col justify-between items-center py-[1.25rem] px-[1.25rem]'>
          <StatDisplay name='HP' stat={modalPokemonInfo[0].stats[0].base_stat} />
          <StatDisplay name='Attack' stat={modalPokemonInfo[0].stats[1].base_stat} />
          <StatDisplay name='Defense' stat={modalPokemonInfo[0].stats[2].base_stat} />
          <StatDisplay name='Sp. Attack' stat={modalPokemonInfo[0].stats[3].base_stat} />
          <StatDisplay name='Sp. Defense' stat={modalPokemonInfo[0].stats[4].base_stat} />
          <StatDisplay name='Speed' stat={modalPokemonInfo[0].stats[5].base_stat} />
        </div>
      )}
      {tab === 'Evolution' && (
        <div className='relative w-[20rem] h-[12.5rem] z-20 flex flex-col justify-between items-center py-[1.25rem] px-[2.5rem] overflow-auto'>
          {hasSecondEvolution() && (
            <GetPokemonSprite name={modalPokemonInfo[2].chain.species.name} />
          )}
          {!hasSecondEvolution() && (
            <div className='relative text-base text-white grow flex justify-center items-center'>
              This pokemon does not evolve
            </div>
          )}
          {hasSecondEvolution() && (
            <>
              <img src={next} alt='next' className='relative w-[0.5rem] aspect-square' />
              <div className='relative flex flex-row flex-wrap justify-center'>
                {modalPokemonInfo[2].chain.evolves_to.map(
                  (evolve: {
                    evolution_details: Array<string>;
                    evolves_to: Array<{
                      evolution_details: Array<string>;
                      evolves_to: Array<{}>;
                      is_baby: boolean;
                      species: { name: string; url: string };
                    }>;
                    is_baby: boolean;
                    species: { name: string; url: string };
                  }) => (
                    <GetPokemonSprite key={evolve.species.name} name={evolve.species.name} />
                  )
                )}
              </div>
            </>
          )}
          {hasThirdEvolution() && (
            <>
              <img src={next} alt='next' className='relative w-[0.5rem] aspect-square' />
              <div>
                {modalPokemonInfo[2].chain.evolves_to.map(
                  (evolve2: {
                    evolution_details: Array<string>;
                    evolves_to: Array<{
                      evolution_details: Array<string>;
                      evolves_to: Array<{}>;
                      is_baby: boolean;
                      species: { name: string; url: string };
                    }>;
                    is_baby: boolean;
                    species: { name: string; url: string };
                  }) => (
                    <div
                      key={evolve2.species.name}
                      className='relative flex flex-row flex-wrap justify-center'
                    >
                      {evolve2.evolves_to.map(
                        (evolve3: {
                          evolution_details: Array<string>;
                          evolves_to: Array<{}>;
                          is_baby: boolean;
                          species: { name: string; url: string };
                        }) => (
                          <GetPokemonSprite
                            key={evolve3.species.name}
                            name={evolve3.species.name}
                          />
                        )
                      )}{' '}
                    </div>
                  )
                )}
              </div>
            </>
          )}
        </div>
      )}
      {tab === 'Habitat' && (
        <div className='relative w-[20rem] h-[12.5rem] z-20 flex flex-col justify-start items-center py-[1.25rem] px-[2.5rem] gap-[1.25rem]'>
          {modalPokemonInfo[1].habitat === null && (
            <>
              <HabitatPicker name='no-information' />
              <div className='relative text-white font-bold text-xs'>No information</div>
            </>
          )}
          {modalPokemonInfo[1].habitat !== null && modalPokemonInfo[1].habitat.name === 'rare' && (
            <>
              <HabitatPicker name={modalPokemonInfo[1].habitat.name} />
              <div className='relative text-white font-bold text-xs'>
                This pokemon is rare to be seen
              </div>
            </>
          )}
          {modalPokemonInfo[1].habitat !== null && modalPokemonInfo[1].habitat.name !== 'rare' && (
            <>
              <HabitatPicker name={modalPokemonInfo[1].habitat.name} />
              <div className='relative text-white font-bold text-xs'>
                This pokemon lives in {modalPokemonInfo[1].habitat.name}
              </div>
            </>
          )}
        </div>
      )}
      <div className='flex flex-row w-[20rem] h[1.25rem] px-[1.25rem] justify-between items-center'>
        <TabChangeButton currentTab={tab} name='Overall' onClick={() => setTab('Overall')} />
        <TabChangeButton currentTab={tab} name='Stats' onClick={() => setTab('Stats')} />
        <TabChangeButton currentTab={tab} name='Evolution' onClick={() => setTab('Evolution')} />
        <TabChangeButton currentTab={tab} name='Habitat' onClick={() => setTab('Habitat')} />
      </div>
    </div>
  );
};

export default ModalCardMobile;
