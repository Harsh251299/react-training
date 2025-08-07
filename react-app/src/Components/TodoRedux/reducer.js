const initialState = {
    todoList: []
}

export function todoReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_TODO":
            console.log("5:- In the ADD_TODO of the todoReducer")
            return {
                ...state,
                todoList: [...state.todoList, { id: action.id, value: action.value, isCompleted: false }]
            };
        case "DELETE_TODO":
            console.log("5:- In the DELETE_TODO of the todoReducer")
            return {
                ...state,
                todoList: state.todoList.filter(todo => todo.id !== action.id)
            };
        case "EDIT_TODO":
            console.log("5:- In the EDIT_TODO of the todoReducer")
            return {
                ...state,
                todoList: state.todoList.map(todo => todo.id === action.id ? { ...todo, value: action.value } : todo)
            };
        case "TOGGLE_TODO":
            console.log("5:- In the TOGGLE_TODO of the todoReducer")
            return {
                ...state,
                todoList: state.todoList.map(todo => todo.id === action.id ? { ...todo, isCompleted: !todo.isCompleted } : todo)
            };
        default:
            return state
    }
}