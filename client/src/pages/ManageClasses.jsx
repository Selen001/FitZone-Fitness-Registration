
import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ManageClasses.css";

const API = "http://localhost:5000/api/classes";

const initialForm = {
  title: "",
  category: "Yoga",
  description: "",
  trainer: "",
  duration: "",
  price: "",
  date: "",
  time: "",
  capacity: "",
  image: "",
  level: "Beginner"
};

function ManageClasses() {
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchClasses = async () => {
    try {
      const response = await axios.get(API);
      setClasses(response.data.data || []);
    } catch (err) {
      setError("Unable to load fitness classes.");
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const data = {
        ...form,
        duration: Number(form.duration),
        price: Number(form.price),
        capacity: Number(form.capacity)
      };

      if (editingId) {
        await axios.put(`${API}/${editingId}`, data);
        setMessage("Fitness class updated successfully!");
      } else {
        await axios.post(API, data);
        setMessage("Fitness class created successfully!");
      }

      setForm(initialForm);
      setEditingId(null);
      await fetchClasses();

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to save fitness class."
      );
    }
  };

  const editClass = (item) => {
    setEditingId(item._id);

    setForm({
      title: item.title || "",
      category: item.category || "Yoga",
      description: item.description || "",
      trainer: item.trainer || "",
      duration: item.duration || "",
      price: item.price || "",
      date: item.date ? item.date.slice(0, 10) : "",
      time: item.time || "",
      capacity: item.capacity || "",
      image: item.image || "",
      level: item.level || "Beginner"
    });

    setMessage("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteClass = async (id) => {
    if (!window.confirm("Are you sure you want to delete this class?")) {
      return;
    }

    try {
      await axios.delete(`${API}/${id}`);
      setMessage("Fitness class deleted successfully!");
      await fetchClasses();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to delete fitness class."
      );
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setMessage("");
    setError("");
  };

  return (
    <div className="manage-page">
      <div className="manage-header">
        <div>
          <p className="manage-tag">FITZONE ADMINISTRATION</p>
          <h1>Manage <span>Classes</span></h1>
          <p>Add, update and manage your fitness programs.</p>
        </div>

        <button className="back-dashboard" onClick={() => navigate("/dashboard")}>
          <ArrowLeft size={17} /> Dashboard
        </button>
      </div>

      <div className="manage-form-card">
        <h2>{editingId ? "Edit Fitness Class" : "Add New Class"}</h2>

        {message && <p className="manage-success">{message}</p>}
        {error && <p className="manage-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="manage-form-grid">
            <input
              name="title"
              placeholder="Class Title"
              value={form.title}
              onChange={handleChange}
              required
            />

            <select name="category" value={form.category} onChange={handleChange}>
              {["Yoga", "Strength Training", "Cardio", "Zumba", "Pilates", "Cycling"].map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

            <input
              name="trainer"
              placeholder="Trainer Name"
              value={form.trainer}
              onChange={handleChange}
              required
            />

            <select name="level" value={form.level} onChange={handleChange}>
              {["Beginner", "Intermediate", "Advanced"].map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

            <input
              name="duration"
              type="number"
              placeholder="Duration (minutes)"
              min="1"
              value={form.duration}
              onChange={handleChange}
              required
            />

            <input
              name="price"
              type="number"
              placeholder="Price (₹)"
              min="0"
              value={form.price}
              onChange={handleChange}
              required
            />

            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
            />

            <input
              name="time"
              placeholder="Time (e.g. 07:00 AM)"
              value={form.time}
              onChange={handleChange}
              required
            />

            <input
              name="capacity"
              type="number"
              placeholder="Maximum Capacity"
              min="1"
              value={form.capacity}
              onChange={handleChange}
              required
            />

            <input
              name="image"
              placeholder="Image URL (optional)"
              value={form.image}
              onChange={handleChange}
            />
          </div>

          <textarea
            name="description"
            placeholder="Class Description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <div className="manage-form-actions">
            <button type="submit" className="save-class-btn">
              <Plus size={17} />
              {editingId ? "Update Class" : "Add Class"}
            </button>

            {editingId && (
              <button type="button" className="reset-class-btn" onClick={resetForm}>
                Cancel Editing
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="manage-list-card">
        <h2>All Fitness Classes ({classes.length})</h2>

        <div className="manage-class-grid">
          {classes.map((item) => (
            <div className="manage-class-item" key={item._id}>
              <div>
                <span className="manage-category">{item.category}</span>
                <h3>{item.title}</h3>
                <p>Trainer: {item.trainer}</p>
                <p>Duration: {item.duration} minutes</p>
                <p>Price: ₹{item.price}</p>
                <p>Capacity: {item.capacity}</p>
                <p>Date: {new Date(item.date).toLocaleDateString()}</p>
                <p>Time: {item.time}</p>
              </div>

              <div className="manage-item-actions">
                <button onClick={() => editClass(item)} className="edit-class-btn">
                  <Pencil size={15} /> Edit
                </button>

                <button onClick={() => deleteClass(item._id)} className="delete-class-btn">
                  <Trash2 size={15} /> Delete
                </button>
              </div>
            </div>
          ))}

          {classes.length === 0 && (
            <p className="manage-empty">No fitness classes available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageClasses;
