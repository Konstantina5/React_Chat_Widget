import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rtkQueryApi } from './api/rtkQueryApi';
import chatReducer from './slices/chatSlice';
import { RootState, AppDispatch } from '../types/state/store.types';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    [rtkQueryApi.reducerPath]: rtkQueryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkQueryApi.middleware),
});

// Required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

// Export types
export type { RootState, AppDispatch };
