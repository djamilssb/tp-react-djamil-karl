import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoList from './TodoList'
import Kanban from './Kanban'
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <NavLink to="/TodoList">TodoList</NavLink>
              </li>
              <li>
                <NavLink to="/Kanban">Kanban</NavLink>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/Todolist" element={<TodoList/>}></Route>
            <Route path="/Kanban" element={<Kanban/>}></Route>
            <Route path="*" element={<div>Page non trouvée</div>} />

          </Routes>
        </div>
      </BrowserRouter>
  )
}

export default App
