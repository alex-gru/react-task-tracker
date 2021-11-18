import Header from "./components/Header";
import Tasks from "./components/Tasks";
import {useState} from "react";

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

    return (
        <div className="container">
            <Header/>
            {tasks.length > 0 ?
                (
                    <Tasks tasks={tasks} onDelete={deleteTask}/>
                ) : <p>No tasks available.</p>
            }
        </div>
    );
}

export default App;
