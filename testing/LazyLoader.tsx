import React, { useEffect, useState } from 'react';

interface LazyLoaderProps {
  action: () => Promise<string>,
  onLoad: (data: string) => void
}

function LazyLoader(props: LazyLoaderProps) {
  const [text, setText] = useState('Click to load');
  const onCLick = async () => {
    setText('Loading ...');
    const data = await props.action();
    setText('Loaded');
    props.onLoad(data);
  };
  return (
    <div>
      <div>{text}</div>
      <button onClick={onCLick}>
        Load
      </button>
    </div>
  );
}

export default LazyLoader;
