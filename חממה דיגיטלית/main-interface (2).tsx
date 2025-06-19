import React, { useState } from 'react';
import { Droplet, Thermometer, Sun, DollarSign, Zap, Leaf } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const MainInterface = () => {
  const [activeTab, setActiveTab] = useState('live');
  const [selectedPlant, setSelectedPlant] = useState(null);
  
  const plants = [
    { id: 'T001', name: 'טומי העגבנייה', type: 'עגבנייה', age: 25 },
    { id: 'C002', name: 'צ׳ארלי המלפפון', type: 'מלפפון', age: 18 },
    { id: 'S003', name: 'סטרוברי', type: 'תות שדה', age: 30 },
  ];

  const growthData = [
    { name: 'יום 1', גובה: 2 },
    { name: 'יום 3', גובה: 3 },
    { name: 'יום 5', גובה: 4.5 },
    { name: 'יום 7', גובה: 6 },
  ];

  return (
    <div className="flex flex-col h-screen bg-green-50">
      <header className="bg-green-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">החממה החיה שלי</h1>
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 rounded ${activeTab === 'live' ? 'bg-white text-green-600' : 'bg-green-700'}`}
            onClick={() => setActiveTab('live')}
          >
            שידור חי
          </button>
          <button 
            className={`px-3 py-1 rounded ${activeTab === 'stats' ? 'bg-white text-green-600' : 'bg-green-700'}`}
            onClick={() => setActiveTab('stats')}
          >
            סטטיסטיקות
          </button>
        </div>
      </header>
      
      <main className="flex-grow p-4 overflow-y-auto">
        <div className="bg-white rounded-lg shadow mb-4 p-4">
          <h2 className="text-xl font-semibold mb-2">הצמחים שלי</h2>
          <div className="flex space-x-4">
            {plants.map(plant => (
              <button
                key={plant.id}
                className={`flex items-center space-x-2 p-2 rounded ${selectedPlant?.id === plant.id ? 'bg-green-200' : 'bg-gray-100'}`}
                onClick={() => setSelectedPlant(plant)}
              >
                <Leaf className="text-green-600" />
                <span>{plant.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        {selectedPlant && (
          <div className="bg-white rounded-lg shadow mb-4 p-4">
            <h2 className="text-xl font-semibold mb-2">{selectedPlant.name}</h2>
            <p>סוג: {selectedPlant.type}</p>
            <p>גיל: {selectedPlant.age} ימים</p>
          </div>
        )}

        {activeTab === 'live' ? (
          <>
            <div className="bg-black rounded-lg shadow mb-4 aspect-video flex items-center justify-center">
              <span className="text-white">שידור חי מהחממה</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-semibold mb-2">מצב נוכחי</h2>
                <div className="flex items-center space-x-2 mb-2">
                  <Droplet className="text-blue-500" />
                  <span>לחות: 60%</span>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <Thermometer className="text-red-500" />
                  <span>טמפרטורה: 22°C</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sun className="text-yellow-500" />
                  <span>אור: 70%</span>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-semibold mb-2">פעולות</h2>
                <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2 mb-2">השקיה</button>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 mb-2">תאורה</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded">אוורור</button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <h2 className="text-xl font-semibold mb-2">נתוני צמיחה</h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={growthData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="גובה" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-semibold mb-2">נתונים כלכליים</h2>
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="text-green-500" />
                  <span>הכנסה צפויה: ₪500</span>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="text-yellow-500" />
                  <span>עלויות תפעול: ₪100</span>
                </div>
                <div className="font-bold">
                  רווח צפוי: ₪400
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-semibold mb-2">תחזית יבול</h2>
                <p>צפי לקציר: עוד 14 ימים</p>
                <p>כמות משוערת: 5 ק"ג</p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default MainInterface;
