import { Component, createRef } from "react";
class TodoItemClass extends Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.editingId === this.props.item.id &&
      prevProps.editingId !== this.props.editingId
    ) {
      this.inputRef.current?.focus();
    }
  }
  render() {
    return (
      <>
        <li>
          {this.props.item.id === this.props.editingId ? (
            <>
              <input
                ref={this.inputRef}
                value={this.props.editInput}
                onChange={this.props.handleEditInput}
              />
              <div className="todo-actions">
                <button
                  className="save-edit-btn"
                  onClick={() => this.props.saveTodo(this.props.item.id)}
                >
                  Save
                </button>
                <button
                  className="delete-cancel-btn"
                  onClick={this.props.cancelEdit}
                >
                  Cancel
                </button>
                <button
                  className="toggle-btn"
                  onClick={() => this.props.toggleCompleted(this.props.item.id)}
                >
                  {this.props.item.isCompleted ? "←" : "→"}
                </button>
              </div>
            </>
          ) : (
            <>
              <span>{this.props.item.value}</span>
              <div className="todo-actions">
                {!this.props.item.isCompleted && (
                  <button
                    className="save-edit-btn"
                    onClick={() => this.props.editTodo(this.props.item)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="delete-cancel-btn"
                  onClick={() => this.props.deleteTodo(this.props.item.id)}
                >
                  Delete
                </button>
                <button
                  className="toggle-btn"
                  onClick={() => this.props.toggleCompleted(this.props.item.id)}
                >
                  {this.props.item.isCompleted ? "←" : "→"}
                </button>
              </div>
            </>
          )}
        </li>
      </>
    );
  }
}

export default TodoItemClass;
