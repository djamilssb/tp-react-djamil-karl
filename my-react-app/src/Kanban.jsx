import React, { useState } from "react";

function Kanban() {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Tâche 1", status: "todo" },
        { id: 2, title: "Tâche 2", status: "in-progress" },
        { id: 3, title: "Tâche 3", status: "done" },
    ]);

    const columns = [
        { title: "À faire", status: "todo" },
        { title: "En cours", status: "in-progress" },
        { title: "Terminées", status: "done" },
    ];


    const handleAddTask = () => {
        const title = prompt("Entrez le titre de la nouvelle tâche:");
        if (title) {
            const status = prompt(
                "Entrez le statut de la tâche (todo, in-progress, done):"
            );
            if (["todo", "in-progress", "done"].includes(status)) {
                addTask(title, status);
            } else {
                alert("Statut invalide. La tâche n'a pas été créée.");
            }
        }
    };

    const handleUpdateTask = (taskId) => {
        const [newTitle, setNewTitle] = useState("");

        const handleAddTask = () => {
            if (newTitle.trim() !== "") {
            addTask(newTitle);
            setNewTitle("");
            } else {
            alert("Le titre de la tâche ne peut pas être vide.");
            }
        };

        return (
            <div>
                <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Nom de la tâche"
                />
                <button onClick={handleAddTask}>Valider</button>
            </div>
        );
        
    };
    const addTask = (title) => {
        const newTask = {
            id: tasks.length + 1,
            title,
            status: "todo",
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const deleteTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    };

    const handleDragStart = (e, taskId) => {
        e.dataTransfer.setData("taskId", taskId);
    };

    const handleDrop = (e, newStatus) => {
        const taskId = e.dataTransfer.getData("taskId");
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
            task.id === parseInt(taskId) ? { ...task, status: newStatus } : task
            )
        );
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <h1> Kanban </h1>
            <button onClick={handleAddTask}>Ajouter une tâche</button>
            <div style={{ display: "flex", gap: "20px" }}>
                {columns.map((column) => (
                    <div
                        key={column.status}
                        onDrop={(e) => handleDrop(e, column.status)}
                        onDragOver={handleDragOver}
                        style={{
                            border: "1px solid black",
                            padding: "10px",
                            width: "200px",
                            minHeight: "300px",
                        }}
                    >
                        <h2>{column.title}</h2>
                        {tasks
                            .filter((task) => task.status === column.status)
                            .map((task) => (
                                <div
                                    key={task.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, task.id)}
                                    style={{
                                        border: "1px solid gray",
                                        padding: "5px",
                                        margin: "5px 0",
                                        backgroundColor: "lightgray",
                                        cursor: "grab",
                                    }}
                                >
                                    {task.title}
                                    <button
                                        onClick={() => handleUpdateTask(task.id)}
                                        style={{ marginLeft: "10px" }}
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={() => deleteTask(task.id)}
                                        style={{ marginLeft: "5px" }}
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Kanban;
