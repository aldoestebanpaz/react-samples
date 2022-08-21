export interface TodosReducerStateType {
  todos: string[]
}

export interface TodosReducerActionType {
  type: string,
  item: string
}

export const todosReducerinitialState: TodosReducerStateType = { todos: [] };

export function todosReducer(state: TodosReducerStateType, action: TodosReducerActionType): TodosReducerStateType {
  switch (action.type) {
    case 'ADD_ITEM':
      return { todos: [ ...state.todos, action.item ] };
    case 'DELETE_ITEM':
      return { todos: state.todos.filter(x => x !== action.item) };
    default:
      throw new Error('WTF!');
  }
}
