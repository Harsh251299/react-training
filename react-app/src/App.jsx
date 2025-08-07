import ClassComponent from "./Components/ClassComponent/ClassComponent";
import Game from "./Components/Tic Tac Toe/Game";
import Todo from "./Components/TodoList/Todo";
import { TodoProvider } from "./Components/TodoListUseContextandReducers/TodoContext";
import TodoClass from "./Components/TodoListClassComponent/TodoClass";
import TodoListContext from "./Components/TodoListUseContextandReducers/TodoListContext";

function App() {
  return (
    <>
      {/* <Todo /> */}
      <TodoProvider>
        <TodoListContext />
      </TodoProvider>
      {/* <ClassComponent /> */}
      {/* <TodoClass /> */}
      {/* <Game /> */}
    </>
  );
}

export default App;
