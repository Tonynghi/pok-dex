import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Avatar } from '../assets/svgs/avatar.svg';
import { ReactComponent as Close } from '../assets/svgs/close.svg';
import { ReactComponent as LogoMobile } from '../assets/svgs/LogoMobile.svg';
import { ReactComponent as Menu } from '../assets/svgs/menu.svg';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className='absolute top-0 left-0 z-30 w-screen h-[3.75rem] lg:h-[5rem] bg-secondary500 text-white px-[1.25rem] lg:px-[5rem] py-[0.75rem] lg:py-[1.25rem] flex flex-row justify-between'>
        <Link to='/'>
          <div className='relative'>
            <LogoMobile className='lg:h-[40px]' />
          </div>
        </Link>
        <div className='relative hidden lg:flex flex-row justify-between w-[42.5rem]'>
          <div className='relative w-[27.5rem] flex flex-row justify-between'>
            <Link to='/gallery'>
              <div className='relative w-[7.5rem] h-[2.5rem] text-[1rem] flex items-center justify-center hover:text-primary duration-200'>
                Gallery
              </div>
            </Link>
            <Link to='/about'>
              <div className='relative w-[7.5rem] h-[2.5rem] text-[1rem] flex items-center justify-center hover:text-primary duration-200'>
                About
              </div>
            </Link>
            <Link to='/favorite'>
              <div className='relative w-[7.5rem] h-[2.5rem] text-[1rem] flex items-center justify-center hover:text-primary duration-200'>
                Favorite
              </div>
            </Link>
          </div>
          <button
            type='button'
            className='relative w-[7.5rem] h-[2.5rem] bg-primary font-bold text-[1rem] flex items-center justify-center hover:bg-primary700 duration-200'
          >
            Log in
          </button>
        </div>
        <button type='button' className='relative lg:hidden' onClick={() => setOpen(true)}>
          <Menu />
        </button>
      </div>
      <div
        className={`${
          open ? 'visible' : 'hidden'
        } absolute z-40 w-screen h-screen bg-black opacity-75 duration-500 lg:hidden`}
      />
      <div
        className={`${
          open ? 'visible' : 'hidden'
        } absolute top-0 right-0 z-50 h-screen w-[12.5rem] bg-secondary500 text-white duration-500 flex flex-col lg:hidden`}
      >
        <div className='relative h-[3.75rem] w-[12.5rem] px-[1.25rem] py-[0.75rem] flex flex-row justify-end justify-self-start border-b-2'>
          <button type='button' className='relative' onClick={() => setOpen(false)}>
            <Close />
          </button>
        </div>
        <div className='relative w-[12.5rem] px-[1.25rem] py-[2.5rem] flex flex-col gap-[2.5rem] items-end justify-self-start grow font-[1rem]'>
          <Link to='/favorite'>
            <div className='hover:text-primary duration-200'>Gallery</div>
          </Link>
          <Link to='/favorite'>
            <div className='hover:text-primary duration-200'>Favorite</div>
          </Link>
          <Link to='/about'>
            <div className='hover:text-primary duration-200'>About</div>
          </Link>
        </div>
        <Link to='/account'>
          <div className='relative h-[3.75rem] w-[12.5rem] px-[1.25rem] py-[0.75rem] flex flex-row justify-end gap-[0.5rem] justify-self-end border-t-2'>
            <div className='relative flex flex-col justify-between items-end'>
              <div className='text-[1rem] font-bold'>Name</div>
              <div className='text-[0.5rem]'>Email</div>
            </div>
            <div className='relative'>
              <Avatar />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
