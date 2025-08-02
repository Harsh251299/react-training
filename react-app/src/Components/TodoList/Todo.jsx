import "../../App.css";
import { useState, useMemo, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoItem from "./TodoItem";

function Todo() {
  const [todoItem, setTodoItem] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editInput, setEditInput] = useState("");
  const [editingId, setEditingId] = useState(null);

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

  const addTodoItem = useCallback(() => {
    if (todoItem.trim().length) {
      const newItem = { id: uuidv4(), value: todoItem, isCompleted: false };
      setTodoList([...todoList, newItem]);
      setTodoItem("");
    }
  }, [todoItem]);

  function editTodo(item) {
    if (editingId != null) {
      alert("Save the current item.");
      return;
    }
    setEditInput(item.value);
    setEditingId(item.id);
  }

  function deleteTodo(id) {
    const newList = todoList.filter((item) => item.id != id);
    setTodoList(newList);
  }

  const saveTodo = useCallback(
    (id) => {
      if (editInput.trim() === "") return;
      const newList = todoList.map((todo) => {
        if (todo.id === id) {
          return { ...todo, value: editInput };
        }
        return todo;
      });
      setTodoList(newList);
      setEditingId(null);
    },
    [editInput]
  );

  function cancelEdit() {
    setEditInput("");
    setEditingId(null);
  }

  function toggleCompleted(id) {
    if (editingId === id) {
      alert("Save the current item.");
      return;
    }
    const newList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodoList(newList);
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
                <TodoItem
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
                <TodoItem
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

export default Todo;
