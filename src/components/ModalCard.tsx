import { useEffect, useState } from 'react';

import next from '../assets/images/NextEvo.png';
import pokeballIcon from '../assets/images/Pokeball Icon.png';
import pokedexLegendaryDesktop from '../assets/images/Pokedex Legendary (Desktop).png';
import pokedexLoadingDesktop from '../assets/images/Pokedex Loading (Desktop).png';
import pokedexMythicalDesktop from '../assets/images/Pokedex Mythical (Desktop).png';
import pokedexNormalDesktop from '../assets/images/Pokedex Normal (Desktop).png';
import { ModalHandlerProps, Pokemon, PokemonType } from '../types';

import GetPokemonSprite from './GetPokemonSprite';
import HabitatPicker from './HabitatPicker';
import { spriteHandler } from './PokemonCard';
import TagGetter from './TagGetter';

type ModalCardProps = {
  modalPokemonInfo: Array<Pokemon>;
  modalHandler: ModalHandlerProps;
};

type TabChangeButtonProps = {
  currentTab: string;
  name: string;
  onClick: () => void;
};

const TabChangeButton = ({ currentTab, name, onClick }: TabChangeButtonProps) => {
  return (
    <button
      type='button'
      className={`${
        currentTab === name ? 'bg-black  cursor-default' : 'hover:bg-primary'
      } relative w-[5rem] h-[1.25rem] flex justify-center items-center text-center text-white text-[0.75rem] font-bold duration-200`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

type StatDisplayProps = {
  name: string;
  stat: number;
};

const StatDisplay = ({ name, stat }: StatDisplayProps) => {
  const statToBarWidth = (): number => {
    return (stat / 200) * 160;
  };
  return (
    <div className='relative h-[1.25rem] flex flex-row items-center gap-[0.75rem] text-white font-bold text-base'>
      <div className='relative w-[6.25rem]'>{name}:</div>
      <div className='relative w-[2rem]'>{stat}</div>
      <div className='relative w-[10rem] h-[0.75rem] bg-[#001534] rounded-lg items-center'>
        <div className='h-[0.75rem] rounded-lg' style={{ width: statToBarWidth() }}>
          <div className=' h-[0.75rem] bg-[#0083FC] rounded-lg animate-progress-bar' />
        </div>
      </div>
    </div>
  );
};

const ModalCard = ({ modalPokemonInfo, modalHandler }: ModalCardProps) => {
  const [tab, setTab] = useState('Overall');

  const modalVisibility = modalHandler.getVisibility();

  useEffect(() => {
    setTab('Overall');
  }, [modalVisibility]);

  const getModalCard = (): string => {
    if (modalPokemonInfo[1].is_legendary) return pokedexLegendaryDesktop;
    if (modalPokemonInfo[1].is_mythical) return pokedexMythicalDesktop;
    return pokedexNormalDesktop;
  };

  const getFlavorText = (): string => {
    for (let i = modalPokemonInfo[1].flavor_text_entries.length - 1; i >= 0; i -= 1) {
      if (modalPokemonInfo[1].flavor_text_entries[i].language.name === 'en')
        return modalPokemonInfo[1].flavor_text_entries[i].flavor_text;
    }
    return '';
  };

  if (modalHandler.getModalLoading())
    return (
      <div
        className='w-[52.5rem] h-[37.5rem] '
        style={{ backgroundImage: `url('${pokedexLoadingDesktop}')` }}
      >
        <div className='relative w-[52.5rem] h-[25rem] top-0 flex items-center justify-center text-[#363636] font-bold text-[2.5rem]'>
          <div
            className='relative w-[20rem] h-[20rem] animate-spin'
            style={{ backgroundImage: `url('${pokeballIcon}')` }}
          />
        </div>
      </div>
    );

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

  return (
    <div
      className='w-[52.5rem] h-[37.5rem] flex flex-wrap flex-col'
      style={{ backgroundImage: `url('${getModalCard()}')` }}
    >
      <div className='relative w-[52.5rem] h-[25rem] flex flex-row px-[3.75rem] items-center justify-between '>
        <img
          src={spriteHandler(modalPokemonInfo[0])}
          alt={modalPokemonInfo[0].name.charAt(0).toUpperCase() + modalPokemonInfo[0].name.slice(1)}
          className='relative w-[20rem] aspect-square z-20'
        />
        {tab === 'Overall' && (
          <div className='relative w-[22.5rem] h-[22.5rem] z-20 flex flex-col justify-between items-center py-[1.25rem] px-[1.25rem]'>
            <div className='relative w-[22.5rem] z-30 flex flex-col gap-[0.75rem] items-center px-[1.25rem]'>
              <div className='relative text-white font-bold text-[2.5rem]'>
                {modalPokemonInfo[0].name.charAt(0).toUpperCase() +
                  modalPokemonInfo[0].name.slice(1)}
              </div>
              <div className='flex flex-row gap-[1rem] items-center text-[1.25rem] font-bold text-white'>
                {modalPokemonInfo[0].types.map((element: PokemonType) => (
                  <div key={element.type.name}>
                    <TagGetter name={element.type.name} />
                  </div>
                ))}
              </div>
              <div className='relative text-white text-xs text-center'>{getFlavorText()}</div>
            </div>
            <div className='relative h-[7.25rem] grid grid-cols-4 grid-rows-4 self-start text-white text-base gap-[0.75rem]'>
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
                    ? 'text-xs items-end col-span-3'
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
          <div className='relative w-[22.5rem] h-[22.5rem] z-20 flex flex-col justify-between items-center py-[1.25rem] px-[1.25rem]'>
            <div className='relative w-[22.5rem] z-30 flex flex-col gap-[0.75rem] items-center px-[1.25rem]'>
              <div className='relative text-white font-bold text-[2.5rem]'>
                {modalPokemonInfo[0].name.charAt(0).toUpperCase() +
                  modalPokemonInfo[0].name.slice(1)}
              </div>
              <div className='flex flex-row gap-[1rem] items-center text-[1.25rem] font-bold text-white'>
                {modalPokemonInfo[0].types.map((element: PokemonType) => (
                  <div key={element.type.name}>
                    <TagGetter name={element.type.name} />
                  </div>
                ))}
              </div>
            </div>
            <div className='relative z-30 flex flex-col gap-[0.75rem]'>
              <StatDisplay name='HP' stat={modalPokemonInfo[0].stats[0].base_stat} />
              <StatDisplay name='Attack' stat={modalPokemonInfo[0].stats[1].base_stat} />
              <StatDisplay name='Defense' stat={modalPokemonInfo[0].stats[2].base_stat} />
              <StatDisplay name='Sp. Attack' stat={modalPokemonInfo[0].stats[3].base_stat} />
              <StatDisplay name='Sp. Defense' stat={modalPokemonInfo[0].stats[4].base_stat} />
              <StatDisplay name='Speed' stat={modalPokemonInfo[0].stats[5].base_stat} />
            </div>
          </div>
        )}
        {tab === 'Evolution' && (
          <div className='relative w-[22.5rem] h-[22.5rem] z-20 flex flex-col justify-between items-center py-[1.25rem] px-[1.25rem] overflow-auto'>
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
                <img src={next} alt='next' className='relative w-[1.5rem] aspect-square' />
                <div className='relative flex flex-row flex-wrap'>
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
                <img src={next} alt='next' className='relative w-[1.5rem] aspect-square' />
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
                        className='relative relative flex flex-row flex-wrap'
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
                </div>{' '}
              </>
            )}
          </div>
        )}
        {tab === 'Moves' && (
          <div className='relative w-[22.5rem] h-[22.5rem] z-20 grid grid-cols-2 gap-[1rem] overflow-auto py-[1.25rem] px-[1.25rem]'>
            {modalPokemonInfo[0].moves.map(
              (move: {
                move: { name: string; url: string };
                version_group_details: Array<{
                  level_learned_at: number;
                  move_learn_method: { name: string; url: string };
                  version_group: {
                    name: string;
                    url: string;
                  };
                }>;
              }) => (
                <div
                  key={move.move.name}
                  className='relative w-[9.5rem] h-[2.5rem] flex justify-center items-center bg-[#363636] text-white font-bold text-xs'
                >
                  {move.move.name}
                </div>
              )
            )}
          </div>
        )}
        {tab === 'Habitat' && (
          <div className='relative w-[22.5rem] h-[22.5rem] z-20 flex flex-col justify-start items-center py-[2.5rem] px-[1.25rem] gap-[2.5rem]'>
            <img src='' alt='habitat' className='relative w-[12.5rem] aspect-square' />
            {modalPokemonInfo[1].habitat === null && (
              <div className='relative text-white font-bold text-base'>No information</div>
            )}
            {modalPokemonInfo[1].habitat !== null &&
              modalPokemonInfo[1].habitat.name === 'rare' && (
                <>
                  <HabitatPicker name={modalPokemonInfo[1].habitat.name} />
                  <div className='relative text-white font-bold text-base'>
                    This pokemon is rare to be seen
                  </div>
                </>
              )}
            {modalPokemonInfo[1].habitat !== null &&
              modalPokemonInfo[1].habitat.name !== 'rare' && (
                <>
                  <HabitatPicker name={modalPokemonInfo[1].habitat.name} />
                  <div className='relative text-white font-bold text-base'>
                    This pokemon lives in {modalPokemonInfo[1].habitat.name}
                  </div>
                </>
              )}
          </div>
        )}
      </div>
      <div className='relative w-[52.5rem] h-[12.5rem] z-20 flex flex-row py-[0.75rem]'>
        <div className='relative left-[32.25rem] flex flex-col gap-[0.5rem] justify-start'>
          <TabChangeButton currentTab={tab} name='Overall' onClick={() => setTab('Overall')} />
          <TabChangeButton currentTab={tab} name='Stats' onClick={() => setTab('Stats')} />
          <TabChangeButton currentTab={tab} name='Evolution' onClick={() => setTab('Evolution')} />
          <TabChangeButton currentTab={tab} name='Moves' onClick={() => setTab('Moves')} />
          <TabChangeButton currentTab={tab} name='Habitat' onClick={() => setTab('Habitat')} />
        </div>
      </div>
    </div>
  );
};

export default ModalCard;
