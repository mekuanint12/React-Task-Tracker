import { useState, useEffect } from "react"
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'



function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([ ])


  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetches tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

    // Fetches task
    const fetchTask = async (id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()
      return data
    }

  // Add Task
  const addTask = async (task) => {
    // const id = Math.floor(Math.random() * 100) + 1;
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
    const res = await fetch('http://localhost:5000/tasks', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(task)});
    const data = await res.json();
    setTasks([...tasks, data])
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'}) 
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {

    const taskToUpdate = await fetchTask(id);
    const updateTask = {...taskToUpdate, reminder: !taskToUpdate.reminder}
    const  res = await fetch(`http://localhost:5000/tasks/${id}`, {method: 'PUT',  headers: {'Content-Type': 'application/json'}, body: JSON.stringify(updateTask)});
    const data = await res.json();
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task ))
  }

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask} /> }
      {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) : ("No Tasks to Show")}
      <Footer />
    </div>
  );
}

export default App;
