import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Home from "./pages/landing";
import Weather from "./pages/weather";
import TractorsPage from "./pages/tractor";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrdersPage from "./pages/OrdersPage";
import FertilizerCalculator from "./pages/FertilizerCalculator";
import ExpertCards from "./components/ExpertCards";
import AppointmentsPage from "./pages/AppointmentsPage";
import Shop from "./pages/shop";
import Pricing from "./pages/Pricing";
import VoiceChatCard from "./components/VoiceChatCard";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SmartPlanner from "./pages/SmartPlanner";
import SignupPage from "./pages/Signup";

// ✅ Correct path if assets folder is inside src
import bgImage from "./assets/bg5.jpg";

function App() {
  const [appointments, setAppointments] = useState([]);

  const handleBookAppointment = (newAppointment) => {
    setAppointments((prev) => [...prev, newAppointment]);
  };

  return (
    <AuthProvider>
      {/* ✅ Correct background image usage */}
      <div
        className="min-h-screen bg-fixed bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="bg-opacity-80 min-h-screen">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/tractors" element={<TractorsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/fertilizer" element={<FertilizerCalculator />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/planner" element={<SmartPlanner />} />
            <Route
              path="/advisor"
              element={
                <ExpertCards
                  onBookAppointment={handleBookAppointment}
                  appointments={appointments}
                />
              }
            />
            <Route
              path="/appointments"
              element={<AppointmentsPage appointments={appointments} />}
            />
            <Route path="/voice" element={<VoiceChatCard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>

          <Footer />
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  );
}

export default App;
