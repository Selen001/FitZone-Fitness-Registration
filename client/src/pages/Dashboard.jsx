
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Dumbbell,
  Users,
  UserCheck,
  CalendarDays,
  RefreshCw
} from "lucide-react";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [classResponse, registrationResponse] = await Promise.all([
        axios.get("http://localhost:5000/api/classes"),
        axios.get("http://localhost:5000/api/registrations")
      ]);

      setClasses(classResponse.data.data || []);
      setRegistrations(registrationResponse.data.data || []);
    } catch (err) {
      setError("Unable to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const confirmedCount = registrations.filter(
    (registration) => registration.status === "Confirmed"
  ).length;

  const cancelledCount = registrations.filter(
    (registration) => registration.status === "Cancelled"
  ).length;

  const updateRegistrationStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/registrations/${id}`,
        { status: newStatus }
      );

      alert(response.data.message);
      await fetchDashboardData();
    } catch (err) {
      console.error("Status update error:", err);
      alert(
        err.response?.data?.message ||
        "Unable to update registration."
      );
    }
  };

  const deleteRegistration = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this registration?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/registrations/${id}`
      );

      alert("Registration deleted successfully!");
      await fetchDashboardData();
    } catch (err) {
      alert(
        err.response?.data?.message || "Unable to delete registration."
      );
    }
  };

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-page">

      <div className="dashboard-header">
        <div>
          <p className="dashboard-tag">FITZONE ADMINISTRATION</p>
          <h1>Dashboard <span>Overview</span></h1>
          <p>Manage your fitness classes and registrations.</p>
        </div>

        <div className="dashboard-header-actions">
          <button
            className="manage-classes-btn"
            onClick={() => navigate("/manage-classes")}
          >
            Manage Classes
          </button>

          <button className="refresh-btn" onClick={fetchDashboardData}>
            <RefreshCw size={17} /> Refresh
          </button>
        </div>
      </div>

      {error && <p className="dashboard-error">{error}</p>}

      <div className="dashboard-stats">

        <div className="stat-card">
          <div className="stat-icon"><Dumbbell /></div>
          <p>Total Classes</p>
          <h2>{classes.length}</h2>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><Users /></div>
          <p>Total Registrations</p>
          <h2>{registrations.length}</h2>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><UserCheck /></div>
          <p>Confirmed</p>
          <h2>{confirmedCount}</h2>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><CalendarDays /></div>
          <p>Cancelled</p>
          <h2>{cancelledCount}</h2>
        </div>

      </div>

      <div className="dashboard-section">
        <div className="table-heading">
          <div>
            <h2>Recent Registrations</h2>
            <p>Manage your fitness class participants.</p>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Participant</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Fitness Class</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {registrations.map((registration) => (
                <tr key={registration._id}>
                  <td>{registration.participantName}</td>
                  <td>{registration.email}</td>
                  <td>{registration.phone}</td>
                  <td>
                    {registration.fitnessClass?.title || "Class unavailable"}
                  </td>
                  <td>
                    <span className={`status ${registration.status?.toLowerCase()}`}>
                      {registration.status}
                    </span>
                  </td>
                  <td>
                    {registration.status === "Confirmed" ? (
                      <button
                        className="cancel-btn"
                        onClick={() =>
                          updateRegistrationStatus(registration._id, "Cancelled")
                        }
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        className="confirm-btn"
                        onClick={() =>
                          updateRegistrationStatus(registration._id, "Confirmed")
                        }
                      >
                        Confirm
                      </button>
                    )}

                    <button
                      className="delete-btn"
                      onClick={() => deleteRegistration(registration._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {registrations.length === 0 && (
                <tr>
                  <td colSpan="6" className="empty-table">
                    No registrations available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
