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
            console.log(action);
            const todo = state.todoList.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInitialTodo.fulfilled, (state, action) => {
            console.log("Thunk action payload", action.payload);
            state.todoList = action.payload;
            state.loading = false;
            console.log("State Value", state);
        });
        builder.addCase(fetchInitialTodo.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchInitialTodo.rejected, (state) => {
            state.loading = false;
        })
    }
})
export const { add } = TodoSliceRTKThunk.actions;