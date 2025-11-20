'use client';

import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

type Props = { children: ReactNode };

export function Providers({ children }: Props) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false
          }
        }
      })
  );

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={client}>
        {children}
      </QueryClientProvider>
    </ReduxProvider>
  );
}
