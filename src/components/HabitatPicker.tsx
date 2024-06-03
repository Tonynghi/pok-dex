import { ReactComponent as Cave } from '../assets/svgs/cave.svg';
import { ReactComponent as Forest } from '../assets/svgs/forest.svg';
import { ReactComponent as Grassland } from '../assets/svgs/grassland.svg';
import { ReactComponent as Mountain } from '../assets/svgs/mountain.svg';
import { ReactComponent as NoInfo } from '../assets/svgs/no-information.svg';
import { ReactComponent as Rare } from '../assets/svgs/rare.svg';
import { ReactComponent as RoughTerrain } from '../assets/svgs/rough-terrain.svg';
import { ReactComponent as Sea } from '../assets/svgs/sea.svg';
import { ReactComponent as Urban } from '../assets/svgs/urban.svg';
import { ReactComponent as WatersEdge } from '../assets/svgs/waters-edge.svg';

const HabitatIcons = {
  'no-information': (
    <NoInfo className='fill-white w-[7.5rem] mdl:w-[12.5rem] aspect-square relative' />
  ),
  cave: <Cave className='fill-white w-[7.5rem] mdl:w-[12.5rem] aspect-square relative' />,
  forest: <Forest className='fill-white w-[7.5rem] mdl:w-[12.5rem] aspect-square relative' />,
  grassland: <Grassland className='fill-white w-[7.5rem] mdl:w-[12.5rem] aspect-square relative' />,
  mountain: <Mountain className='fill-white w-[7.5rem] mdl:w-[12.5rem] aspect-square relative' />,
  rare: <Rare className='fill-white w-[7.5rem] mdl:w-[12.5rem] aspect-square relative' />,
  'rough-terrain': (
    <RoughTerrain className='fill-white w-[7.5rem] mdl:w-[12.5rem] aspect-square relative' />
  ),
  sea: <Sea className='fill-white w-[7.5rem] mdl:w-[12.5rem] aspect-square relative' />,
  urban: <Urban className='fill-white w-[7.5rem] mdl:w-[12.5rem] aspect-square relative' />,
  'waters-edge': (
    <WatersEdge className='fill-white w-[7.5rem] mdl:w-[12.5rem] aspect-square relative' />
  ),
};

type HabitatPickerProps = {
  name: string;
};

const HabitatPicker = ({ name }: HabitatPickerProps) => {
  return <div>{HabitatIcons[name as keyof typeof HabitatIcons]}</div>;
};

export default HabitatPicker;
