import { createContext, useContext, useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const TodoContext = createContext();

const initialState = {
  todoList: [],
  editInput: "",
  editingId: null,
};

function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO": {
      const newItem = {
        id: uuidv4(),
        value: action.payload,
        isCompleted: false,
      };
      return { ...state, todoList: [...state.todoList, newItem] };
    }
    case "DELETE_TODO": {
      return {
        ...state,
        todoList: state.todoList.filter((todo) => todo.id !== action.payload),
      };
    }
    case "EDIT_TODO": {
      return {
        ...state,
        editInput: action.payload.value,
        editingId: action.payload.id,
      };
    }
    case "CANCEL_EDIT": {
      return {
        ...state,
        editingId: null,
        editInput: "",
      };
    }
    case "SAVE_TODO": {
      const newList = state.todoList.map((todo) =>
        todo.id === action.payload ? { ...todo, value: state.editInput } : todo
      );
      return { ...state, todoList: newList, editingId: null, editInput: "" };
    }
    case "TOGGLE_TODO": {
      const newList = state.todoList.map((todo) =>
        todo.id === action.payload
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );
      return { ...state, todoList: newList };
    }
    case "SET_EDIT_INPUT": {
      return { ...state, editInput: action.payload };
    }
    default:
      return state;
  }
}

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [todoItem, setTodoItem] = useState("");

  return (
    <TodoContext.Provider value={{ state, dispatch, todoItem, setTodoItem }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  return useContext(TodoContext);
}
