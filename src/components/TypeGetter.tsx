import { ReactComponent as Bug } from '../assets/svgs/bug.svg';
import { ReactComponent as Dark } from '../assets/svgs/dark.svg';
import { ReactComponent as Dragon } from '../assets/svgs/dragon.svg';
import { ReactComponent as Electric } from '../assets/svgs/electric.svg';
import { ReactComponent as Fairy } from '../assets/svgs/fairy.svg';
import { ReactComponent as Fighting } from '../assets/svgs/fighting.svg';
import { ReactComponent as Fire } from '../assets/svgs/fire.svg';
import { ReactComponent as Flying } from '../assets/svgs/flying.svg';
import { ReactComponent as Ghost } from '../assets/svgs/ghost.svg';
import { ReactComponent as Grass } from '../assets/svgs/grass.svg';
import { ReactComponent as Ground } from '../assets/svgs/ground.svg';
import { ReactComponent as Ice } from '../assets/svgs/ice.svg';
import { ReactComponent as Normal } from '../assets/svgs/normal.svg';
import { ReactComponent as Poison } from '../assets/svgs/poison.svg';
import { ReactComponent as Psychic } from '../assets/svgs/psychic.svg';
import { ReactComponent as Rock } from '../assets/svgs/rock.svg';
import { ReactComponent as Steel } from '../assets/svgs/steel.svg';
import { ReactComponent as Water } from '../assets/svgs/water.svg';
import { useTypeState, useFetchTypeState, usePageState } from '../store/Store';

const types = {
  bug: <Bug className='typeIcon' />,
  dark: <Dark className='typeIcon' />,
  dragon: <Dragon className='typeIcon' />,
  electric: <Electric className='typeIcon' />,
  fairy: <Fairy className='typeIcon' />,
  fighting: <Fighting className='typeIcon' />,
  fire: <Fire className='typeIcon' />,
  flying: <Flying className='typeIcon' />,
  ghost: <Ghost className='typeIcon' />,
  grass: <Grass className='typeIcon' />,
  ground: <Ground className='typeIcon' />,
  ice: <Ice className='typeIcon' />,
  normal: <Normal className='typeIcon' />,
  poison: <Poison className='typeIcon' />,
  psychic: <Psychic className='typeIcon' />,
  rock: <Rock className='typeIcon' />,
  steel: <Steel className='typeIcon' />,
  water: <Water className='typeIcon' />,
};

const TypeGetter = (props: any) => {
  const { name } = props;

  const currentFetchType = useFetchTypeState((state) => state.currentFetchType);
  const currentType = useTypeState((state) => state.currentType);
  const changeFetchType = useFetchTypeState((state) => state.changeFetchType);
  const changeType = useTypeState((state) => state.changeType);
  const reset = usePageState((state) => state.reset);

  const fetchByType = (type: string) => {
    if (currentFetchType !== 'type') {
      changeType(type);
      changeFetchType('type');
      reset();
    } else if (currentFetchType === 'type' && currentType === type) {
      changeFetchType('default');
      reset();
    } else {
      changeType(type);
      reset();
    }
  };

  return (
    <button
      type='button'
      className={`${
        currentFetchType === 'type' && currentType === name
          ? 'scale-[1.12] drop-shadow-md'
          : 'hover:scale-[1.12]'
      } relative flex justify-center items-center h-[3rem] duration-200 grow mx-auto`}
      onClick={() => fetchByType(name)}
    >
      {types[name as keyof typeof types]}
    </button>
  );
};

export default TypeGetter;
