import Header from "./components/Header";
import Tasks from "./components/Tasks";
import {useState} from "react";
import AddTask from "./components/AddTask";

function App() {
    const [tasks, setTasks] = useState([
            {
                id: 1,
                text: 'Doctors appointment',
                day: 'Today',
                reminder: false
            },
            {
                id: 2,
                text: 'Pick up girlfriend',
                day: 'Tomorrow',
                reminder: false
            }
        ]
    )

    // Delete Task
    const deleteTask = (id) => {
        console.log('delete', id)
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const toggleReminder = (id) => {
      console.log('toggle reminder:', id)
        setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))
    }

    const addTask = (task) => {
      console.log(task)
        const id = Math.floor(Math.random() * 10000) + 1
        const newTask = { id, ...task }
        setTasks([...tasks, newTask])
    }

    return (
        <div className="container">
            <Header/>
            <AddTask onAdd={addTask}/>
            {tasks.length > 0 ?
                (
                    <Tasks tasks={tasks} onDelete={deleteTask} onToggleReminder={toggleReminder} />
                ) : <p>No tasks available.</p>
            }
        </div>
    );
}

export default App;
