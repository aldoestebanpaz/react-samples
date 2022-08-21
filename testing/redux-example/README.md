# Tests using Redux

## Core concepts

The following are some core concepts to understand Redux code.

**selector**

A "selector" is a function that takes the entire Redux store state as its argument, reads some value from the state, and returns that result.

**store**

The whole global state of your app is stored in an object tree inside a single store.

**feature**

An application might be made up of many different features, and each of those features might have its own reducer function.

**slice**

A "slice" is the Redux logic for a given feature. It is tipically a single file with the collection of Redux reducer logic and actions. The name comes from splitting up the root Redux state object into multiple "slices" of state.

**action**

The only way to change the state tree is to create an action, an object describing what happened, and dispatch it to the store.

**thunk**

The word "thunk" is a programming term that means "a piece of code that does some delayed work".

For Redux specifically, "thunks" are a pattern of writing functions with logic inside that can interact with a Redux store's dispatch and getState methods.

The most common use cases are:

- Moving complex logic out of components
- Making async requests or other async logic
- Writing logic that needs to dispatch multiple actions in a row or over time
- Writing logic that needs access to 'getState' to make decisions or include other state values in an action

Thunks are best used for complex synchronous logic, and simple to moderate async logic such as making a standard AJAX request and dispatching actions based on the request results.

**reducer**

A "reducer" is a function to define how the state can be updated.
