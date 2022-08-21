import React from 'react';
import Message from './Message';

describe('Message', () => {
  it('should return a React element with span tag and the message inside', () => {
    // arrange & act
    const messageReactElement = Message({ children: 'Not important message', isImportant: false });

    // assert
    // console.log(messageReactElement);
    expect(messageReactElement.type).toBe('p');
    expect(messageReactElement.props.children.type).toBe('span');
    expect(messageReactElement.props.children.props.children).toBe('Not important message');
  });

  it('should return a React element with string tag and the message inside', () => {
    // arrange & act
    const messageReactElement = Message({ children: 'Not important message', isImportant: true });

    // assert
    // console.log(messageReactElement);
    expect(messageReactElement.type).toBe('p');
    expect(messageReactElement.props.children.type).toBe('strong');
    expect(messageReactElement.props.children.props.children).toBe('Not important message');
  });
});
