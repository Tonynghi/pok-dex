import Slider from 'react-slick';

import { ReactComponent as Arrow } from '../assets/svgs/Vector.svg';
import { FilterHandlerProps } from '../types';

import { PageChangeHandlerProps } from './Pagination';
import TypePicker from './TypePicker';

type NavButtonProps = {
  onClick: () => void;
};

const NextButton = ({ onClick }: NavButtonProps) => {
  return (
    <button
      style={{ aspectRatio: 1 / 1 }}
      type='button'
      className='w-[1.25rem] h-[1.25rem] flex flex-1 justify-center items-center rounded-full border-2 border-black bg-white hover:bg-black duration-200 group'
      onClick={onClick}
    >
      <Arrow className='fill-black group-hover:fill-white w-[0.625rem] duration-200' />
    </button>
  );
};

const PrevButton = ({ onClick }: NavButtonProps) => {
  return (
    <button
      style={{ aspectRatio: 1 / 1 }}
      type='button'
      className='w-[1.25rem] h-[1.25rem] flex flex-1 justify-center items-center rounded-full border-2 border-black bg-white hover:bg-black duration-200 group'
      onClick={onClick}
    >
      <Arrow className='fill-black group-hover:fill-white w-[0.625rem] duration-200 rotate-180' />
    </button>
  );
};

type TypeCarouselProps = {
  filterHandler: FilterHandlerProps;
  pageChangeHandler: PageChangeHandlerProps;
};

const TypeCarousel = ({ filterHandler, pageChangeHandler }: TypeCarouselProps) => {
  const typeArray: Array<string> = [
    'normal',
    'fighting',
    'flying',
    'grass',
    'fire',
    'water',
    'electric',
    'ice',
    'rock',
    'ground',
    'steel',
    'poison',
    'bug',
    'psychic',
    'dark',
    'ghost',
    'dragon',
    'fairy',
  ];

  return (
    <Slider
      dots={false}
      arrows
      infinite
      speed={500}
      slidesToShow={9}
      slidesToScroll={9}
      nextArrow={<NextButton onClick={() => console.log('next')} />}
      prevArrow={<PrevButton onClick={() => console.log('prev')} />}
      className='flex'
      responsive={[
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 9,
            slidesToScroll: 9,
          },
        },
        {
          breakpoint: 720,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
      ]}
    >
      {typeArray.map((type: string) => (
        <TypePicker
          key={type}
          type={type}
          currentType={filterHandler.getCurrentType()}
          currentFilter={filterHandler.getCurrentFilter()}
          onClick={() => {
            if (
              filterHandler.getCurrentFilter() === 'type' &&
              filterHandler.getCurrentType() === type
            ) {
              filterHandler.changeCurrentFilter('none');
              pageChangeHandler.changePage(1);
            } else {
              filterHandler.changeCurrentFilter('type');
              filterHandler.changeCurrentType(type);
              pageChangeHandler.changePage(1);
            }
          }}
        />
      ))}
    </Slider>
  );
};

export default TypeCarousel;
