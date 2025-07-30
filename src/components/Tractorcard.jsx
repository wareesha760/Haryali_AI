import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function TractorCard({ title, catClass, specs }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [type, setType] = useState("Self Pickup");
  const navigate = useNavigate();

  const handleOrder = async () => {
  const token = localStorage.getItem("token"); // get auth token

  if (!token) {
    toast.error("⚠️ براہ کرم لاگ ان کریں");
    navigate("/login");
    return;
  }

  const newOrder = {
    title,
    catClass,
    location,
    start,
    end,
    type,
  };

  try {
    const response = await fetch("http://localhost:5001/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // send token for authentication
      },
      body: JSON.stringify(newOrder),
    });

    if (!response.ok) {
      throw new Error("آرڈر محفوظ نہیں ہو سکا");
    }

    toast.success("✅ ایک آرڈر موصول ہو گیا ہے");

    // Reset and close modal
    setIsModalOpen(false);
    setLocation("");
    setStart("");
    setEnd("");
    setType("Self Pickup");

    // Redirect to orders page
    navigate("/orders");
  } catch (err) {
    console.error(err);
    toast.error("❌ آرڈر بھیجنے میں مسئلہ پیش آیا");
  }
};

  return (
    <>
      <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-2">
          <p className="text-sm text-gray-500">CAT CLASS: {catClass}</p>
          <h3 className="text-xl font-bold text-green-700">{title}</h3>
          <ul className="list-disc ml-5 text-sm text-gray-600">
            {specs.map((spec, i) => (
              <li key={i}>{spec}</li>
            ))}
          </ul>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-green-600 mt-2 text-sm underline"
          >
            کرایہ اور دستیابی دیکھیں
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg space-y-4 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg"
            >
              ✖
            </button>
            <h2 className="text-lg font-bold text-green-700">
              {title} - کرایہ کی تفصیل
            </h2>

            <div>
              <label className="block text-sm font-medium mb-1">کرایہ کی جگہ</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border px-3 py-2 rounded text-sm"
              />
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">شروع ہونے کی تاریخ</label>
                <input
                  type="date"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="w-full border px-3 py-2 rounded text-sm"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">ختم ہونے کی تاریخ</label>
                <input
                  type="date"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  className="w-full border px-3 py-2 rounded text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">فراہم کرنے کا طریقہ</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border px-3 py-2 rounded text-sm"
              >
                <option>Self Pickup</option>
                <option>Home Delivery</option>
              </select>
            </div>

            <div className="text-right">
              <button
                onClick={handleOrder}
                className="bg-green-600 text-white text-sm px-4 py-2 rounded hover:bg-green-700"
              >
                آرڈر کریں
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
