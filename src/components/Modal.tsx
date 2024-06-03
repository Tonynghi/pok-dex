import { ModalHandlerProps } from '../types';

type ModalProps = {
  modalHandler: ModalHandlerProps;
  children: React.ReactNode;
};

const Modal = ({ modalHandler, children }: ModalProps) => {
  return (
    <div
      className={`${
        modalHandler.getVisibility() ? 'flex' : 'hidden'
      } z-50 fixed justify-center items-center w-screen h-screen `}
    >
      <div
        aria-hidden
        className='absolute w-screen h-screen bg-black opacity-75 z-0'
        onClick={() => {
          modalHandler.turnOff();
        }}
      />
      <div className='relative z-10'>{children}</div>
    </div>
  );
};

export default Modal;
