import type { Token } from './types';

export async function fetchTokens(): Promise<Token[]> {
  const res = await fetch('/api/tokens', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch tokens');
  }
  return res.json();
}
