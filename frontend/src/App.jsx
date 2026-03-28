import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

const API_URL = "http://localhost:8080/api/tasks";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setTasks(response.data.content || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(API_URL, {
        title,
        description,
        completed: false,
      });

      setTitle("");
      setDescription("");
      setError("");
      fetchTasks();
    } catch (err) {
      console.error(err);
      setError("Failed to create task. Make sure all fields are filled in.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
      setError("Failed to delete task.");
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await axios.put(`${API_URL}/${task.id}`, {
        title: task.title,
        description: task.description,
        completed: !task.completed,
      });

      fetchTasks();
    } catch (err) {
      console.error(err);
      setError("Failed to update task.");
    }
  };

  return (
    <div className="app">
      <h1>Cloud Task Manager By Kirk Austin</h1>

      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          placeholder="Title of Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>

      {loading && <p>Loading tasks...</p>}
      {error && <p className="error">{error}</p>}

      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks yet.</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="task-card">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>
                <strong>Completed:</strong> {task.completed ? "Yes" : "No"}
              </p>
              <div className="task-actions">
                <button onClick={() => handleToggleComplete(task)}>
                  {task.completed ? "Mark Incomplete" : "Complete"}
                </button>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}