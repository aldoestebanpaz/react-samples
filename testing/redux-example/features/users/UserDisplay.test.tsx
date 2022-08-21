import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, screen } from '@testing-library/react'
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from '../../store-test-utils'
import UserDisplay from './UserDisplay'
import { setupStore } from '../../store'
import { userActions } from './userSlice'

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
  rest.get('https://jsonplaceholder.typicode.com/users/2', (req, res, ctx) => {
    const mockUser = {
      "id": 1,
      "name": "Saul",
      "username": "saulgoodman",
      "email": "saulgoodman@noemail.com",
    };
    return res(ctx.json(mockUser), ctx.delay(150))
  })
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe('UserDisplay (redux and msw example)', () => {
  it('should fetch an user after clicking the button', async () => {

    // act 1
    renderWithProviders(<UserDisplay />);

    // assert 1 - should show no user initially, and not be fetching a user
    expect(screen.getByText(/no user/i)).toBeInTheDocument();
    expect(screen.queryByText(/Fetching user\.\.\./i)).not.toBeInTheDocument();

    // act 2 - after clicking the 'Fetch user' button, it should now show that it is fetching the user
    fireEvent.click(screen.getByRole('button', { name: /Fetch user/i }));
    expect(screen.queryByText(/Fetching user\.\.\./i)).toBeInTheDocument();

    // assert 2 - after some time, the user should be received
    expect(await screen.findByText(/Aldo/i)).toBeInTheDocument();
    expect(screen.queryByText(/no user/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Fetching user\.\.\./i)).not.toBeInTheDocument();
  });

  it('should render user already preloaded in the store', async () => {
    // OPTION 1 - pass the preloadedState argument
    // act
    renderWithProviders(
      <UserDisplay />,
      {
        preloadedState: {
          user: { name: 'ella', status: 'complete' }
        }
      }
    );
    // assert
    expect(screen.getByText(/ella/i)).toBeInTheDocument();

    // OPTION 2 - create a custom Redux store first and dispatch some actions to build up the desired state
    // // arrange
    // const store = setupStore();
    // store.dispatch(userActions.fetchUser(2));
    // // act
    // renderWithProviders(<UserDisplay />, { store })
    // // assert
    // expect(await screen.findByText(/Saul/i)).toBeInTheDocument();
  })
});
