import { createSlice , nanoid } from "@reduxjs/toolkit";

const initailState = {
    todos: [{id : 1,text:"Hello World"}]
}

export const todoSlice = createSlice({
    name: "todo",
    initailState,
    reducer:{
        addTodo: (state, action) => {
            const todo = {
                id:nanoid(),
                text: action.payload
            }
            state.todos.push(todo)
        },
        removeTodo:(state,action) => {
            state.todos = state.todo.filter((todo) => todo.id!== action.payload)
        },
    }
})

export const {addTodo,removeTodo} = todoSlice.actions

export default todoSlice.reducer