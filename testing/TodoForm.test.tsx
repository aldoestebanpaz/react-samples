import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TodoForm from './TodoForm';

describe('TodoForm', () => {
  it('should trigger the addItem event', () => {
    // arrange
    const mockAddItemHandler = jest.fn();

    // act
    const { container } = render(<TodoForm addItem={mockAddItemHandler}/>);
    const inputEl = container.querySelector<HTMLInputElement>('input[type="text"]')!; // manual query
    fireEvent.change(inputEl, { target: { value: 'Learn react unit testing' } });
    const buttonEl = screen.queryByText(/Add/)!;
    fireEvent.click(buttonEl);
    // or, fireEvent(buttonEl, new MouseEvent('click'));

    // assert
    expect(mockAddItemHandler.mock.calls.length).toBe(1);
    expect(mockAddItemHandler.mock.calls).toEqual([
      [ 'Learn react unit testing' ]
    ]);
  });
});
