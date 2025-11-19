// import { useRef, useMemo, useState, useEffect } from "react";
// import { useTodos } from "./hooks/useTodos"
// import "./App.css"

// function App() {
//   const {todos, addTodo, toggleTodo, deleteTodo} = useTodos()

//   const inputRef = useRef(null)
//   const [filter, setFilter] = useState("all")

//   useEffect(() => {
//     inputRef.current.focus()
//   }, [])

//   const handleAdd = () => {
//     const value = inputRef.current.value.trim()

//     if(!value) return 

//     addTodo(value)
//     inputRef.current.value = ""
//   }

//   const filteredTodos = useMemo(() => {
//     switch (filter) {
//       case "completed":
//         return todos.filter(todo => todo.completed)

//       case "pending":
//         return todos.filter(todo => !todo.completed)
      
//       default:
//         return todos
//     }
//   }, [todos, filter])

//   const completedCount = todos.filter(todo => todo.completed).length
//   const pendingCount = todos.length - completedCount

//   return (
//     <div className="app-container">
//       <h1 className="title">DAY-4: Todo Manager App</h1>

//       {/* Input Section */}
//       <div className="input-section">
//         <input
//           ref={inputRef}
//           type="text"
//           placeholder="Enter new todo..."
//           className="todo-input"
//         />
//         <button onClick={handleAdd} className="add-btn">
//           Add Todo
//         </button>
//       </div>

//       {/* Filter Buttons */}
//       <div className="filter-buttons">
//         <button
//           className={`filter-btn ${filter === "all" ? "active" : ""}`}
//           onClick={() => setFilter("all")}
//         >
//           All
//         </button>

//         <button
//           className={`filter-btn ${filter === "completed" ? "active" : ""}`}
//           onClick={() => setFilter("completed")}
//         >
//           Completed
//         </button>

//         <button
//           className={`filter-btn ${filter === "pending" ? "active" : ""}`}
//           onClick={() => setFilter("pending")}
//         >
//           Pending
//         </button>
//       </div>

//       {/* Todo List */}
//       <ul className="todo-list">
//         {filteredTodos.map(todo => (
//           <li
//             key={todo.id}
//             className="todo-item"
//           >
//             <span
//               className={`todo-title ${
//                 todo.completed ? "completed-todo" : ""
//               }`}
//             >
//               {todo.title}
//             </span>

//             <button onClick={() => toggleTodo(todo.id)} className="toggle-btn">
//               {todo.completed ? "Undo" : "Complete"}
//             </button>

//             <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>

//       {/* Stats */}
//       <h3 className="stats">
//         Total: {todos.length} | Completed: {completedCount} | Pending: {pendingCount}
//       </h3>
//     </div>
//   );
// }

// export default App;

import { useRef, useMemo, useState, useEffect } from "react";
import { useTodos } from "./hooks/useTodos";
import "./App.css";

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();

  const inputRef = useRef(null);
  const [filter, setFilter] = useState("all");

  // Auto-focus input on page load
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleAdd = () => {
    const value = inputRef.current.value.trim();
    if (!value) return;

    addTodo(value);
    inputRef.current.value = ""; // clear input
  };

  // Filtering optimized with useMemo
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "completed":
        return todos.filter(t => t.completed);

      case "pending":
        return todos.filter(t => !t.completed);

      default:
        return todos;
    }
  }, [todos, filter]);

  const completedCount = todos.filter(t => t.completed).length;
  const pendingCount = todos.length - completedCount;

  return (
    <div className="app-container">
      <h1 className="title">DAY-4: Todo Manager + LocalStorage</h1>

      {/* Input Section */}
      <div className="input-section">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter new todo..."
          className="todo-input"
        />
        <button onClick={handleAdd} className="add-btn">
          Add Todo
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={`filter-btn ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>

        <button
          className={`filter-btn ${filter === "pending" ? "active" : ""}`}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
      </div>

      {/* Todo List */}
      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <li key={todo.id} className="todo-item">
            <span
              className={`todo-title ${
                todo.completed ? "completed-todo" : ""
              }`}
            >
              {todo.title}
            </span>

            <div>
              <button
                onClick={() => toggleTodo(todo.id)}
                className="toggle-btn"
              >
                {todo.completed ? "Undo" : "Complete"}
              </button>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Stats */}
      <h3 className="stats">
        Total: {todos.length} | Completed: {completedCount} | Pending: {pendingCount}
      </h3>
    </div>
  );
}

export default App;
