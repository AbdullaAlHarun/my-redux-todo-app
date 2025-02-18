import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({ text: action.payload, completed: false });
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.text !== action.payload);
    },
    editTask: (state, action) => {
      const { index, newText } = action.payload;
      state.tasks[index].text = newText;
    },
    toggleTaskCompletion: (state, action) => {
      state.tasks[action.payload].completed = !state.tasks[action.payload].completed;
    },
  },
});

export const { addTask, removeTask, editTask, toggleTaskCompletion } = todoSlice.actions;
export default todoSlice.reducer;
