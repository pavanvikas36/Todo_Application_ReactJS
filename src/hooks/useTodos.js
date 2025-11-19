// import { useReducer, useCallback } from "react";

// const initialState = []

// function todoReducer(state, action) {
//     switch (action.type) {
//         case "ADD":
//             return [...state, action.payload]
        
//         case "TOGGLE":
//             return state.map(todo => 
//                 todo.id === action.payload
//                     ? {...todo, completed: !todo.completed}
//                 : todo
//             )
        
//         case "REMOVE":
//             return state.filter(todo => todo.id !== action.payload)
        
//         default:
//             return state
//     }
// }

// export function useTodos() {
//     const [todos, dispatch] = useReducer(todoReducer, initialState)

//     const addTodo = useCallback((title) => {
//         const newTodo = {
//             id: Date.now(),
//             title,
//             completed: false
//         }
//         dispatch({type: "ADD", payload: newTodo})
//     }, [])

//     const toggleTodo = useCallback((id) => {
//         dispatch({type: "TOGGLE", payload: id})
//     }, [])

//     const deleteTodo = useCallback((id) => {
//         dispatch({type: "REMOVE", payload: id})
//     }, [])

//     return {todos, addTodo, toggleTodo, deleteTodo}
// }

import { useReducer, useCallback, useEffect } from "react";

const initialState = [];

function todoReducer(state, action) {
  switch (action.type) {
    case "LOAD":
      return action.payload;

    case "ADD":
      return [...state, action.payload];

    case "TOGGLE":
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case "REMOVE":
      return state.filter(todo => todo.id !== action.payload);

    default:
      return state;
  }
}

export function useTodos() {
  const [todos, dispatch] = useReducer(todoReducer, initialState);

  // 1️⃣ Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    dispatch({ type: "LOAD", payload: savedTodos });
  }, []);

  // 2️⃣ Save todos to localStorage whenever TODOS change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 3️⃣ Handlers (memoized)
  const addTodo = useCallback((title) => {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    };
    dispatch({ type: "ADD", payload: newTodo });
  }, []);

  const toggleTodo = useCallback((id) => {
    dispatch({ type: "TOGGLE", payload: id });
  }, []);

  const deleteTodo = useCallback((id) => {
    dispatch({ type: "REMOVE", payload: id });
  }, []);

  return { todos, addTodo, toggleTodo, deleteTodo };
}
