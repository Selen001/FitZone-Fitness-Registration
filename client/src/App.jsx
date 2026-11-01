
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Classes from "./pages/Classes";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ManageClasses from "./pages/ManageClasses";

import "./App.css";
import { ArrowRight, Dumbbell, HeartPulse, Activity, Menu } from "lucide-react";

function Home() {
  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          FIT<span>ZONE</span>
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/classes">Classes</Link>
          <Link to="/dashboard">Dashboard</Link>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          
        </div>

        <Link to="/classes" className="join-btn">
          Join Now <ArrowRight size={17} />
        </Link>

        <Menu className="mobile-menu" />
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <p className="tagline">YOUR FITNESS JOURNEY STARTS HERE</p>

          <h1>
            BUILD YOUR
            <br />
            <span>STRONGER</span>
            <br />
            SELF.
          </h1>

          <p className="hero-description">
            Transform your body, strengthen your mind, and become
            the best version of yourself with FitZone.
          </p>

          <div className="hero-buttons">
            <Link to="/classes" className="primary-btn">
              Explore Classes <ArrowRight size={18} />
            </Link>

            <a href="#about" className="secondary-btn">
              Learn More
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <h2>20+</h2>
              <p>Fitness Classes</p>
            </div>
            <div>
              <h2>10+</h2>
              <p>Expert Trainers</p>
            </div>
            <div>
              <h2>500+</h2>
              <p>Happy Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="about">
        <div className="section-heading">
          <p>WHY CHOOSE FITZONE?</p>
          <h2>Everything You Need To Get Fit</h2>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <Dumbbell size={35} />
            <h3>Expert Trainers</h3>
            <p>Learn from experienced fitness professionals.</p>
          </div>

          <div className="feature-card">
            <HeartPulse size={35} />
            <h3>Healthy Lifestyle</h3>
            <p>Build healthy habits and improve your wellbeing.</p>
          </div>

          <div className="feature-card">
            <Activity size={35} />
            <h3>Various Classes</h3>
            <p>Choose from yoga, cardio, strength training and more.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact">
        <h2>FIT<span>ZONE</span></h2>
        <p>Train Hard. Stay Strong. Live Better.</p>
        <p>© 2026 FitZone. All rights reserved.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manage-classes" element={<ManageClasses />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
