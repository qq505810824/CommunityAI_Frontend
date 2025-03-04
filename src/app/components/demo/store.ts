import { create } from 'zustand';

type State = {
    appDetail?: any;
};

type Action = {
    setAppDetail: (appDetail?: any) => void;
};

export const useStore = create<State & Action>((set) => ({
    appDetail: undefined,
    setAppDetail: (appDetail) => set(() => ({ appDetail }))
}));
