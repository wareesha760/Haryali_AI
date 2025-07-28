import { useState } from 'react';

export default function OwnerForm() {
  const [owners, setOwners] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: "",
    tehsil: "",
    city: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setOwners([...owners, { ...formData, id: Date.now() }]);
      setFormData({ name: "", phone: "", district: "", tehsil: "", city: "" });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 bg-gray-50 p-6 rounded-xl shadow">
        <h3 className="text-xl font-bold text-green-700 mb-4">تفصیلات مالک مشینری</h3>
        <input className="w-full border p-2 rounded" placeholder="کسان کا نام" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        <input className="w-full border p-2 rounded" placeholder="موبائل نمبر" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
        <input className="w-full border p-2 rounded" placeholder="مشین کا نام" value={formData.machinename} onChange={e => setFormData({...formData, machinename: e.target.value})} />
        <input className="w-full border p-2 rounded" placeholder="مشین ماڈل" value={formData.machinemodel} onChange={e => setFormData({...formData, machinemodel: e.target.value})} />
        <div className="grid grid-cols-2 gap-2">
          <input className="border p-2 rounded col-span-2" placeholder="شہر" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
        </div>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded mt-4 hover:bg-green-700">اب رجسٹر کریں</button>
      </form>

      {/* Show Owner Entries */}
      <div className="mt-6 max-w-xl mx-auto space-y-3">
        {owners.map((owner) => (
          <div key={owner.id} className="p-4 bg-white rounded shadow border">
            <p><strong>نام:</strong> {owner.name}</p>
            <p><strong>فون:</strong> {owner.phone}</p>
            <p><strong>مشین کا نام:</strong> {owner.machinename}</p>
            <p><strong>مشین ماڈل</strong> {owner.machinemodel}</p>


            
            <p><strong>شہر:</strong> {owner.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

