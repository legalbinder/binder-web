import { createContext } from 'react';

export type BackgroundType = 'none' | 'video';

interface BackgroundContextType {
  background: BackgroundType;
  setBackground: (background: BackgroundType) => void;
}

export const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);
