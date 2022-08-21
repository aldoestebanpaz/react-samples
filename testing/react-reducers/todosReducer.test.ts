import { todosReducer, TodosReducerActionType, todosReducerinitialState, TodosReducerStateType } from "./todosReducer";

describe("todosReducer", () => {
  it("should add a new item", async () => {
    // arrange
    const action: TodosReducerActionType = { type: 'ADD_ITEM', item: 'watch Better Call Saul!' };

    // act
    const newState = todosReducer(todosReducerinitialState, action);

    // assert
    expect(newState.todos.length).toBe(1);
    expect(newState.todos[0]).toBe(action.item);
  });

  it("should remove a item", async () => {
    // arrange
    const action1: TodosReducerActionType = { type: 'ADD_ITEM', item: 'watch Better Call Saul!' };
    const action2: TodosReducerActionType = { type: 'DELETE_ITEM', item: 'watch Better Call Saul!' };

    // act 1
    let newState = todosReducer(todosReducerinitialState, action1);
    // assert 1
    expect(newState.todos.length).toBe(1);
    expect(newState.todos[0]).toBe(action1.item);

    // act 2
    newState = todosReducer(todosReducerinitialState, action2);
    // assert 2
    expect(newState.todos.length).toBe(0);
  });

  it("should throw an error for a unknown action", () => {
    // arrange
    const state: TodosReducerStateType = { todos: [] };
    const action: TodosReducerActionType = { type: 'ELLA', item: '' };

    // act
    try {
      todosReducer(state, action);
    }
    catch (e) {
      // assert
      expect(e).toBeInstanceOf(Error);
      expect((<Error>e).message).toBe('WTF!');
    }
  });
});
