import React, { useState } from 'react';
import { Droplet, Thermometer, Sun, DollarSign, Leaf, Edit2, Gift } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const MainInterface = () => {
  const [activeTab, setActiveTab] = useState('live');
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [showNameEdit, setShowNameEdit] = useState(false);
  const [coins, setCoins] = useState(100);
  
  const [plants, setPlants] = useState([
    { id: 'T001', name: 'טומי העגבנייה', type: 'עגבנייה', age: 25, health: 80 },
    { id: 'C002', name: 'צ׳ארלי המלפפון', type: 'מלפפון', age: 18, health: 90 },
    { id: 'S003', name: 'סטרוברי', type: 'תות שדה', age: 30, health: 75 },
  ]);

  const growthData = [
    { name: 'יום 1', גובה: 2 },
    { name: 'יום 3', גובה: 3 },
    { name: 'יום 5', גובה: 4.5 },
    { name: 'יום 7', גובה: 6 },
  ];

  const handleNameChange = (newName) => {
    setPlants(plants.map(p => 
      p.id === selectedPlant.id ? { ...p, name: newName } : p
    ));
    setSelectedPlant({ ...selectedPlant, name: newName });
    setShowNameEdit(false);
  };

  const handleAction = (action, cost) => {
    if (coins >= cost) {
      setCoins(coins - cost);
      setPlants(plants.map(p => 
        p.id === selectedPlant.id ? { ...p, health: Math.min(p.health + 10, 100) } : p
      ));
      // בדיקה אם הצמח הגיע ל-100% בריאות ומתן בונוס
      if (selectedPlant.health + 10 >= 100) {
        setCoins(coins + 50);
        alert('מזל טוב! קיבלת בונוס של 50 מטבעות על גידול מושלם!');
      }
    } else {
      alert('אין מספיק מטבעות');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-green-50">
      <header className="bg-green-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">החממה החיה שלי</h1>
        <div className="flex items-center space-x-4">
          <span><DollarSign className="inline" /> {coins} מטבעות</span>
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
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-2">
                {showNameEdit ? (
                  <input 
                    type="text" 
                    value={selectedPlant.name}
                    onChange={(e) => setSelectedPlant({...selectedPlant, name: e.target.value})}
                    onBlur={() => handleNameChange(selectedPlant.name)}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  selectedPlant.name
                )}
              </h2>
              <button onClick={() => setShowNameEdit(!showNameEdit)} className="text-blue-500">
                <Edit2 size={20} />
              </button>
            </div>
            <p>סוג: {selectedPlant.type}</p>
            <p>גיל: {selectedPlant.age} ימים</p>
            <p>בריאות: {selectedPlant.health}%</p>
            <div className="mt-4">
              <button onClick={() => handleAction('water', 5)} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                השקיה (5 מטבעות)
              </button>
              <button onClick={() => handleAction('fertilize', 10)} className="bg-green-500 text-white px-4 py-2 rounded">
                דישון (10 מטבעות)
              </button>
            </div>
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
                <h2 className="text-xl font-semibold mb-2">בונוסים</h2>
                <div className="flex items-center space-x-2 mb-2">
                  <Gift className="text-purple-500" />
                  <span>גידול מושלם: 50 מטבעות</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Gift className="text-yellow-500" />
                  <span>יבול שיא: 100 מטבעות</span>
                </div>
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
          </>
        )}
      </main>
    </div>
  );
};

export default MainInterface;
