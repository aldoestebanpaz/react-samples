import React from 'react';

function Message(props: {isImportant: boolean, children: React.ReactNode}) {
  return (
    <p>
      {
        props.isImportant ?
          <strong>{props.children}</strong> :
          <span>{props.children}</span>
      }
    </p>
  );
}

export default Message;
