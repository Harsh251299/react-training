import "./TodoRedux.css";
import { useState, useMemo, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoItemRedux from "./TodoItemRedux";
import { useSelector, useDispatch } from "react-redux";

function TodoRedux() {
  const [todoItem, setTodoItem] = useState("");
  const [editInput, setEditInput] = useState("");
  const [editingId, setEditingId] = useState(null);

  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todoList);

  const pendingTodos = useMemo(
    () => todoList.filter((todo) => !todo.isCompleted),
    [todoList]
  );

  const CompletedTodos = useMemo(
    () => todoList.filter((todo) => todo.isCompleted),
    [todoList]
  );

  function handleTodoItemChange(event) {
    setTodoItem(event.target.value);
  }
  function handleEditInput(event) {
    setEditInput(event.target.value);
  }

  const addTodoItem = () => {
    if (todoItem.trim().length) {
      console.log("1:- Inside addTodoItem function from TodoRedux.jsx");
      dispatch({ type: "ADD_TODO", id: uuidv4(), value: todoItem });
      setTodoItem("");
    }
  };

  function editTodo(item) {
    if (editingId != null) {
      alert("Save the current item.");
      return;
    }
    setEditInput(item.value);
    setEditingId(item.id);
  }

  function deleteTodo(id) {
    console.log("1:- Inside deleteTodo function from TodoRedux.jsx");
    dispatch({ type: "DELETE_TODO", id });
  }

  const saveTodo = (id) => {
    if (editInput.trim() === "") return;
    console.log("1:- Inside saveTodo function from TodoRedux.jsx");
    dispatch({ type: "EDIT_TODO", id, value: editInput });
    setEditInput("");
    setEditingId(null);
  };

  function cancelEdit() {
    setEditInput("");
    setEditingId(null);
  }

  function toggleCompleted(id) {
    if (editingId === id) {
      alert("Save the current item.");
      return;
    }
    console.log("1:- Inside toggleCompleted function from TodoRedux.jsx");
    dispatch({ type: "TOGGLE_TODO", id });
  }
  return (
    <>
      <div className="input-container">
        <input
          value={todoItem}
          onChange={handleTodoItemChange}
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
                <TodoItemRedux
                  key={item.id}
                  item={item}
                  editingId={editingId}
                  editInput={editInput}
                  handleEditInput={handleEditInput}
                  saveTodo={saveTodo}
                  cancelEdit={cancelEdit}
                  editTodo={editTodo}
                  deleteTodo={deleteTodo}
                  toggleCompleted={toggleCompleted}
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
                <TodoItemRedux
                  key={item.id}
                  item={item}
                  editingId={editingId}
                  editInput={editInput}
                  handleEditInput={handleEditInput}
                  saveTodo={saveTodo}
                  cancelEdit={cancelEdit}
                  editTodo={editTodo}
                  deleteTodo={deleteTodo}
                  toggleCompleted={toggleCompleted}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default TodoRedux;
