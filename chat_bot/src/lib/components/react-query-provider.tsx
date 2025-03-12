'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
type ReactQueryProviderPropsType = {
  children: React.ReactNode;
};
export function ReactQueryProvider(props: ReactQueryProviderPropsType) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}
