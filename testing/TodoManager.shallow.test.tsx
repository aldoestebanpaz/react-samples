import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoManager from './TodoManager';

jest.mock('./TodoForm', () => {
  return () => (
    <>
      mocked TodoForm
    </>
  );
});

describe('TodoManager (shallow)', () => {
  it('should show a counter', () => {
    // arrange

    // act
    render(<TodoManager/>);

    // assert
    expect(screen.getByText(/Todos: 0/i)).toBeInTheDocument();
  });

  it('should render the TodoForm component', () => {
    // arrange

    // act
    render(<TodoManager/>);

    // assert
    expect(screen.getByText(/mocked TodoForm/i)).toBeInTheDocument();
  });
});
