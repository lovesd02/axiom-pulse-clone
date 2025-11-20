import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SortKey = 'marketCap' | 'price' | 'volume24h';
export type GroupFilter = 'all' | 'new' | 'final' | 'migrated';

type UIState = {
  sortKey: SortKey;
  sortDir: 'asc' | 'desc';
  groupFilter: GroupFilter;
  limit: number; // how many tokens to show after sort/filter
};

const initialState: UIState = {
  sortKey: 'marketCap',
  sortDir: 'desc',
  groupFilter: 'all',
  limit: 100
};

const tokensSlice = createSlice({
  name: 'tokensUI',
  initialState,
  reducers: {
    setSort(
      state,
      action: PayloadAction<{ key: SortKey; dir: 'asc' | 'desc' }>
    ) {
      state.sortKey = action.payload.key;
      state.sortDir = action.payload.dir;
    },
    setGroupFilter(state, action: PayloadAction<GroupFilter>) {
      state.groupFilter = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    }
  }
});

export const { setSort, setGroupFilter, setLimit } = tokensSlice.actions;
export default tokensSlice.reducer;
