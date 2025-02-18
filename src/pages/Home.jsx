import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, removeTask, editTask, toggleTaskCompletion } from "../store/todoSlice";
import { FaEdit, FaTrash, FaCheckCircle, FaUndo } from "react-icons/fa";

function Home() {
  const [task, setTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const tasks = useSelector((state) => state.todos.tasks);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      if (editIndex !== null) {
        dispatch(editTask({ index: editIndex, newText: task }));
        setEditIndex(null);
      } else {
        dispatch(addTask(task));
      }
      setTask("");
    }
  };

  const handleEdit = (task, index) => {
    setTask(task.text);
    setEditIndex(index);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] px-4">
      <div className="max-w-lg w-full bg-white bg-opacity-10 backdrop-blur-md shadow-lg p-6 rounded-2xl">
        
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-4 text-black flex items-center justify-center gap-2">
          <span>📝</span> My Todo List
        </h1>

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full px-4 py-3 text-gray-900 bg-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a task..."
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all shadow-md"
          >
            {editIndex !== null ? "Update Task" : "Add Task"}
          </button>
        </form>

        {/* Task List */}
        <ul className="space-y-3">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg shadow-md transition-all ${
                task.completed ? "bg-green-100 text-gray-600" : "bg-white text-gray-900"
              }`}
            >
              <span className="flex-1 text-sm sm:text-base">{task.text}</span>
              <div className="flex items-center gap-3">
                {/* Complete / Undo Button */}
                <button
                  onClick={() => dispatch(toggleTaskCompletion(index))}
                  className="text-green-500 hover:text-green-600 transition-all"
                >
                  {task.completed ? <FaUndo size={18} /> : <FaCheckCircle size={18} />}
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => handleEdit(task, index)}
                  className="text-yellow-500 hover:text-yellow-600 transition-all"
                >
                  <FaEdit size={18} />
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => dispatch(removeTask(task.text))}
                  className="text-red-500 hover:text-red-600 transition-all"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
