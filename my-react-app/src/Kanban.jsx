import React, { useState } from "react";
import TodoList from "./TodoList";

const Kanban = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Tâche 1", status: "To Do", assignee: "" },
        { id: 2, title: "Tâche 2", status: "In Progress", assignee: "" },
        { id: 3, title: "Tâche 3", status: "Done", assignee: "" },
    ]);

    const handleStatusChange = (id, newStatus) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, status: newStatus } : task
            )
        );
    };

    const handleAssigneeChange = (id, newAssignee) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, assignee: newAssignee } : task
            )
        );
    };

    return (
        <div>
            <h1>Gestion des Tâches</h1>
            <TodoList tasks={tasks} onStatusChange={handleStatusChange} />
            {/* Vous pouvez ajouter d'autres composants ou fonctionnalités ici */}
        </div>
    );
};

export default Kanban;
