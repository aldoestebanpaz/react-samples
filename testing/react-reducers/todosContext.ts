import React from 'react';
import { TodosReducerActionType, TodosReducerStateType } from './todosReducer';

interface TodosContextValueType {
  todosReducerState: TodosReducerStateType;
  todosReducerDispatch: React.Dispatch<TodosReducerActionType>;
}

export const TodosContext = React.createContext<TodosContextValueType | null>(null);
