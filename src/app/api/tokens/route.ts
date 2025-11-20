import { NextResponse } from 'next/server';
import type { Token } from '@/lib/types';

export const dynamic = 'force-dynamic';

/**
 * Deterministic pseudo-random helpers based on index
 * (so the dataset is stable between requests).
 */
function pseudoRand(i: number, mod: number, offset = 0): number {
  return ((i * 17 + 13) % mod) + offset;
}

const NAME_TEMPLATES = [
  { name: 'WYNNMODE', symbol: 'WYNN' },
  { name: 'BITCOIN', symbol: 'BTC' },
  { name: 'BITPUZZLE', symbol: 'BPUZ' },
  { name: 'CLOUDTARD', symbol: 'CTD' },
  { name: 'BNHP TOKEN', symbol: 'BNHP' },
  { name: 'TESLA DAO', symbol: 'TESA' },
  { name: 'WEALTH CYCLE', symbol: 'WLC' },
  { name: 'KXK PROTOCOL', symbol: 'KXK' },
  { name: 'PEPE MAX', symbol: 'PMAX' },
  { name: 'WOLF INU', symbol: 'WOLF' }
];

const GROUPS: Token['group'][] = ['new', 'final', 'migrated'];

function generateTokens(count: number = 100): Token[] {
  const tokens: Token[] = [];

  for (let i = 0; i < count; i += 1) {
    const tmpl = NAME_TEMPLATES[i % NAME_TEMPLATES.length];
    const group = GROUPS[i % GROUPS.length];

    // Deterministic-but-varied stats
    const baseCap = 5_000 + pseudoRand(i, 800_000, 10_000);      // 15k – ~815k
    const baseVol = 500 + pseudoRand(i, 250_000, 2_000);         // 2.5k – ~252k
    const baseTx = 20 + pseudoRand(i, 8_000, 10);                // 30 – ~8k
    const basePrice =
      (pseudoRand(i, 9000, 100) / 100_000) *
      (group === 'new' ? 1 : group === 'final' ? 5 : 12);        // wide spread

    const changePct = pseudoRand(i, 40, -20); // -20% .. +19%

    tokens.push({
      id: `0x${(i + 1).toString(16).padStart(4, '0')}`,
      name: `${tmpl.name} ${i + 1}`,
      symbol: `${tmpl.symbol}${(i % 9) + 1}`,
      price: Number(basePrice.toFixed(6)),
      priceChangePct24h: changePct,
      marketCap: baseCap,
      volume24h: baseVol,
      txCount: baseTx,
      group
    });
  }

  return tokens;
}

export async function GET() {
  const tokens = generateTokens(100);
  return NextResponse.json(tokens, {
    headers: {
      'Cache-Control': 'no-store'
    }
  });
}
