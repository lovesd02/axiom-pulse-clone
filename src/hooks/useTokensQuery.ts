import { useQuery } from '@tanstack/react-query';
import { fetchTokens } from '@/lib/api';
import type { Token } from '@/lib/types';

export function useTokensQuery() {
  return useQuery<Token[], Error>({
    queryKey: ['tokens'],
    queryFn: fetchTokens,
    staleTime: 30_000,
    retry: 1
  });
}
