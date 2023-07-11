import { ReactNode } from "react";

import { QueryCache, QueryClient, QueryClientProvider } from "react-query";

const reactQueryClient = new QueryClient({
  queryCache: new QueryCache(),
});

interface ReactQueryProviderProps {
  children: ReactNode;
}

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  return (
    <QueryClientProvider client={reactQueryClient}>
      {children}
    </QueryClientProvider>
  );
}
