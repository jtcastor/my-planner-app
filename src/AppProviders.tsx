import React, { ReactNode } from 'react';
import { AppProvider } from './presentation/contexts/AppContext';

// Providers: Wraps all contexts/providers for the app.
// Used in custom entry point.
export const AppProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <AppProvider>{children}</AppProvider>; // Wraps providers simply
};