import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TodoListStateModel, TodoModel} from '../../types';

const savedTodoList = localStorage.getItem('todoList')

const initialState: TodoListStateModel = {
  todoList: savedTodoList ? JSON.parse(savedTodoList) : [],
  auth: true, // в данном случае хардкодим. В лайф проектах данная переменная заменяется переменной токен из другого стора состояним авторизации
}

const todoListSlice = createSlice({
  name: 'todoList',
  initialState: initialState,
  reducers: {
    clearTodoList: (state) => {
      state.todoList = [];
    },
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
    },
    editTodo: (state, action: PayloadAction<TodoModel>) => {
      const { id, text, status } = action.payload;
      const todo = state.todoList.find(todo => todo.id === id);
      if (todo) {
        todo.text = text;
        todo.status = status;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todoList = state.todoList.filter(todo => todo.id !== action.payload);
    },
    changeStatusTodo: (state, action) => {
      const { id, status } = action.payload;
      const todoIndex = state.todoList.findIndex((todo) => todo.id === id);

      if (todoIndex !== -1) {
        state.todoList[todoIndex].status = status;
      }
    },
    saveChangeTodoList: (state) => {
      localStorage.setItem('todoList', JSON.stringify(state.todoList));
    }
  }
})

export const {
  clearTodoList,
  addTodo,
  deleteTodo,
  changeStatusTodo,
  saveChangeTodoList,
  editTodo
} = todoListSlice.actions;
export default todoListSlice.reducer;