import { Link } from 'react-router-dom';

import Homebg from '../assets/images/homebg.png';
import Object from '../assets/images/Object.png';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <img
        className='absolute top-0 z-0 z-0 w-screen h-screen object-cover object-center'
        src={Homebg}
        alt='Home bg'
      />
      <div className='relative lg:hidden px-[1.25rem] top-[5rem] w-screen z-10 flex flex-col gap-[2.5rem] items-center'>
        <img className='' src={Object} alt='Pokedex' />
        <div className='relative gap-[1.25rem] flex flex-col items-center'>
          <div className='relative w-[17.5rem] text-[3.25rem] font-bold flex items-center justify-center text-center text-white'>
            POKÉDEX test
          </div>
          <div className='relative w-[17.5rem] text-[1rem] items-center justify-center text-center text-white'>
            A collection of every pocket monsters,all in one site
          </div>
        </div>
        <div className='relative gap-[0.5rem] flex flex-col items-center'>
          <Link to='/gallery'>
            <div className='relative w-[7.5rem] h-[2.5rem] bg-primary font-bold text-[1rem] flex items-center justify-center text-white hover:bg-primary700 duration-200'>
              Explore now
            </div>
          </Link>
          <div className='relative flex items-center justify-center text-white text-[0.5rem]'>
            <button
              type='button'
              className='text-primary pr-[0.125rem] hover:text-primary700 duration-200'
            >
              Log in
            </button>
            for better experience
          </div>
        </div>
      </div>
      <div className='relative hidden lg:flex w-screen px-[5rem] top-[10rem] flex-row grow justify-between '>
        <div className='relative flex flex-col gap-[3rem] justify-between py-[4rem]'>
          <div className='relative gap-[1.25rem] flex flex-col items-center'>
            <div className='relative text-[6rem] font-bold flex items-center justify-center text-center text-white'>
              POKÉDEX
            </div>
            <div className='relative text-[1rem] items-center justify-center text-center text-white'>
              A collection of every pocket monsters,all in one site
            </div>
          </div>
          <div className='relative gap-[0.5rem] flex flex-col items-center'>
            <Link to='/gallery'>
              <div className='relative w-[15rem] h-[5rem] bg-primary font-bold text-[1.5rem] flex items-center justify-center text-white hover:bg-primary700 duration-200'>
                Explore now
              </div>
            </Link>
            <div className='relative flex items-center justify-center text-white text-[1rem]'>
              <button
                type='button'
                className='text-primary pr-[0.125rem] hover:text-primary700 duration-200'
              >
                Log in
              </button>
              for better experience
            </div>
          </div>
        </div>
        <img className='self-center w-[30rem] h-[30rem]' src={Object} alt='Pokedex' />
      </div>
    </div>
  );
};

export default Home;
