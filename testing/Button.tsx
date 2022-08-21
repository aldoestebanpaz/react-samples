import React from 'react';

interface ButtonProps {
  text: string,
  code: string,
  onClick: (code: string) => void
}

function Button({ text, code, onClick }: ButtonProps) {
  return (
    <button onClick={() => onClick(code)}>{text}</button>
  );
}

export default Button;
