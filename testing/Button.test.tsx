import React from 'react';
import TestRenderer from 'react-test-renderer';
import Button from './Button';

describe('Button', () => {
  it('should trigger the onClick event', () => {
    // arrange
    const mockOnClickHandler = jest.fn();
    const testRenderer = TestRenderer.create(
      <Button text="Hello World" code="ella" onClick={mockOnClickHandler} />
    );
    const testInstance = testRenderer.root;

    // act 1
    const button = testInstance.findByType('button');
    TestRenderer.act(() => {
      button.props.onClick();
    });

    // assert 1
    expect(mockOnClickHandler.mock.calls.length).toBe(1);
    expect(mockOnClickHandler.mock.calls).toEqual([
      [ 'ella' ]
    ]);

    // act 2
    TestRenderer.act(() => {
      button.props.onClick();
    });

    // assert 2
    expect(mockOnClickHandler.mock.calls.length).toBe(2);
    expect(mockOnClickHandler.mock.calls).toEqual([
      [ 'ella' ],
      [ 'ella' ]
    ]);
  });
});
