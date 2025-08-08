import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialTodo = [
    {
        id: "1",
        value: "Task 1",
        isCompleted: false
    },
    {
        id: "2",
        value: "Task 2",
        isCompleted: true
    },
    {
        id: "3",
        value: "Task 3",
        isCompleted: false
    }
]

export const fetchInitialTodo = createAsyncThunk("todo/fetchInitialTodo", async () => {
    const response = new Promise(resolve => {
        setTimeout(() => {
            resolve(initialTodo)
        }, 3000);
    });
    return response;
});

export const TodoSliceRTKThunk = createSlice({
    name: "Todo",
    initialState: {
        todoList: [],
        loading: false
    },
    reducers: {
        add: (state, action) => {
            console.log("2:- Inside the add reducer")
            const todo = state.todoList.push(action.payload)
        },
        edit: (state, action) => {
            console.log("2:- Inside the edit reducer")
            const todo = state.todoList.find(t => t.id == action.payload.id);
            if (todo) {
                todo.value = action.payload.value
            }
        },
        deleteT: (state, action) => {
            console.log("2:- Inside the delete reducer")
            const newList = state.todoList.filter(t => t.id !== action.payload.id)
            state.todoList = newList
        },
        toggle: (state, action) => {
            console.log("3:- Inside the toggle reducer")
            const todo = state.todoList.find(t => t.id == action.payload.id)
            if (todo) {
                todo.isCompleted = !todo.isCompleted
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInitialTodo.fulfilled, (state, action) => {
            console.log("0:- Thunk action payload", action.payload);
            state.todoList = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchInitialTodo.pending, (state) => {
            console.log("Loading State")
            state.loading = true;
        });
        builder.addCase(fetchInitialTodo.rejected, (state) => {
            state.loading = false;
        })
    }
})
export const { add, edit, deleteT, toggle } = TodoSliceRTKThunk.actions;