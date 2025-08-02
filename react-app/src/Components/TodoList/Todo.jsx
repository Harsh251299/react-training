import "../../App.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Todo() {
  const [todoItem, setTodoItem] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editInput, setEditInput] = useState("");

  function handleTodoItemChange(event) {
    setTodoItem(event.target.value);
  }
  function handleEditInput(event) {
    setEditInput(event.target.value);
  }

  function addTodoItem() {
    if (todoItem.length) {
      const newItem = { id: uuidv4(), value: todoItem, isEditing: false };
      setTodoList([...todoList, newItem]);
      setTodoItem("");
    }
  }

  function editTodo(item) {
    const newList = todoList.map((todo) => {
      if (todo.id == item.id) {
        setEditInput(item.value);
        return { ...todo, isEditing: true };
      }
      return todo;
    });
    setTodoList(newList);
  }

  function deleteTodo(id) {
    const newList = todoList.filter((item) => item.id != id);
    setTodoList(newList);
  }

  function saveTodo(id, newValue) {
    if (newValue.trim() === "") return;
    const newList = todoList.map((todo) => {
      if (todo.id == id) {
        return { ...todo, value: newValue, isEditing: false };
      }
      return todo;
    });
    setTodoList(newList);
  }

  function cancelEdit(id) {
    const newList = todoList.map((todo) => {
      if (todo.id == id) {
        return { ...todo, isEditing: false };
      }
      return todo;
    });
    setTodoList(newList);
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
            <li key={item.id}>
              {item.isEditing ? (
                <>
                  <input value={editInput} onChange={handleEditInput} />
                  <div className="todo-actions">
                    <button onClick={() => saveTodo(item.id, editInput)}>
                      Save
                    </button>
                    <button onClick={() => cancelEdit(item.id)}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <span>{item.value}</span>
                  <div className="todo-actions">
                    <button onClick={() => editTodo(item)}>Edit</button>
                    <button onClick={() => deleteTodo(item.id)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Todo;
