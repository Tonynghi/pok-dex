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

type GenPickerProps = {
  gen: number;
  currentGen: number;
  currentFilter: string;
  onClick: () => void;
};

const GenPicker = ({ gen, currentGen, currentFilter, onClick }: GenPickerProps) => {
  return (
    <button
      type='button'
      className={`${
        currentFilter === 'gen' && currentGen === gen
          ? 'bg-primary hover:bg-primary700 text-white'
          : 'border-2 border-black bg-white hover:bg-black text-black hover:text-white'
      } w-[2.5rem] h-[2.5rem] flex justify-center items-center rounded-full duration-200 text-[1rem] mx-auto grow font-bold`}
      onClick={onClick}
    >
      {/* {gens[gen as keyof typeof gens]} */ int2roman(gen)}
    </button>
  );
};

export default GenPicker;
