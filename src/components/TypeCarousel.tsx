import Slider from 'react-slick';

import { ReactComponent as Arrow } from '../assets/svgs/Vector.svg';

import TypeGetter from './TypeGetter';

const NextButton = (props: any) => {
  const { onClick } = props;
  return (
    <button
      type='button'
      className='w-[1.25rem] h-[1.25rem] flex flex-1 justify-center items-center rounded-full border-2 border-black bg-white hover:bg-black duration-200 group'
      onClick={onClick}
    >
      <Arrow className='fill-black group-hover:fill-white w-[0.625rem] duration-200' />
    </button>
  );
};

const PrevButton = (props: any) => {
  const { onClick } = props;
  return (
    <button
      type='button'
      className='w-[1.25rem] h-[1.25rem] flex flex-1 justify-center items-center rounded-full border-2 border-black bg-white hover:bg-black duration-200 group'
      onClick={onClick}
    >
      <Arrow className='fill-black group-hover:fill-white w-[0.625rem] duration-200 rotate-180' />
    </button>
  );
};

const TypeCarousel = () => {
  return (
    <Slider
      dots={false}
      arrows
      infinite
      speed={500}
      slidesToShow={3}
      slidesToScroll={3}
      nextArrow={<NextButton />}
      prevArrow={<PrevButton />}
      responsive={[
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ]}
    >
      <TypeGetter name='normal' />
      <TypeGetter name='fighting' />
      <TypeGetter name='flying' />
      <TypeGetter name='fire' />
      <TypeGetter name='grass' />
      <TypeGetter name='electric' />
      <TypeGetter name='ice' />
      <TypeGetter name='rock' />
      <TypeGetter name='ground' />
      <TypeGetter name='steel' />
      <TypeGetter name='poison' />
      <TypeGetter name='bug' />
      <TypeGetter name='psychic' />
      <TypeGetter name='dark' />
      <TypeGetter name='ghost' />
      <TypeGetter name='dragon' />
      <TypeGetter name='fairy' />
    </Slider>
  );
};

export default TypeCarousel;
