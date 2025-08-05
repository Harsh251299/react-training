import "./Todo.css";
import { useState, useMemo, useCallback, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoItem from "./TodoItem";
import { TodoContext } from "./TodoContext.jsx";

function Todo() {
  const [todoItem, setTodoItem] = useState("");
  const {
    state: { todoList, editInput, editingId },
    dispatch,
  } = useContext(TodoContext);

  const pendingTodos = useMemo(
    () => todoList.filter((todo) => !todo.isCompleted),
    [todoList]
  );

  const CompletedTodos = useMemo(
    () => todoList.filter((todo) => todo.isCompleted),
    [todoList]
  );

  function handleEditInput(e) {
    dispatch({ type: "SET_EDIT_INPUT", payload: e.target.value });
  }

  function addTodoItem() {
    if (todoItem.trim().length) {
      dispatch({ type: "ADD_TODO", payload: todoItem });
      setTodoItem("");
    }
  }

  return (
    <>
      <div className="input-container">
        <input
          value={todoItem}
          onChange={(e) => setTodoItem(e.target.value)}
          placeholder="Add task to the list"
        />
        <button onClick={addTodoItem}>Add</button>
      </div>
      <div id="todo-list-container">
        {pendingTodos.length > 0 && (
          <div className="todo-container">
            <h2 className="todo-list-title">Pending Todos</h2>
            <ul>
              {pendingTodos.map((item) => (
                <TodoItem
                  key={item.id}
                  item={item}
                  editingId={editingId}
                  editInput={editInput}
                  handleEditInput={handleEditInput}
                />
              ))}
            </ul>
          </div>
        )}

        {CompletedTodos.length > 0 && (
          <div className="todo-container">
            <h2 className="todo-list-title">Completed Todos</h2>
            <ul>
              {CompletedTodos.map((item) => (
                <TodoItem
                  key={item.id}
                  item={item}
                  editingId={editingId}
                  editInput={editInput}
                  handleEditInput={handleEditInput}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Todo;
