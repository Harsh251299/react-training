import { Component } from "react";
import TodoItemClass from "./TodoItemClass";
import { v4 as uuidv4 } from "uuid";
import "../../App.css";

class TodoClass extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    todoItem: "",
    todoList: [],
    editInput: "",
    editingId: null,
  };

  handleTodoItemChange = (event) => {
    this.setState({ todoItem: event.target.value });
  };
  handleEditInput = (event) => {
    this.setState({ editInput: event.target.value });
  };

  addTodoItem = () => {
    if (this.state.todoItem.trim().length) {
      const newItem = { id: uuidv4(), value: this.state.todoItem, isCompleted: false };
      this.setState({
        todoList: [...this.state.todoList, newItem],
        todoItem: "",
      });
    }
  };

  editTodo = (item) => {
    if (this.state.editingId != null) {
      alert("Save the current item.");
      return;
    }
    this.setState({ editInput: item.value, editingId: item.id });
  };

  deleteTodo = (id) => {
    const newList = this.state.todoList.filter((item) => item.id != id);
    this.setState({ todoList: newList });
  };

  saveTodo = (id) => {
    if (this.state.editInput.trim() === "") return;
    const newList = this.state.todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, value: this.state.editInput };
      }
      return todo;
    });
    this.setState({ todoList: newList, editingId: null });
  };

  cancelEdit = () => {
    this.setState({ editInput: "", editingId: null });
  };

  toggleCompleted = (id) => {
    if (this.state.editingId === id) {
      alert("Save the current item.");
      return;
    }
    const newList = this.state.todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    this.setState({ todoList: newList });
  };

  render() {
    const pendingTodos = this.state.todoList.filter(
      (todo) => !todo.isCompleted
    );

    const CompletedTodos = this.state.todoList.filter(
      (todo) => todo.isCompleted
    );
    return (
      <>
        <div className="input-container">
          <input
            value={this.state.todoItem}
            onChange={this.handleTodoItemChange}
            placeholder="Add task to the list"
          />
          <button onClick={this.addTodoItem}>Add</button>
        </div>
        <div id="todo-list-container">
          {pendingTodos.length > 0 && (
            <div className="todo-container">
              <h2 className="todo-list-title">Pending Todos</h2>
              <ul>
                {pendingTodos.map((item) => (
                  <TodoItemClass
                    key={item.id}
                    item={item}
                    editingId={this.state.editingId}
                    editInput={this.state.editInput}
                    handleEditInput={this.handleEditInput}
                    saveTodo={this.saveTodo}
                    cancelEdit={this.cancelEdit}
                    editTodo={this.editTodo}
                    deleteTodo={this.deleteTodo}
                    toggleCompleted={this.toggleCompleted}
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
                  <TodoItemClass
                    key={item.id}
                    item={item}
                    editingId={this.state.editingId}
                    editInput={this.state.editInput}
                    handleEditInput={this.handleEditInput}
                    saveTodo={this.saveTodo}
                    cancelEdit={this.cancelEdit}
                    editTodo={this.editTodo}
                    deleteTodo={this.deleteTodo}
                    toggleCompleted={this.toggleCompleted}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default TodoClass;
