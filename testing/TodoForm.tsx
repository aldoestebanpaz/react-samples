import React, { RefObject, useRef } from 'react';

interface TodoFormProps {
  addItem: (todo: string) => void
}

function TodoForm(props: TodoFormProps) {
  const formElRef = useRef<HTMLFormElement>(null);
  const inputElRef = useRef<HTMLInputElement>(null);
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let inputEl = inputElRef.current!;

    if (inputEl.value) {
      props.addItem(inputEl.value);
      formElRef.current!.reset();
    }
  }
  return (
    <form ref={formElRef} onSubmit={onSubmitHandler}>
      <input type="text" ref={inputElRef} placeholder="add a new todo..."/>
      <button type="submit">Add</button>
    </form>
  );
}

export default TodoForm;
