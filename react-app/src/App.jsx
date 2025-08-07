import ClassComponent from "./Components/ClassComponent/ClassComponent";
import Game from "./Components/Tic Tac Toe/Game";
import Todo from "./Components/TodoList/Todo";
import { TodoProvider } from "./Components/TodoListUseContextandReducers/TodoContext";
import TodoClass from "./Components/TodoListClassComponent/TodoClass";
import TodoListContext from "./Components/TodoListUseContextandReducers/TodoListContext";
import TodoRedux from "./Components/TodoRedux/TodoRedux";
import store from "./Components/TodoRedux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <Provider store={store}>
        <TodoRedux />
      </Provider>

      {/* <TodoProvider>
        <TodoListContext />
      </TodoProvider> */}
      {/* <Todo /> */}
      {/* <ClassComponent /> */}
      {/* <TodoClass /> */}
      {/* <Game /> */}
    </>
  );
}

export default App;
