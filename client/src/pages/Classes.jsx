
import { useEffect, useState } from "react";
import axios from "axios";
import { Clock, User, Calendar, IndianRupee } from "lucide-react";
import "./Classes.css";
import { useNavigate } from "react-router-dom";
function Classes() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/classes"
      );

      setClasses(response.data.data || []);
    } catch (err) {
      setError("Unable to load fitness classes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredClasses = classes.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.trainer.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="classes-page">

      <div className="classes-heading">
        <p>TRAIN WITH THE BEST</p>
        <h1>EXPLORE OUR <span>CLASSES</span></h1>
        <p>Find the perfect workout for your fitness journey.</p>
      </div>

      <div className="class-filters">
        <input
          type="text"
          placeholder="Search classes or trainers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Yoga">Yoga</option>
          <option value="Strength Training">Strength Training</option>
          <option value="Cardio">Cardio</option>
          <option value="Zumba">Zumba</option>
          <option value="Pilates">Pilates</option>
          <option value="Cycling">Cycling</option>
        </select>
      </div>

      {loading && <p className="class-message">Loading classes...</p>}

      {error && <p className="class-error">{error}</p>}

      {!loading && !error && (
        <div className="classes-grid">

          {filteredClasses.map((item) => (
            <div className="class-card" key={item._id}>

              <div className="class-image">
                <img
                  src={
                    item.image ||
                    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"
                  }
                  alt={item.title}
                />

                <span>{item.category}</span>
              </div>

              <div className="class-details">

                <h2>{item.title}</h2>

                <p className="class-description">
                  {item.description}
                </p>

                <div className="class-info">
                  <p><User size={16} /> {item.trainer}</p>
                  <p><Clock size={16} /> {item.duration} Minutes</p>
                  <p><Calendar size={16} /> {new Date(item.date).toLocaleDateString("en-IN")} · {item.time}</p>
                  <p><span className="level-label">Level:</span> {item.level}</p>
                </div>

                <div className="class-bottom">
                  <h3>
                    <IndianRupee size={18} />
                    {item.price}
                  </h3>

                 <button
  onClick={() => {
    navigate(
      `/register?classId=${item._id}&title=${encodeURIComponent(item.title)}`
    );
  }}
>
  Register Now
</button>
                </div>

              </div>
            </div>
          ))}

          {filteredClasses.length === 0 && (
            <p className="class-message">
              No fitness classes found.
            </p>
          )}

        </div>
      )}

    </div>
  );
}

export default Classes;
