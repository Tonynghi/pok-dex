import { ReactComponent as MagniGlass } from '../assets/svgs/magnifying-glasses.svg';
import { FilterHandlerProps } from '../types';

type SearchBarProps = {
  filterHandler: FilterHandlerProps;
};

const SearchBar = ({ filterHandler }: SearchBarProps) => {
  return (
    <div className='w-[100%] h-[2.5rem] justify-center items-center flex flex-row'>
      <input
        type='text'
        className='relative w-[17.5rem] sm:w-[20rem] md:w-[37.5rem] lg:w-[47.5rem] h-[2.5rem] bg-[#D7D7D7] px-4 text-black rounded-l-lg text-base'
        placeholder='Search for a pokemon ...'
        onChange={() => {
          const searchValue = document.querySelector('input')?.value;
          if (searchValue !== undefined) {
            filterHandler.changeSearchPokemon(searchValue);
            filterHandler.changeCurrentFilter('name');
            if (searchValue === '') {
              filterHandler.changeCurrentFilter('none');
            }
          }
        }}
      />
      <div className='relative w-[2.5rem] h-[2.5rem] bg-[#EF2B34] rounded-r-lg flex items-center justify-center'>
        <MagniGlass />
      </div>
    </div>
  );
};

export default SearchBar;
