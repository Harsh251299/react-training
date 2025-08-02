
export default function TodoItem(props) {
  return (
    <>
      <li>
        {props.item.id === props.editingId ? (
          <>
            <input value={props.editInput} onChange={props.handleEditInput} />
            <div className="todo-actions">
              <button onClick={() => props.saveTodo(props.item.id)}>Save</button>
              <button onClick={props.cancelEdit}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <span>{props.item.value}</span>
            <div className="todo-actions">
              <button onClick={() => props.editTodo(props.item)}>Edit</button>
              <button onClick={() => props.deleteTodo(props.item.id)}>Delete</button>
            </div>
          </>
        )}
      </li>
    </>
  );
}
