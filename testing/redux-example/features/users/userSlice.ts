import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import * as userAPI from '../../../api/usersApi';
import { User } from '../../../api/usersApi';

export interface UserState {
  name: string
  status: 'idle' | 'loading' | 'complete'
}

// Name for this slice of state

const sliceOfStateName = 'user';

// Thunks

const fetchUser = createAsyncThunk<
  // Return type of the payload creator
  User | null,
  // First argument to the payload creator
  number
>(
  `${sliceOfStateName}/fetch-user`, // action type prefix
  async (userId: number) => await userAPI.fetchUser(userId) // payload creator
);

// Initial state

const initialState: UserState = {
  name: 'No user',
  status: 'idle'
};

// Slice

const slice = createSlice({
  name: sliceOfStateName,
  initialState,
  reducers: {
    userSetName: function (state, action: PayloadAction<string>) {
      state.name = action.payload;
    }
  },
  extraReducers: builder => {
    // Add reducers for additional action types

    // reducer for action type 'user/fetch-user/pending'
    builder.addCase(fetchUser.pending, (state, action) => {
      state.status = 'loading';
    });

    // reducer for action type 'user/fetch-user/fulfilled'
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = 'complete';
      const user = action.payload;
      state.name = user ? user.name : 'No user';
    });
  }
});

const { userSetName } = slice.actions;

export const userActions = { userSetName, fetchUser };
export const userReducer = slice.reducer;

// Selectors

const selectUser = (state: RootState) => state[sliceOfStateName].name;
const selectUserFetchStatus = (state: RootState) => state[sliceOfStateName].status;

export const userSelectors = {
  selectUser,
  selectUserFetchStatus
};
