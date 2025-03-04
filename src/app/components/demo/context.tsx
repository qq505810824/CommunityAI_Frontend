'use client';

import { createContext, useContext } from 'use-context-selector';
import { AppData } from './types';

export type MContextValue = {
    appData?: AppData;
    handleAddModel?: () => void;
    handleUpdateModel?: () => void;
    handleDeleteModel?: () => void;
    handleRefresh?: () => void;
    handleSearch?: () => void;
};

export const MContext = createContext<MContextValue>({
    handleAddModel: () => {},
    handleUpdateModel: () => {},
    handleDeleteModel: () => {},
    handleRefresh: () => {},
    handleSearch: () => {}
});
export const useDemoContext = () => useContext(MContext);
