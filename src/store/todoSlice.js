import { createSlice } from "@reduxjs/toolkit";

// Load tasks from localStorage
const loadTasks = () => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
};

const initialState = {
  tasks: loadTasks(),
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({ text: action.payload, completed: false });
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); 
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.text !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); 
    },
    editTask: (state, action) => {
      const { index, newText } = action.payload;
      state.tasks[index].text = newText;
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); 
    },
    toggleTaskCompletion: (state, action) => {
      state.tasks[action.payload].completed = !state.tasks[action.payload].completed;
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); 
    },
  },
});

export const { addTask, removeTask, editTask, toggleTaskCompletion } = todoSlice.actions;
export default todoSlice.reducer;
