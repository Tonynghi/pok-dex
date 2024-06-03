import { ReactComponent as FirstArr } from '../assets/svgs/FirstArrow.svg';
import { ReactComponent as LastArr } from '../assets/svgs/LastArrow.svg';
import { ReactComponent as NextArr } from '../assets/svgs/NextArrow.svg';
import { ReactComponent as PrevArr } from '../assets/svgs/PrevArrow.svg';

type NavigateButtonProps = {
  type: string;
  currentPage: number;
  firstPage: number;
  lastPage: number;
  onClick: () => void;
};

const NavigateButton = ({
  type,
  currentPage,
  firstPage,
  lastPage,
  onClick,
}: NavigateButtonProps) => {
  if (type === 'next')
    return (
      <button
        type='button'
        aria-label='next'
        className={`${
          currentPage === lastPage ? 'opacity-25 cursor-default' : 'hover:bg-secondary50'
        } w-[1.5rem]  aspect-square sm:w-[2.5rem] flex justify-center rounded-full  duration-200 flex items-center justify-center`}
        onClick={onClick}
      >
        <NextArr className='hover:fill-secondary50 w-[1rem] aspect-square sm:w-[1.5rem]' />
      </button>
    );
  if (type === 'prev')
    return (
      <button
        type='button'
        aria-label='prev'
        className={`${
          currentPage === firstPage ? 'opacity-25 cursor-default' : 'hover:bg-secondary50'
        } w-[1.5rem]  aspect-square sm:w-[2.5rem] flex justify-center rounded-full  duration-200 flex items-center justify-center`}
        onClick={onClick}
      >
        <PrevArr className='hover:fill-secondary50 w-[1rem] aspect-square sm:w-[1.5rem]' />
      </button>
    );
  if (type === 'first')
    return (
      <button
        type='button'
        aria-label='first'
        className='w-[1.5rem] aspect-square sm:w-[2.5rem] flex justify-center rounded-full hover:bg-secondary50 duration-200 flex items-center justify-center'
        onClick={onClick}
      >
        <FirstArr className='hover:fill-secondary50 w-[1rem] aspect-square sm:w-[1.5rem]' />
      </button>
    );
  return (
    <button
      type='button'
      aria-label='last'
      className='w-[1.5rem] aspect-square sm:w-[2.5rem] flex justify-center rounded-full hover:bg-secondary50 duration-200 flex items-center justify-center'
      onClick={onClick}
    >
      <LastArr className='hover:fill-secondary50 w-[1rem] aspect-square sm:w-[1.5rem]' />
    </button>
  );
};

export default NavigateButton;
