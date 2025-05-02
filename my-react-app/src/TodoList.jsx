import React, { useState } from 'react';


const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [taskStates, setTaskStates] = useState({}); // Store task states

    const handleAddTask = () => {
        if (newTask.trim() !== '') {
            const taskId = Date.now(); // Unique ID for each task
            setTasks([...tasks, { id: taskId, name: newTask }]);
            setTaskStates({ ...taskStates, [taskId]: 'à faire' });
            setNewTask('');
        }
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
        const updatedStates = { ...taskStates };
        delete updatedStates[taskId];
        setTaskStates(updatedStates);
    };

    const handleChangeState = (taskId, newState) => {
        setTaskStates({ ...taskStates, [taskId]: newState });
    };

    return (
        <div>
            <h1>Todo List</h1>
            <div>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task"
                />
                <button onClick={handleAddTask}>Add</button>
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <span>{task.name}</span>
                        <select
                            value={taskStates[task.id]}
                            onChange={(e) => handleChangeState(task.id, e.target.value)}
                        >
                            <option value="à faire">À faire</option>
                            <option value="en cours">En cours</option>
                            <option value="fini">Fini</option>
                        </select>
                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;