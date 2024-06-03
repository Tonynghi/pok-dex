import Slider from 'react-slick';

import { ReactComponent as Arrow } from '../assets/svgs/Vector.svg';

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

type CarouselProps = {
  children: React.ReactNode;
};

const Carousel = ({ children }: CarouselProps) => {
  return (
    <Slider
      dots={false}
      arrows
      infinite
      speed={500}
      slidesToShow={6}
      slidesToScroll={6}
      nextArrow={<NextButton onClick={() => console.log('next')} />}
      prevArrow={<PrevButton onClick={() => console.log('prev')} />}
      className='flex relative w-[17.5rem] sm:w-[20rem] md:w-[37.5rem] lg:w-[47.5rem]'
      responsive={[
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6,
          },
        },
        {
          breakpoint: 720,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
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
      {children}
    </Slider>
  );
};

export default Carousel;
