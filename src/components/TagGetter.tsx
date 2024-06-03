import { ReactComponent as Bug } from '../assets/svgs/Bug Tag.svg';
import { ReactComponent as Dark } from '../assets/svgs/Dark Tag.svg';
import { ReactComponent as Dragon } from '../assets/svgs/Dragon Tag.svg';
import { ReactComponent as Electric } from '../assets/svgs/Electric Tag.svg';
import { ReactComponent as Fairy } from '../assets/svgs/Fairy Tag.svg';
import { ReactComponent as Fighting } from '../assets/svgs/Fighting Tag.svg';
import { ReactComponent as Fire } from '../assets/svgs/Fire Tag.svg';
import { ReactComponent as Flying } from '../assets/svgs/Flying Tag.svg';
import { ReactComponent as Ghost } from '../assets/svgs/Ghost Tag.svg';
import { ReactComponent as Grass } from '../assets/svgs/Grass Tag.svg';
import { ReactComponent as Ground } from '../assets/svgs/Ground Tag.svg';
import { ReactComponent as Ice } from '../assets/svgs/Ice Tag.svg';
import { ReactComponent as Normal } from '../assets/svgs/Normal Tag.svg';
import { ReactComponent as Poison } from '../assets/svgs/Poison Tag.svg';
import { ReactComponent as Psychic } from '../assets/svgs/Psychic Tag.svg';
import { ReactComponent as Rock } from '../assets/svgs/Rock Tag.svg';
import { ReactComponent as Steel } from '../assets/svgs/Steel Tag.svg';
import { ReactComponent as Water } from '../assets/svgs/Water Tag.svg';

const types = {
  bug: <Bug className='typeTag' />,
  dark: <Dark className='typeTag' />,
  dragon: <Dragon className='typeTag' />,
  electric: <Electric className='typeTag' />,
  fairy: <Fairy className='typeTag' />,
  fighting: <Fighting className='typeTag' />,
  fire: <Fire className='typeTag' />,
  flying: <Flying className='typeTag' />,
  ghost: <Ghost className='typeTag' />,
  grass: <Grass className='typeTag' />,
  ground: <Ground className='typeTag' />,
  ice: <Ice className='typeTag' />,
  normal: <Normal className='typeTag' />,
  poison: <Poison className='typeTag' />,
  psychic: <Psychic className='typeTag' />,
  rock: <Rock className='typeTag' />,
  steel: <Steel className='typeTag' />,
  water: <Water className='typeTag' />,
};

type TagGetterProps = {
  name: string;
};

const TagGetter = ({ name }: TagGetterProps) => {
  return <div className=''>{types[name as keyof typeof types]}</div>;
};

export default TagGetter;
