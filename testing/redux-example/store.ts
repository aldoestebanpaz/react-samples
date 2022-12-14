import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';

// slice reducers
import { userReducer } from './features/users/userSlice';

const rootReducer = combineReducers({

  user: userReducer

});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
