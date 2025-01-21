import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { MdEdit, MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  const saveToLS = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    const editTodo = todos.find((item) => item.id === id);
    setTodo(editTodo.todo);
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
    saveToLS(updatedTodos);
  };

  const handleDelete = (e, id) => {
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
    saveToLS(updatedTodos);
  };

  const handleAdd = () => {
    const updatedTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(updatedTodos);
    saveToLS(updatedTodos);
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
    saveToLS(updatedTodos);
  };

  return (
    <>
      <Navbar />
      <div className="container bg-pink-100 mx-auto my-5 rounded-xl p-5 min-h-[80vh] w-full max-w-3xl shadow-lg">
        <h1 className="font-bold text-center text-3xl font-mono text-orange-500 mb-6">
          TaskManager: Manage Your Tasks in One Place
        </h1>

        {/* Add Task Section */}
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold font-mono text-orange-500">Add a Task</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            placeholder="Enter your task here..."
            className="w-full rounded-lg p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-pink-300"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="bg-pink-700 disabled:bg-pink-400 hover:bg-pink-800 p-2 text-sm font-bold text-white rounded-md"
          >
            Save
          </button>
        </div>

        {/* Show Finished Toggle */}
        <label className="flex items-center gap-2 my-4">
          <input
            type="checkbox"
            className="rounded text-pink-500 focus:ring-pink-300"
            onChange={toggleFinished}
            checked={showFinished}
          />
          <span>Show Finished</span>
        </label>

        {/* Task List Section */}
        <h2 className="text-lg font-bold font-mono text-orange-500">Your Tasks</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Tasks to display</div>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex w-full justify-between items-center bg-white shadow-sm p-3 rounded-lg my-3 hover:bg-gray-50"
                >
                  <div className="flex gap-3 items-center">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      className="rounded text-pink-500 focus:ring-pink-300"
                      checked={item.isCompleted}
                    />
                    <span className={item.isCompleted ? "line-through" : ""}>{item.todo}</span>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-pink-500 hover:bg-pink-800 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="bg-pink-500 hover:bg-pink-800 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;
