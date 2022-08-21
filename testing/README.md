
- [Samples of testing on React](#samples-of-testing-on-react)
  - [Required dependencies](#required-dependencies)
    - [For testing](#for-testing)
    - [Common libraries](#common-libraries)
    - [Redux](#redux)
  - [Snapshot Tests](#snapshot-tests)
  - [Isolated unit tests](#isolated-unit-tests)
    - [Testing a React component without rendering](#testing-a-react-component-without-rendering)
    - [Testing a React component using react-test-renderer](#testing-a-react-component-using-react-test-renderer)
  - [Interaction unit tests](#interaction-unit-tests)
  - [Integration tests](#integration-tests)
    - [Integration tests using Test Utilities (aka. ReactTestUtils)](#integration-tests-using-test-utilities-aka-reacttestutils)
    - [A little introduction to React Testing Library](#a-little-introduction-to-react-testing-library)
      - [Queries](#queries)
    - [Shallow tests](#shallow-tests)
    - [Deep integration tests](#deep-integration-tests)
  - [Testing with Redux](#testing-with-redux)

# Samples of testing on React

## Required dependencies

### For testing

```sh
# TestRenderer
npm install --save-dev react-test-renderer
npm install --save-dev @types/react-test-renderer

# React Testing library
npm install --save-dev @testing-library/react @testing-library/jest-dom

# Mock Service Worker (MSW)
npm install --save-dev msw
```

### Common libraries

```sh
npm install --save axios
npm install --save moment
```

### Redux

```sh
npm install --save @reduxjs/toolkit
npm install --save react-redux

# optional
npm install --save-dev @redux-devtools/core
```

Redux Toolkit (@reduxjs/toolkit) includes the Redux core, as well as other key packages we feel are essential for building Redux applications (such as Redux Thunk and Reselect).

React Redux (react-redux) contains the bindings required for React.

Redux DevTools (@redux-devtools/core) is a collection of devTools for Redux with hot reloading, action replay, and customizable UI. See [https://github.com/reduxjs/redux-devtools](https://github.com/reduxjs/redux-devtools) for details.

## Snapshot Tests

**THIS REPO DOES NOT INCLUDES SNAPSHOT TESTS**

Snapshot testing is an assertion tool provided by Jest for whenever you want to make sure your UI does not change unexpectedly between test executions.

A snapshot is like a picture of an entity at a given point in time. With snapshot testing you can take a picture of a React component and then compare the original against another snapshot later on.

In a Snapshot test, Jest takes a snapshot of the component on the first run, then it checks if the saved snapshot matches the actual component. On subsequent test runs, Jest will compare the rendered output with the previous snapshot.
- If they match, the snapshot test will pass.
- If they don't match, the snapshot test will fail either because Jest found a bug in your code that should be fixed (an unintentional bug),
- or it will fail due to an intentional implementation change and the snapshot needs to be updated.

RULE OF THUMB: does your component changes often? If so, avoid snapshot testing. If you take a snapshot of a component the test passes on the first run but as soon as there is a change the test will fail because there'll be a mismatch between the component and its original "picture". Snapshot tests are good for components that don't change often. Put it another way: write a snapshot test when the component is stable.

## Isolated unit tests

**todosReducer.test.ts**

This is the most simple example. The logic of a reducer is inside a simple JavaScript function, so testing it is the same as testing any JavaScript file.

**todosApi.test.ts**

It shows how to make tests for files that depends on other modules. In this example I mocked axios in order to simulate HTTP requests.
### Testing a React component without rendering

Testing a React component directly means executing it as any JavaScript thing. We can invoke it's 'render' function (or just calling it if it is a function) and execute the assertions against that returned object.

The object returned by the 'render' function of React component is known as a "React element". See [https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html](https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html) for details.

NOTE: DO NOT create unit tests using this approach for real components. A test shouldn't be focused on implementation details of any system under test, even on the internals of a React component.

NOTE: One important thing to note here is the difference between the JSX.Element and React.ReactNode types in TypeScript:
- JSX.Element: Return value of React.createElement
- React.ReactNode: Return value of a component
**For the 'children' prop of a React component we use the type React.ReactNode**. Almost anything can be assigned to React.ReactNode. JSX.Element in the other side is not good enough since a valid React children could be a string, a boolean, null.


**Messsage.test.tsx (many tests)**

These tests shows how rudimentary and imprecise can be this type of test. Again, this is not effective because the component is not being rendered.

### Testing a React component using react-test-renderer

This package provides a React renderer that can be used to render React components to pure JavaScript objects, without depending on the DOM or a native mobile environment. Essentially, this package makes it easy to grab a snapshot of the platform view hierarchy (similar to a DOM tree) rendered by a React DOM or React Native component without using a browser or jsdom.

NOTE: It's worth noting that react-test-renderer does not use the real DOM. When you mount a component with react-test-renderer you’re interacting with a pure JavaScript object, a representation of the React component.

**OptionsFilter.test.tsx (many tests)**

These tests shows how to test a component without rendering the DOM nodes and just using the JavaScript object returned by 'TestRenderer.create'.

## Interaction unit tests

Here I add some interaction tests without rendering the template of a react component. To see interaction tests using rendering then jump to the "integration tests" section.

**Button.test.tsx**

I make this using react-test-renderer.

## Integration tests

In the context of web UI development, integration tests are special types of tests that let us test the component and its template as well.

The best library for this is React Testing Library.

### Integration tests using Test Utilities (aka. ReactTestUtils)

NOTE: ReactTestUtils provides a low‑level way to render React components into the DOM that is so low level that it probably doesn't make sense to use it. It is recommended to replace it with React Testing Library.

NOTE: To be able to run the tests using the 'act' function. The following code is required in the setup file (setupTests.ts in a create-react-app project).

```js
global.IS_REACT_ACT_ENVIRONMENT = true
```

If this code is not included, the following error will appear in the console: 'Warning: The current testing environment is not configured to support act(...)'.

**Counter.test.tsx**

This is an example of using Test Utilities. 'act' is a function that provides a wrapper for component rendering and updating operations. Having rendered the component into the container, we can use the DOM method, 'querySelector', to find the paragraph element. We can then dispatch events on that element. Again, it is wrapped in an 'act' function call because the component might update. Note that container must be part of the document for this to work.

### A little introduction to React Testing Library

React Testing Library aims to support writing tests that avoid including implementation details so that they are maintainable and so that refactoring components does not break tests. The guiding principle of React Testing Library is, "The more your tests resemble the way your software is used, the more confidence they can give you." Thus, React Testing Library encourages rendering components to DOM nodes and making assertions against DOM nodes.

The 'render' function is the heart of React Testing Library. It allows to render a React component into a container which is appended to document.body. Everything into a simulated browser environment, with jsdom.

NOTE: By default, React Testing Library will create a div and append that div to the document.body and this is where your React component will be rendered.

```html
<body>
  <div>
    <!-- by default your component will be renderer inside the div element/container -->
  </div>
</body>
```

#### Queries

The utilities this library provides facilitate querying the DOM in the same way the user would. Finding form elements by their label text (just like a user would), finding links and buttons from their text (like a user would). It also exposes a recommended way to find elements by a data-testid as an "escape hatch" for elements where the text content and label do not make sense or is not practical.

NOTE: GetByTestId can find elements that have a data-testid attribute. Following the philosophy of testing in a way that matches how the user will interact with your application, using GetBTestId is considered a last resort, since s data-testid attribute are not visible to users. It is preferable to find elements using things that are visible to users, like labels (getByLabelText), text (getByText), and title attributes (getByTitle). Even so, querying bydata-testid attribute is still better than querying by CSS classes or by document structure.

### Shallow tests

Here I put the tests that renders a React component without any child component.

NOTE: I wouldn't be using shallow rendering (a false sensation of renderization provided by the 'shallow' function of enzyme). I just created this category to separate renderization of only one React component (shallow) from other tests that renders a component a his childs without mocking (deep).

**Date.test.tsx (multiple tests)**

This is an extremely simple test because it has no child components and doesn't process any event. This test file is a first approximation to React Testing Library.

**TodoForm.test.tsx**

This example shows how to make smock tests, interaction tests, and event triggering using React Testing Library.

**LazyLoader.test.tsx**

This example shows how to test async events using async functions in Jest and the 'waitFor' tool from React Testing Library. 'waitFor' allows us to make assertions about something that will be true in the future. After we trigger the click event, we use the 'waitFor' function and supply a callback, and move our assertion into that callback. So this is saying that we want the test to wait for the assertion to be true. Because 'waitFor' returns a promise, we need to await that value, and that, in turn, means we need to make the test function async aware (this means, we hace to use the 'async' and 'await' keywords).

**TodoManager.shallow.test.tsx**

This example shows that it is possible to mock a child component that is being imported as a JavaScript file module.

### Deep integration tests

**TodoManager.test.tsx (multiple tests)**

This example shows that we can use the React Testing Library for rendering components that are composed of other child components (both in-file and imported from other JavaScript file modules).

## Testing with Redux

**userSlice.test.ts**

This example shows how to test a reducer of Redux both with simple actions and with thunks.

**UserDisplay.test.tsx**

This test shows how to do an integration test using Redux and MWS library for mocking HTTP responses without using custom jest mock objects.
