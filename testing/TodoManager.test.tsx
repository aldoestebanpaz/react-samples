import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TodoManager from './TodoManager';


describe('TodoManager', () => {
  it('should render with an empty list', () => {
    // arrange

    // act
    const { container } = render(<TodoManager/>);
    const ulEl = container.querySelector<HTMLInputElement>('ul')!; // manual query

    // assert
    expect(screen.getByText(/Todos: 0/i)).toBeInTheDocument();
    expect(ulEl.childNodes.length).toBe(0);
  });

  it('should add a item to the list', () => {
    // arrange

    // act
    const { container } = render(<TodoManager/>);

    const inputEl = container.querySelector<HTMLInputElement>('input[type="text"]')!; // manual query
    fireEvent.change(inputEl, { target: { value: 'Learn react unit testing' } });
    const buttonEl = screen.queryByText(/Add/)!;
    fireEvent.click(buttonEl);

    // assert
    expect(screen.getByText(/Todos: 1/i)).toBeInTheDocument();

    const ulEl = container.querySelector<HTMLInputElement>('ul')!; // manual query
    expect(ulEl.childNodes.length).toBe(1);
  });

  it('should add multiple items and count duplicates', () => {
    // arrange

    // act
    const { container } = render(<TodoManager/>);

    const inputEl = container.querySelector<HTMLInputElement>('input[type="text"]')!; // manual query
    const buttonEl = screen.queryByText(/Add/)!;

    fireEvent.change(inputEl, { target: { value: 'Learn react unit testing' } });
    fireEvent.click(buttonEl);

    fireEvent.change(inputEl, { target: { value: 'Watch Breaking Bad' } });
    fireEvent.click(buttonEl);

    fireEvent.change(inputEl, { target: { value: 'Learn react unit testing' } });
    fireEvent.click(buttonEl);

    fireEvent.change(inputEl, { target: { value: 'Watch LoTR' } });
    fireEvent.click(buttonEl);


    // assert
    expect(screen.getByText(/Todos: 4/i)).toBeInTheDocument();

    const ulEl = container.querySelector<HTMLInputElement>('ul')!; // manual query
    expect(ulEl.childNodes.length).toBe(4);

    const repeatedElements = screen.queryAllByText(/Learn react unit testing/);
    expect(repeatedElements.length).toBe(2);
    expect(screen.queryAllByText(/Learn react unit testing/)[0]).toHaveTextContent(/.*Learn react unit testing.*repeated: 2.*/);
    expect(screen.queryAllByText(/Learn react unit testing/)[1]).toHaveTextContent(/.*Learn react unit testing.*repeated: 2.*/);
    expect(screen.queryByText(/Watch Breaking Bad/)).toHaveTextContent(/.*Watch Breaking Bad.*repeated: 1.*/);
    expect(screen.queryByText(/Watch LoTR/)).toHaveTextContent(/.*Watch LoTR.*repeated: 1.*/);
  });
});
