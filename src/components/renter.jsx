import { useState } from 'react';

export default function RenterForm() {
  const [renters, setRenters] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: "",
    tehsil: "",
    city: "",
    hours: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setRenters([...renters, { ...formData, id: Date.now() }]);
      setFormData({ name: "", phone: "", district: "", tehsil: "", city: "", hours: "" });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 bg-gray-50 p-6 rounded-xl shadow">
        <h3 className="text-xl font-bold text-green-700 mb-4">مشینری لینے والے کسان کی تفصیلات</h3>
        <input className="w-full border p-2 rounded" placeholder="کسان کا نام" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
        <input className="w-full border p-2 rounded" placeholder="موبائل نمبر" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
        <div className="grid grid-cols-2 gap-2">
          <input className="border p-2 rounded" placeholder="ضلع" value={formData.district} onChange={e => setFormData({ ...formData, district: e.target.value })} />
          <input className="border p-2 rounded" placeholder="تحصیل" value={formData.tehsil} onChange={e => setFormData({ ...formData, tehsil: e.target.value })} />
          <input className="border p-2 rounded col-span-2" placeholder="شہر" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} />
        </div>
        <input className="w-full border p-2 rounded" placeholder="کتنے گھنٹوں کے لیے چاہیے؟" value={formData.hours} onChange={e => setFormData({ ...formData, hours: e.target.value })} />

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded mt-4 hover:bg-green-700">اب رجسٹر کریں</button>
      </form>

      {/* Show Renter Entries */}
      <div className="mt-6 max-w-xl mx-auto space-y-3">
        {renters.map((renter) => (
          <div key={renter.id} className="p-4 bg-white rounded shadow border">
            <p><strong>نام:</strong> {renter.name}</p>
            <p><strong>فون:</strong> {renter.phone}</p>
            <p><strong>ضلع:</strong> {renter.district}</p>
            <p><strong>تحصیل:</strong> {renter.tehsil}</p>
            <p><strong>شہر:</strong> {renter.city}</p>
            <p><strong>مشینری چاہیے:</strong> {renter.hours} گھنٹے کے لیے</p>
          </div>
        ))}
      </div>
    </div>
  );
}

