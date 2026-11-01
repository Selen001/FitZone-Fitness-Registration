
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, User, Mail, Phone, CheckCircle } from "lucide-react";
import "./Register.css";
function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const classId = searchParams.get("classId");
  const classTitle = searchParams.get("title") || "Fitness Class";

  const [formData, setFormData] = useState({
    participantName: "",
    email: "",
    phone: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!classId) {
      setMessage("Please select a valid fitness class.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/registrations",
        {
          participantName: formData.participantName,
          email: formData.email,
          phone: formData.phone,
          fitnessClass: classId
        }
      );

      setSuccess(true);
      setMessage(response.data.message || "Registration successful!");

      setFormData({
        participantName: "",
        email: "",
        phone: ""
      });

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <button className="back-btn" onClick={() => navigate("/classes")}>
          <ArrowLeft size={18} /> Back to Classes
        </button>

        <div className="register-heading">
          <p className="register-tag">JOIN FITZONE</p>
          <h1>Complete Your <span>Registration</span></h1>
          <p>Fill in your details to reserve your fitness class.</p>
        </div>

        <div className="selected-class">
          <p>SELECTED FITNESS CLASS</p>
          <h3>{classTitle}</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Participant Name</label>
          <div className="register-input">
            <User size={19} />
            <input
              type="text"
              name="participantName"
              placeholder="Enter your full name"
              value={formData.participantName}
              onChange={handleChange}
              required
            />
          </div>

          <label>Email Address</label>
          <div className="register-input">
            <Mail size={19} />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <label>Phone Number</label>
          <div className="register-input">
            <Phone size={19} />
            <input
              type="tel"
              name="phone"
              placeholder="10-digit phone number"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9]{10}"
              maxLength="10"
              required
            />
          </div>

          {message && (
            <div className={success ? "success-message" : "error-message"}>
              {success && <CheckCircle size={18} />}
              {message}
            </div>
          )}

          <button type="submit" className="register-submit" disabled={loading}>
            {loading ? "Submitting..." : "Confirm Registration"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
