import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactTestUtils from 'react-dom/test-utils';
import Counter from './Counter';

describe('Counter', () => {
  let container: HTMLDivElement | null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container!);
    container = null;
  });

  it('should render and update the counter', () => {
    // act 1: first render and componentDidMount
    ReactTestUtils.act(() => {
      ReactDOM.createRoot(container!).render(<Counter />);
    });

    const button = container!.querySelector('button')!;
    const label = container!.querySelector('p')!;

    // assert 1
    expect(label.textContent).toBe('You clicked 0 times');
    expect(document.title).toBe('You clicked 0 times');

    // act 2: second render and componentDidUpdate
    ReactTestUtils.act(() => {
      button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });

    // assert 2
    expect(label.textContent).toBe('You clicked 1 times');
    expect(document.title).toBe('You clicked 1 times');
  });
});
