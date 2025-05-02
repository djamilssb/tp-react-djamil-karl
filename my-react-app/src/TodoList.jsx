import React, { useState } from 'react';


function TodoList ()  {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [taskStates, setTaskStates] = useState({}); // Store task states

    const addTask = () => {
        if (newTask.trim() !== '') {
            const taskId = Date.now(); // Unique ID for each task
            setTasks([...tasks, { id: taskId, name: newTask }]);
            setTaskStates({ ...taskStates, [taskId]: 'à faire' });
            setNewTask('');
        }
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
        const updatedStates = { ...taskStates };
        delete updatedStates[taskId];
        setTaskStates(updatedStates);
    };

    const changeState = (taskId, newState) => {
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
                <button onClick={addTask}>Add</button>
            </div>
            <h2>Tasks</h2>
            <ul>
                {tasks
                    .filter((task) => taskStates[task.id] === 'à faire')
                    .map((task) => (
                        <li key={task.id}>
                            <span>{task.name}</span>
                            <select
                                value={taskStates[task.id]}
                                onChange={(e) => changeState(task.id, e.target.value)}
                            >
                                <option value="à faire">À faire</option>
                                <option value="en cours">En cours</option>
                                <option value="fini">Fini</option>
                            </select>
                            <button onClick={() => deleteTask(task.id)}>Delete</button>
                        </li>
                    ))}
            </ul>
            <h2>Tasks In Progress</h2>
            <ul>
                {tasks
                    .filter((task) => taskStates[task.id].startsWith('en cours'))
                    .map((task) => (
                        <li key={task.id}>
                            <span>{task.name}</span>
                            {taskStates[`${task.id}_validated`] ? (
                                <span> - Assigned to: {taskStates[`${task.id}_person`]}</span>
                            ) : (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Enter name"
                                        value={taskStates[`${task.id}_person`] || ''}
                                        onChange={(e) =>
                                            setTaskStates({
                                                ...taskStates,
                                                [`${task.id}_person`]: e.target.value,
                                            })
                                        }
                                    />
                                    <button
                                        onClick={() =>
                                            setTaskStates({
                                                ...taskStates,
                                                [task.id]: 'en cours',
                                                [`${task.id}_validated`]: true,
                                            })
                                        }
                                    >
                                        Validate
                                    </button>
                                </>
                            )}
                            <button
                                onClick={() =>
                                    setTaskStates({
                                        ...taskStates,
                                        [task.id]: 'fini',
                                    })
                                }
                            >
                                Terminer
                            </button>
                        </li>
                    ))}
            </ul>
            <h2>Completed Tasks</h2>
            <ul>
                {tasks
                    .filter((task) => taskStates[task.id] === 'fini')
                    .map((task) => (
                        <li key={task.id}>
                            <span>{task.name}</span>
                            <button onClick={() => deleteTask(task.id)}>Delete</button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default TodoList;