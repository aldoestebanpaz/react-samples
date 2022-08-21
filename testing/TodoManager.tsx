import React, { useEffect, useState } from 'react';
import { TodosContext } from './react-reducers/todosContext';
import { todosReducer, todosReducerinitialState } from './react-reducers/todosReducer';
import TodoForm from './TodoForm';

interface TodoManagerProps {
}

// parent component with a context that shares the todosReducer with any descendant component (child, child of the child, etc)
function TodoManager(props: TodoManagerProps) {
  const [ todosReducerState, todosReducerDispatch ] = React.useReducer(todosReducer, todosReducerinitialState);

  const providerState = { todosReducerState, todosReducerDispatch };

  const addItemHandler = (todoText: string) => { todosReducerDispatch({ type: 'ADD_ITEM', item: todoText }); };

  return (
    <>
      <TodosContext.Provider value={providerState} >
        <div>Todos: {todosReducerState.todos.length}</div>
        <TodoForm addItem={addItemHandler} />
        <TodoList/>
      </TodosContext.Provider>
    </>
  );
}

// internal child component that uses the context
function TodoList() {
  const { todosReducerState, todosReducerDispatch } = React.useContext(TodosContext)!;

  return (
    <ul>
      {
        todosReducerState.todos.map((x, index) =>
          <li key={index}><TodoItem item={x}/></li>
        )
      }
    </ul>
  );
}

// internal child component that uses the context
function TodoItem(props: { item: string }) {
  const { todosReducerState, todosReducerDispatch } = React.useContext(TodosContext)!;
  const [repeatedItemsCount, setRepeatedItemsCount] = useState(0);


  useEffect(() => {
    setRepeatedItemsCount(
      todosReducerState.todos.reduce((prev, curr) => curr === props.item ? prev + 1 : prev, 0)
    );
  });

  const onClickHandler = (item: string) => todosReducerDispatch({type: 'DELETE_ITEM', item});

  return (
    <>
      {props.item} <span>(repeated: {repeatedItemsCount})</span> <button onClick={() => onClickHandler(props.item)}>DELETE</button>
    </>
  );
}

export default TodoManager;
