export type ColumnGroupKey = 'new' | 'final' | 'migrated';

export type Token = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChangePct24h: number;
  marketCap: number;
  volume24h: number;
  txCount: number;
  group: ColumnGroupKey;
};
