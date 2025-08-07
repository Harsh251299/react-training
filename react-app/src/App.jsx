import ClassComponent from "./Components/ClassComponent/ClassComponent";
import Game from "./Components/Tic Tac Toe/Game";
import Todo from "./Components/TodoList/Todo";
import { TodoProvider } from "./Components/TodoListUseContextandReducers/TodoContext";
import TodoClass from "./Components/TodoListClassComponent/TodoClass";
import TodoListContext from "./Components/TodoListUseContextandReducers/TodoListContext";

function App() {
  return (
    <>
      <TodoProvider>
        <TodoListContext />
      </TodoProvider>
      {/* <Todo /> */}
      {/* <ClassComponent /> */}
      {/* <TodoClass /> */}
      {/* <Game /> */}
    </>
  );
}

export default App;
