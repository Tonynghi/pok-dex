import { FilterHandlerProps } from '../types';

const int2roman = (original: number): string => {
  if (original < 1 || original > 3999) {
    throw new Error('Error: Input integer limited to 1 through 3,999');
  }

  const numerals = [
    ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'], // 1-9
    ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'], // 10-90
    ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'], // 100-900
    ['M', 'MM', 'MMM'], // 1000-3000
  ];

  const digits = Math.round(original).toString().split('');
  let position = digits.length - 1;

  return digits.reduce((roman, digit) => {
    if (digit !== '0') {
      roman += numerals[position][parseInt(digit, 10) - 1];
    }

    position -= 1;

    return roman;
  }, '');
};

type GenButtonProps = {
  gen: number;
  currentGen: number;
  currentFilter: string;
  onClick: () => void;
};

const GenButton = ({ gen, currentGen, currentFilter, onClick }: GenButtonProps) => {
  return (
    <button
      type='button'
      className={`${
        currentFilter === 'gen' && currentGen === gen
          ? 'bg-primary hover:bg-primary700 text-white'
          : 'border-2 border-black bg-white hover:bg-black text-black hover:text-white'
      } w-[2.5rem] aspect-ratio-1 flex justify-center items-center rounded-full duration-200 text-[1rem]  font-bold`}
      onClick={onClick}
    >
      {/* {gens[gen as keyof typeof gens]} */ int2roman(gen)}
    </button>
  );
};

type GenPickerProps = {
  filterHandler: FilterHandlerProps;
};

const GenPicker = ({ filterHandler }: GenPickerProps) => {
  const genArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className='w-full h-[2.5rem] flex flex-row justify-center gap-[0.75rem] relative self-center'>
      {genArray.map((gen: number) => (
        <GenButton
          key={gen}
          gen={gen}
          currentGen={filterHandler.getCurrentGen()}
          currentFilter={filterHandler.getCurrentFilter()}
          onClick={() => {
            if (
              filterHandler.getCurrentFilter() === 'gen' &&
              filterHandler.getCurrentGen() === gen
            ) {
              filterHandler.changeCurrentFilter('none');
            } else {
              filterHandler.changeCurrentFilter('gen');
              filterHandler.changeCurrentGen(gen);
            }
          }}
        />
      ))}
    </div>
  );
};

export default GenPicker;
