import { ReactComponent as Close } from '../assets/svgs/close.svg';
import { ReactComponent as Displaydesktop } from '../assets/svgs/Display Desktop.svg';

const DisplayCard = () => {
  return (
    <div className='fixed z-50 flex justify-center items-center w-screen h-screen '>
      <div
        aria-hidden
        className='absolute w-screen h-screen bg-black opacity-75 z-0'
        onClick={() => {
          console.log('off');
        }}
      />
      <div className='relative z-10'>
        <Displaydesktop className='w-[43.75rem] h-[18.75rem]' />
        <div className='absolute top-[0.75rem] right-[0.75rem] w-[1.25rem] h-[1.25rem] rounded-full bg-secondary500 z-10 flex justify-center items-center '>
          <Close
            className='cursor-pointer'
            onClick={() => {
              console.log('off');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayCard;
