import "../../App.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoItem from "./TodoItem";

function Todo() {
  const [todoItem, setTodoItem] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editInput, setEditInput] = useState("");
  const [editingId, setEditingId] = useState(null);

  function handleTodoItemChange(event) {
    setTodoItem(event.target.value);
  }
  function handleEditInput(event) {
    setEditInput(event.target.value);
  }

  function addTodoItem() {
    if (todoItem.trim().length) {
      const newItem = { id: uuidv4(), value: todoItem };
      setTodoList([...todoList, newItem]);
      setTodoItem("");
    }
  }

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

  function saveTodo(id) {
    if (editInput.trim() === "") return;
    const newList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, value: editInput };
      }
      return todo;
    });
    setTodoList(newList);
    setEditingId(null);
  }

  function cancelEdit() {
    setEditInput("");
    setEditingId(null);
  }
  return (
    <>
      <div>
        <input
          value={todoItem}
          onChange={handleTodoItemChange}
          placeholder="Add task to the list"
        />
        <button onClick={addTodoItem}>Add</button>
      </div>
      {todoList.length > 0 && <h2 className="todo-list-title">Todo List</h2>}
      <div id="todo-list">
        <ul>
          {todoList.map((item) => (
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
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default Todo;
