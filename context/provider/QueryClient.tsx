import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';

import React from 'react'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})

import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
export default function ReactQueryClient({ children }: { children: React.ReactElement }) {
  return (
    <QueryClientProvider client={queryClient} >
      {children}
      <ReactQueryDevtoolsPanel setIsOpen={(value) => console.log(value)} onDragStart={() => console.log('drag start')}/>
    </QueryClientProvider>
  )
}