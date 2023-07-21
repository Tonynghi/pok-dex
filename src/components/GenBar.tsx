import { useFetchTypeState, useGenState, usePageState } from '../store/Store';

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

  // TODO: Could expand to support fractions, simply rounding for now
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

type GenProps = {
  gen: number;
};

const GenButton = ({ gen }: GenProps) => {
  const currentFetchType = useFetchTypeState((state) => state.currentFetchType);
  const currentGen = useGenState((state) => state.currentGen);
  const changeFetchType = useFetchTypeState((state) => state.changeFetchType);
  const changeGen = useGenState((state) => state.changeGen);
  const reset = usePageState((state) => state.reset);

  const fetchByGen = (toGen: string) => {
    if (currentFetchType !== 'gen') {
      changeGen(toGen);
      changeFetchType('gen');
      reset();
    } else if (currentFetchType === 'gen' && currentGen === toGen) {
      changeFetchType('default');
      reset();
    } else {
      changeGen(toGen);
      reset();
    }
  };

  return (
    <button
      type='button'
      className={`${
        currentFetchType === 'gen' && currentGen === gen.toString()
          ? 'bg-primary hover:bg-primary700 text-white'
          : 'border-2 border-black bg-white hover:bg-black text-black hover:text-white'
      } w-[2.5rem] aspect-ratio-1 flex justify-center items-center rounded-full duration-200 text-[1rem]  font-bold`}
      onClick={() => fetchByGen(gen.toString())}
    >
      {/* {gens[gen as keyof typeof gens]} */ int2roman(gen)}
    </button>
  );
};

const GenBar = () => {
  return (
    <div className='w-full h-[2.5rem] flex flex-row justify-center gap-[0.75rem] relative self-center'>
      <GenButton gen={1} />
      <GenButton gen={2} />
      <GenButton gen={3} />
      <GenButton gen={4} />
      <GenButton gen={5} />
      <GenButton gen={6} />
      <GenButton gen={7} />
      <GenButton gen={8} />
      <GenButton gen={9} />
    </div>
  );
};

export default GenBar;
