import { create } from 'zustand';

interface PageState {
  currentPage: number;
  increase: () => void;
  decrease: () => void;
  changeTo: (pageNumber: number) => void;
  reset: () => void;
}

const usePageState = create<PageState>()((set) => ({
  currentPage: 1,
  increase: () => set((state) => ({ currentPage: state.currentPage + 1 })),
  decrease: () => set((state) => ({ currentPage: state.currentPage - 1 })),
  changeTo: (pageNumber) => set(() => ({ currentPage: pageNumber })),
  reset: () => set(() => ({ currentPage: 1 })),
}));

interface FetchTypeState {
  currentFetchType: string;
  changeFetchType: (fetchType: string) => void;
}

const useFetchTypeState = create<FetchTypeState>()((set) => ({
  currentFetchType: 'default',
  changeFetchType: (fetchType) => {
    set(() => ({ currentFetchType: fetchType }));
    console.log(`the current fetch type is ${fetchType}`);
  },
}));

interface TypeState {
  currentType: string;
  changeType: (type: string) => void;
}

const useTypeState = create<TypeState>()((set) => ({
  currentType: 'normal',
  changeType: (type) => {
    set(() => ({ currentType: type }));
    console.log(type);
  },
}));

interface GenState {
  currentGen: string;
  changeGen: (gen: string) => void;
}

const useGenState = create<GenState>()((set) => ({
  currentGen: '1',
  changeGen: (gen) => {
    set(() => ({ currentGen: gen }));
    console.log(gen);
  },
}));

export { usePageState, useFetchTypeState, useTypeState, useGenState };
