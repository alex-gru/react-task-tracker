import React from 'react';
import Task from "./Task";

function Tasks({tasks, onDelete, onToggleReminder}) {
    return (
        <>
            {tasks.map(task => (
                <Task key={task.id} task={task} onDelete={onDelete} onToggleReminder={onToggleReminder}/>
            ))}
        </>
    );
}

export default Tasks;
