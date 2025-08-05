import ClassComponent from "./Components/ClassComponent/ClassComponent";
import Game from "./Components/Tic Tac Toe/Game";
import Todo from "./Components/TodoList/Todo";
import { TodoProvider } from "./Components/TodoList/TodoContext";
import TodoClass from "./Components/TodoListClassComponent/TodoClass";

function App() {
  return (
    <>
      <TodoProvider>
        <Todo />
      </TodoProvider>
      {/* <ClassComponent /> */}
      {/* <TodoClass /> */}
      {/* <Game /> */}
    </>
  );
}

export default App;
