import { useEffect, useRef } from "react";

export default function TodoItemRTKThunk(props) {
  const inputRef = useRef(null);
  useEffect(() => {
    if (props.editingId === props.item.id) {
      inputRef.current?.focus();
    }
  }, [props.editingId]);

  return (
    <>
      <li>
        {props.item.id === props.editingId ? (
          <>
            <input
              ref={inputRef}
              value={props.editInput}
              onChange={props.handleEditInput}
            />
            <div className="todo-actions">
              <button
                className="save-edit-btn"
                onClick={() => props.saveTodo(props.item.id)}
              >
                Save
              </button>
              <button className="delete-cancel-btn" onClick={props.cancelEdit}>
                Cancel
              </button>
              <button
                className="toggle-btn"
                onClick={() => props.toggleCompleted(props.item.id)}
              >
                {props.item.isCompleted ? "←" : "→"}
              </button>
            </div>
          </>
        ) : (
          <>
            <span>{props.item.value}</span>
            <div className="todo-actions">
              { !props.item.isCompleted && <button
                className="save-edit-btn"
                onClick={() => props.editTodo(props.item)}
              >
                Edit
              </button>}
              <button
                className="delete-cancel-btn"
                onClick={() => props.deleteTodo(props.item.id)}
              >
                Delete
              </button>
              <button
                className="toggle-btn"
                onClick={() => props.toggleCompleted(props.item.id)}
              >
                {props.item.isCompleted ? "←" : "→"}
              </button>
            </div>
          </>
        )}
      </li>
    </>
  );
}
