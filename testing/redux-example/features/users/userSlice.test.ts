import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { setupStore } from '../../store';
import { userActions, userReducer, UserState } from './userSlice'

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
export const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/users/1', (req, res, ctx) => {
    const mockUser = {
      "id": 1,
      "name": "Aldo",
      "username": "apaz",
      "email": "apaz@noemail.com",
    };
    return res(ctx.json(mockUser), ctx.delay(150))
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe('userSlice (redux reducer)', () => {
  it('should return the initial state', () => {
    expect(userReducer(undefined, { type: undefined })).toEqual(
      {
        name: 'No user',
        status: 'idle'
      }
    );
  });

  it('should return provious state', () => {
    const previousState: UserState = {
      name: '',
      status: 'loading'
    };

    expect(userReducer(previousState, { type: undefined })).toEqual(
      {
        name: '',
        status: 'loading'
      }
    );
  });

  it('should set user name', () => {
    expect(userReducer(undefined, userActions.userSetName('ella'))).toEqual(
      {
        name: 'ella',
        status: 'idle'
      }
    );
  });

  it('should handle a new state', async () => {
    const store = setupStore();
    await store.dispatch(userActions.fetchUser(1));

    expect(store.getState().user).toEqual(
      {
        name: 'Aldo',
        status: 'complete'
      }
    );
  });
});
