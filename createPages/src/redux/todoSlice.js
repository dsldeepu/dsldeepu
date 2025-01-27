import {createSlice} from "@reduxjs/toolkit"

const loadFromLocalStroage = ()=>{
    const data = localStorage.getItem('todos');
    return data ? JSON.parse(data) : [];
};

const saveTodoLocalStroage= (state)=>{
    const data = JSON.stringify(state);
    localStorage.setItem('todos', data);
}

const todoSlice = createSlice({
    name:"todos",
    initialState: loadFromLocalStroage(),
    reducers:{
        addTodo : (state, action)=>{
            const newState = [...state ,action.payload];
            saveTodoLocalStroage(newState);
            return newState;
        },
        deleteTodo : (state,action)=>{
            const newState = state.filter(todo=>todo.id !== action.payload);
            saveTodoLocalStroage(newState);
            return newState;
        },
        editTodo : (state,action)=>{
            const newState = state.map((todo)=> todo.id ===action.payload.id ? action.payload : todo )
            saveTodoLocalStroage(newState);
            return newState;
        },
    },
});

export const {addTodo, editTodo, deleteTodo} = todoSlice.actions;
export default todoSlice.reducer;