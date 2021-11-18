import Header from "./components/Header";
import Tasks from "./components/Tasks";
import {useEffect, useState} from "react";
import AddTask from "./components/AddTask";

function App() {
    const [showAddTask, setShowAddTask] = useState(false);
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }
        getTasks()
    }, []);

    // Fetch tasks from json-server (fake REST API)
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()
        console.log('data', data)
        return data
    }

    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json()
        return data
    }

    // Delete Task
    const deleteTask = async (id) => {
        console.log('delete', id)

        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE'
        })

        setTasks(tasks.filter((task) => task.id !== id))
    }

    const toggleReminder = async (id) => {
        console.log('toggle reminder:', id)
        const taskToToggle = await fetchTask(id)
        const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder}
        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        })
        const data = await res.json()
        setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
    }

    const addTask = async (task) => {
      console.log('add task', task)
        const res = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/JSON'
            },
            body: JSON.stringify(task)
        })
        const data = await res.json()
        setTasks([...tasks, data])
    }

    return (
        <div className="container">
            <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
            { showAddTask && <AddTask onAdd={addTask}/>
            }
            {tasks.length > 0 ?
                (
                    <Tasks tasks={tasks} onDelete={deleteTask} onToggleReminder={toggleReminder} />
                ) : <p>No tasks available.</p>
            }
        </div>
    );
}

export default App;
