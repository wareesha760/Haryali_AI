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
import OrdersListPage from "./pages/OrdersListPage";
import ShopOrdersPage from "./pages/ShopOrdersPage";
import FertilizerCalculator from "./pages/FertilizerCalculator";
import ExpertCards from "./components/ExpertCards";
import AppointmentsPage from "./pages/AppointmentsPage";
import Shop from "./pages/shop";
import Pricing from "./pages/Pricing";
import VoiceChatCard from "./components/VoiceChatCard";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SmartCropPlanner from "./pages/SmartCropPlanner";
import SignupPage from "./pages/Signup";
import OrderPage from "./pages/OrderPage";
import AddTractor from "./pages/AddTractor";
import AddProduct from "./pages/AddProduct";
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
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ 
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >


        <div className="bg-opacity-80 min-h-screen">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/tractor" element={<TractorsPage />} />
            <Route path="/add-tractor" element={<AddTractor />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders-list" element={<OrdersListPage />} />
            <Route path="/shop-orders" element={<ShopOrdersPage />} />
            <Route path="/fertilizer" element={<FertilizerCalculator />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/planner" element={<SmartCropPlanner />} />
            <Route path="/smart-crop-planner" element={<SmartCropPlanner />} />
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
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/voice" element={<VoiceChatCard />} />

          </Routes>

          <Footer />
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  );
}

export default App;