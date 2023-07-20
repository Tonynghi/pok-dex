import { usePageState } from '../store/Store';

import NavigateButton from './NavigationButton';

const PageButton = (props: any) => {
  const { page, selected, onClick } = props;
  return (
    <button
      type='button'
      className={`w-[1.5rem] aspect-square sm:w-[2.5rem] flex justify-center items-center rounded-full text-[0.5rem] sm:text-[1rem] font-bold duration-200 ${
        selected === page
          ? 'bg-primary text-white'
          : 'border-2 border-black bg-white hover:bg-black text-black hover:text-white '
      }`}
      onClick={onClick}
    >
      {page}
    </button>
  );
};

const Pagination = (props: any) => {
  const { count, countPerPage } = props;

  let page = Math.floor(count / countPerPage);
  if (count / countPerPage !== 0) page += 1;

  const pages = [];
  for (let i = 1; i < page + 1; i += 1) {
    pages.push(i);
  }

  const current = usePageState((state) => state.currentPage);
  const changePage = usePageState((state) => state.changeTo);
  const increase = usePageState((state) => state.increase);
  const decrease = usePageState((state) => state.decrease);

  const inRange = current < 3 || current > 104;

  return (
    <div className='relative flex flex-row gap-[0.5rem] sm:gap-[1.25rem] justify-center items-center'>
      <NavigateButton type='first' onClick={() => changePage(1)} last={page} />
      <NavigateButton type='prev' onClick={() => decrease()} last={page} />
      {inRange &&
        pages.slice(0, 3).map((pagenum: number) => (
          <div key={pagenum}>
            <PageButton page={pagenum} selected={current} onClick={() => changePage(pagenum)} />
          </div>
        ))}
      {!inRange &&
        pages.slice(current - 2, current + 1).map((pagenum: number) => (
          <div key={pagenum}>
            <PageButton page={pagenum} selected={current} onClick={() => changePage(pagenum)} />
          </div>
        ))}
      <div className='relative text-[1rem] font-bold text-black'>...</div>
      {pages.slice(page - 3, page).map((pagenum: number) => (
        <div key={pagenum}>
          <PageButton page={pagenum} selected={current} onClick={() => changePage(pagenum)} />
        </div>
      ))}
      <NavigateButton type='next' onClick={() => increase()} last={page} />
      <NavigateButton type='last' onClick={() => changePage(page)} last={page} />
    </div>
  );
};

export default Pagination;
