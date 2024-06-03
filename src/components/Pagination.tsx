import NavigateButton from './NavigationButton';

type PageButtonProps = {
  page: number;
  selectedPage: number;
  onClick: () => void;
};

const PageButton = ({ page, selectedPage, onClick }: PageButtonProps) => {
  return (
    <button
      type='button'
      className={`w-[1.5rem] aspect-square sm:w-[2.5rem] flex justify-center items-center rounded-full text-[0.5rem] sm:text-[1rem] font-bold duration-200 ${
        selectedPage === page
          ? 'bg-primary text-white'
          : 'border-2 border-black bg-white hover:bg-black text-black hover:text-white '
      }`}
      onClick={onClick}
    >
      {page}
    </button>
  );
};

export type PageChangeHandlerProps = {
  getCurrentPage: () => number;
  changePage: (page: number) => void;
  changePreviousPage: () => void;
  changeNextPage: () => void;
};

type PaginationProps = {
  count: number;
  countPerPage: number;
  pageChangeHandler: PageChangeHandlerProps;
};

const Pagination = ({ count, countPerPage, pageChangeHandler }: PaginationProps) => {
  let numberOfPages = Math.floor(count / countPerPage);
  if (count / countPerPage !== 0) numberOfPages += 1;

  const arrayOfPages = [];
  for (let i = 1; i < numberOfPages + 1; i += 1) {
    arrayOfPages.push(i);
  }

  const currentPage = pageChangeHandler.getCurrentPage();

  const inRange = currentPage <= 3 || currentPage > numberOfPages - 3;

  return (
    <div className='relative flex flex-row gap-[0.5rem] sm:gap-[1.25rem] justify-center items-center'>
      <NavigateButton
        type='first'
        currentPage={pageChangeHandler.getCurrentPage()}
        firstPage={1}
        lastPage={numberOfPages}
        onClick={() => pageChangeHandler.changePage(1)}
      />
      <NavigateButton
        type='prev'
        currentPage={pageChangeHandler.getCurrentPage()}
        firstPage={1}
        lastPage={numberOfPages}
        onClick={() => {
          if (pageChangeHandler.getCurrentPage() !== 1) pageChangeHandler.changePreviousPage();
          else console.log('aleardy on first page');
        }}
      />
      {arrayOfPages.slice(0, 3).map((page: number) => (
        <div key={page}>
          <PageButton
            page={page}
            selectedPage={currentPage}
            onClick={() => pageChangeHandler.changePage(page)}
          />
        </div>
      ))}
      {!inRange && <div className='relative text-[1rem] font-bold text-black'>...</div>}
      {!inRange &&
        arrayOfPages.slice(currentPage - 1, currentPage).map((page: number) => (
          <div key={page}>
            <PageButton
              page={page}
              selectedPage={currentPage}
              onClick={() => pageChangeHandler.changePage(page)}
            />
          </div>
        ))}
      <div className='relative text-[1rem] font-bold text-black'>...</div>
      {arrayOfPages.slice(numberOfPages - 3, numberOfPages).map((page: number) => (
        <div key={page}>
          <PageButton
            page={page}
            selectedPage={currentPage}
            onClick={() => pageChangeHandler.changePage(page)}
          />
        </div>
      ))}
      <NavigateButton
        type='next'
        currentPage={pageChangeHandler.getCurrentPage()}
        firstPage={1}
        lastPage={numberOfPages}
        onClick={() => {
          if (pageChangeHandler.getCurrentPage() !== numberOfPages)
            pageChangeHandler.changeNextPage();
          else console.log('already on last page');
        }}
      />
      <NavigateButton
        type='last'
        currentPage={pageChangeHandler.getCurrentPage()}
        firstPage={1}
        lastPage={numberOfPages}
        onClick={() => pageChangeHandler.changePage(numberOfPages)}
      />
    </div>
  );
};

export default Pagination;
