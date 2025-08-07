import { useEffect, useRef, useContext } from "react";
import { TodoContext } from "./TodoContext.jsx";

export default function TodoItemContext({
  item,
  editingId,
  editInput,
  handleEditInput,
}) {
  const inputRef = useRef(null);
  const { dispatch } = useContext(TodoContext);

  useEffect(() => {
    if (editingId === item.id) {
      inputRef.current?.focus();
    }
  }, [editingId]);

  const editTodo = () => {
    if (editingId !== null) {
      alert("Save the current item.");
      return;
    }
    dispatch({ type: "EDIT_TODO", payload: item });
  };

  const saveTodo = () => {
    if (editInput.trim() === "") return;
    dispatch({ type: "SAVE_TODO", payload: item.id });
  };

  const cancelEdit = () => {
    dispatch({ type: "CANCEL_EDIT" });
  };

  const deleteTodo = () => {
    dispatch({ type: "DELETE_TODO", payload: item.id });
  };

  const toggleCompleted = () => {
    if (editingId === item.id) {
      alert("Save the current item.");
      return;
    }
    dispatch({ type: "TOGGLE_TODO", payload: item.id });
  };

  return (
    <>
      <li>
        {item.id === editingId ? (
          <>
            <input
              ref={inputRef}
              value={editInput}
              onChange={handleEditInput}
            />
            <div className="todo-actions">
              <button className="save-edit-btn" onClick={saveTodo}>
                Save
              </button>
              <button className="delete-cancel-btn" onClick={cancelEdit}>
                Cancel
              </button>
              <button className="toggle-btn" onClick={toggleCompleted}>
                {item.isCompleted ? "←" : "→"}
              </button>
            </div>
          </>
        ) : (
          <>
            <span>{item.value}</span>
            <div className="todo-actions">
              {!item.isCompleted && (
                <button className="save-edit-btn" onClick={editTodo}>
                  Edit
                </button>
              )}
              <button className="delete-cancel-btn" onClick={deleteTodo}>
                Delete
              </button>
              <button className="toggle-btn" onClick={toggleCompleted}>
                {item.isCompleted ? "←" : "→"}
              </button>
            </div>
          </>
        )}
      </li>
    </>
  );
}
