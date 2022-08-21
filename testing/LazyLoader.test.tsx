import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import LazyLoader from './LazyLoader';

describe('LazyLoader', () => {
  it('should load content asynchnously', async () => {
    // arrange
    const mockAsyncAction = () => {
      return new Promise(resolve => setTimeout(resolve, 300)) // 300ms
        .then(() => 'Async data loaded');
    };
    const mockOnLoadHandler = jest.fn();

    // act
    render(<LazyLoader action={mockAsyncAction} onLoad={mockOnLoadHandler} />);
    const divEl = screen.queryByText(/Click to load/)!;
    const buttonEl = screen.queryByText(/Load/)!;
    fireEvent.click(buttonEl);

    // assert
    await waitFor(() => expect(divEl.textContent).toBe('Loading ...'));
    await waitFor(() => expect(divEl.textContent).toBe('Loaded'));
    expect(mockOnLoadHandler.mock.calls).toEqual([
      [ 'Async data loaded' ]
    ]);
  });
});
