import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

const API_URL = "http://localhost:8080/api/tasks";

export default function App() {
  const [filter, setFilter] = useState("all");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);

      let url = API_URL;

      if (filter === "completed") {
        url += "?completed=true";
      } else if (filter === "incomplete") {
        url += "?completed=false";
      }

      const response = await axios.get(url);
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
  }, [filter]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }

    try {
      if (editingTaskId) {
        const existingTask = tasks.find((task) => task.id === editingTaskId);

        await axios.put(`${API_URL}/${editingTaskId}`, {
          title,
          description,
          completed: existingTask ? existingTask.completed : false,
          priority,
        });
      } else {
        await axios.post(API_URL, {
          title,
          description,
          completed: false,
          priority,
        });
      }

      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setEditingTaskId(null);
      setError("");
      fetchTasks();
    } catch (err) {
      console.error(err);
      setError("Failed to save task.");
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
        priority: task.priority,
      });

      fetchTasks();
    } catch (err) {
      console.error(err);
      setError("Failed to update task.");
    }
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority || "MEDIUM");
    setEditingTaskId(task.id);
    setError("");
  };

  const handleCancelEdit = () => {
    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setEditingTaskId(null);
    setError("");
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "HIGH":
        return "priority-high";
      case "MEDIUM":
        return "priority-medium";
      case "LOW":
        return "priority-low";
      default:
        return "";
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

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>

        <button type="submit">
          {editingTaskId ? "Update Task" : "Add Task"}
        </button>

        {editingTaskId && (
          <button type="button" onClick={handleCancelEdit}>
            Cancel Edit
          </button>
        )}
      </form>

      {loading && <p>Loading tasks...</p>}
      {error && <p className="error">{error}</p>}

      <div className="filters">
        <button
          className={filter === "all" ? "filter-btn active-filter" : "filter-btn"}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "completed" ? "filter-btn active-filter" : "filter-btn"}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          className={filter === "incomplete" ? "filter-btn active-filter" : "filter-btn"}
          onClick={() => setFilter("incomplete")}
        >
          Incomplete
        </button>
      </div>

      <div className="task-list">
        {tasks.length === 0 ? (
          <div className="empty-state">
          <p>No tasks yet. Add your first task above.</p>
        </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="task-card">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>
                <strong>Priority:</strong>{" "}
                <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
                  {task.priority}
                </span>
              </p>
              <p>
                <strong>Completed:</strong> {task.completed ? "Yes" : "No"}
              </p>

              <div className="task-actions">
                <button className="edit-btn" onClick={() => handleEdit(task)}>
                  Edit
                </button>
                <button className="complete-btn" onClick={() => handleToggleComplete(task)}>
                  {task.completed ? "Mark Incomplete" : "Complete"}
                </button>
                <button className="delete-btn" onClick={() => handleDelete(task.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}