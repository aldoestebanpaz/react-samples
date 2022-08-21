import React from 'react';
import { useStoreDispatch, useStoreSelector } from '../../storeHooks';
import { userActions, userSelectors } from './userSlice';

function UserDisplay() {
  const storeDispatch = useStoreDispatch();

  // The useSelector hook will call the selector any time an action is dispatched.
  // If the value returned by the selector changes from the last time it ran,
  // useSelector will force our component to re-render with the new data.
  // All we have to do is call useSelector() once in our component, and it does the rest of the work for us.
  const user = useStoreSelector(userSelectors.selectUser);
  const userFetchStatus = useStoreSelector(userSelectors.selectUserFetchStatus);

  return (
    <div>
      <div>{userFetchStatus === 'loading' ? 'Fetching user...' : user}</div>
      <button onClick={() => storeDispatch(userActions.fetchUser(1))}>Fetch user</button>
    </div>
  );
}

export default UserDisplay;
