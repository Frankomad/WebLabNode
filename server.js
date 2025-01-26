// Import dependencies
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()
const PORT = 5000

// Middleware
app.use(bodyParser.json())
app.use(cors())

// Mock Data
let tasks = [
  {
    id: 1,
    title: "Buy groceries",
    description: "Milk, Bread, Eggs",
    completed: false,
  },
  {
    id: 2,
    title: "Study Vue",
    description: "Learn Vue 3 basics and Pinia",
    completed: false,
  },
  {
    id: 3,
    title: "Clean the house",
    description: "Vacuum and dust all rooms",
    completed: true,
  },
]

// Routes

// GET all tasks
app.get("/tasks", (req, res) => {
  console.log("Get All")
  console.log("tasks returned: ", tasks)
  res.json(tasks)
})

// GET a single task by ID
app.get("/tasks/:id", (req, res) => {
  console.log("Get")
  const { id } = req.params
  const task = tasks.find((t) => t.id === parseInt(id))
  if (task) {
    res.json(task)
  } else {
    res.status(404).json({ message: "Task not found" })
  }
})

// POST a new task
app.post("/tasks", (req, res) => {
  console.log("Create")
  const { title, description, completed } = req.body

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required" })
  }

  const newTask = {
    id: tasks.length + 1, // Simple ID generation
    title,
    description,
    completed: completed || false,
  }

  tasks.push(newTask)
  res.status(201).json(newTask)
})

// PUT (Update) an existing task
app.put("/tasks/:id", (req, res) => {
  console.log("Put")
  const { id } = req.params
  const { title, description, completed } = req.body

  const task = tasks.find((t) => t.id === parseInt(id))
  if (!task) {
    return res.status(404).json({ message: "Task not found" })
  }

  if (title) task.title = title
  if (description) task.description = description
  if (typeof completed === "boolean") task.completed = completed

  res.json(task)
})

// DELETE a task
app.delete("/tasks/:id", (req, res) => {
  console.log("delete")
  const { id } = req.params
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(id))

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" })
  }

  const deletedTask = tasks.splice(taskIndex, 1)
  res.json(deletedTask)
})

// Start the server
app.listen(PORT, () => {
  console.log(`Task Organizer Backend is running on http://localhost:${PORT}`)
})
