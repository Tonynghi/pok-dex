import { ReactComponent as Bug } from '../assets/svgs/Bug Card.svg';
import { ReactComponent as Dark } from '../assets/svgs/Dark Card.svg';
import { ReactComponent as Dragon } from '../assets/svgs/Dragon Card.svg';
import { ReactComponent as Electric } from '../assets/svgs/Electric Card.svg';
import { ReactComponent as Fairy } from '../assets/svgs/Fairy Card.svg';
import { ReactComponent as Fighting } from '../assets/svgs/Fighting Card.svg';
import { ReactComponent as Fire } from '../assets/svgs/Fire Card.svg';
import { ReactComponent as Flying } from '../assets/svgs/Flying Card.svg';
import { ReactComponent as Ghost } from '../assets/svgs/Ghost Card.svg';
import { ReactComponent as Grass } from '../assets/svgs/Grass Card.svg';
import { ReactComponent as Ground } from '../assets/svgs/Ground Card.svg';
import { ReactComponent as Ice } from '../assets/svgs/Ice Card.svg';
import { ReactComponent as Normal } from '../assets/svgs/Normal Card.svg';
import { ReactComponent as Poison } from '../assets/svgs/Poison Card.svg';
import { ReactComponent as Psychic } from '../assets/svgs/Psychic Card.svg';
import { ReactComponent as Rock } from '../assets/svgs/Rock Card.svg';
import { ReactComponent as Steel } from '../assets/svgs/Steel Card.svg';
import { ReactComponent as Water } from '../assets/svgs/Water Card.svg';

const types = {
  bug: <Bug className='typeCard' />,
  dark: <Dark className='typeCard' />,
  dragon: <Dragon className='typeCard' />,
  electric: <Electric className='typeCard' />,
  fairy: <Fairy className='typeCard' />,
  fighting: <Fighting className='typeCard' />,
  fire: <Fire className='typeCard' />,
  flying: <Flying className='typeCard' />,
  ghost: <Ghost className='typeCard' />,
  grass: <Grass className='typeCard' />,
  ground: <Ground className='typeCard' />,
  ice: <Ice className='typeCard' />,
  normal: <Normal className='typeCard' />,
  poison: <Poison className='typeCard' />,
  psychic: <Psychic className='typeCard' />,
  rock: <Rock className='typeCard' />,
  steel: <Steel className='typeCard' />,
  water: <Water className='typeCard' />,
};

const CardGetter = (props: any) => {
  const { name } = props;

  return <div className=''>{types[name as keyof typeof types]}</div>;
};

export default CardGetter;
