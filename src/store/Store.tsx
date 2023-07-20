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
  currentType: string;
  changeType: (type: string) => void;
}

const useFetchTypeState = create<FetchTypeState>()((set) => ({
  currentType: 'none',
  changeType: (type) => set(() => ({ currentType: type })),
}));

export { usePageState, useFetchTypeState };
