import React, { useState } from 'react';
import { Droplet, Thermometer, Sun, DollarSign, Leaf, Edit2, Gift, Users, ShoppingBasket, Zap, MessageCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const MainInterface = () => {
  const [activeTab, setActiveTab] = useState('live');
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [showNameEdit, setShowNameEdit] = useState(false);
  const [coins, setCoins] = useState(100);
  const [showAIAdvice, setShowAIAdvice] = useState(false);
  
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
        <h1 className="text-2xl font-bold">החממה החכמה שלי</h1>
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
            <button 
              className={`px-3 py-1 rounded ${activeTab === 'community' ? 'bg-white text-green-600' : 'bg-green-700'}`}
              onClick={() => setActiveTab('community')}
            >
              קהילה
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow p-4 overflow-y-auto">
        {activeTab === 'live' && (
          <>
            <div className="bg-white rounded-lg shadow mb-4 p-4">
              <h2 className="text-xl font-semibold mb-2">מבט על החממה</h2>
              <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center mb-4">
                <span>תצוגת 360° של החממה</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {plants.map(plant => (
                  <div key={plant.id} className="bg-green-100 p-4 rounded-lg">
                    <h3 className="font-semibold">{plant.name}</h3>
                    <p>בריאות: {plant.health}%</p>
                    <button onClick={() => setSelectedPlant(plant)} className="mt-2 bg-green-500 text-white px-3 py-1 rounded">
                      פרטים
                    </button>
                  </div>
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
                <div className="mt-4 flex space-x-2">
                  <button onClick={() => handleAction('water', 5)} className="bg-blue-500 text-white px-4 py-2 rounded">
                    השקיה (5 מטבעות)
                  </button>
                  <button onClick={() => handleAction('fertilize', 10)} className="bg-green-500 text-white px-4 py-2 rounded">
                    דישון (10 מטבעות)
                  </button>
                  <button onClick={() => setShowAIAdvice(!showAIAdvice)} className="bg-purple-500 text-white px-4 py-2 rounded">
                    ייעוץ AI
                  </button>
                </div>
                {showAIAdvice && (
                  <div className="mt-4 bg-purple-100 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">המלצות AI:</h3>
                    <p>לפי הנתונים, {selectedPlant.name} זקוק להשקיה נוספת ולחשיפה לאור שמש. נסה להזיז את העציץ למקום מואר יותר.</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
        
        {activeTab === 'stats' && (
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
        )}
        
        {activeTab === 'community' && (
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <h2 className="text-xl font-semibold mb-4">קהילת המגדלים</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-100 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">החלפת סחורה</h3>
                <p>החלף תוצרת עם מגדלים אחרים לגיוון הסל שלך!</p>
                <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">מצא שותפים להחלפה</button>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">סל פירות וירקות שבועי</h3>
                <p>קבל סל מגוון מתוצרת הקהילה</p>
                <button className="mt-2 bg-green-500 text-white px-3 py-1 rounded">הזמן סל</button>
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">פורום מגדלים</h3>
                <p>שתף טיפים וקבל עצות ממגדלים אחרים</p>
                <button className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded">הצטרף לדיון</button>
              </div>
              <div className="bg-red-100 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">אתגר שבועי</h3>
                <p>השתתף באתגר הגידול השבועי וזכה בפרסים!</p>
                <button className="mt-2 bg-red-500 text-white px-3 py-1 rounded">הצטרף לאתגר</button>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-green-800 text-white p-2 flex justify-around">
        <button className="flex items-center"><Users size={20} className="mr-1" /> קהילה</button>
        <button className="flex items-center"><ShoppingBasket size={20} className="mr-1" /> שוק</button>
        <button className="flex items-center"><Zap size={20} className="mr-1" /> משימות</button>
        <button className="flex items-center"><MessageCircle size={20} className="mr-1" /> צ'אט AI</button>
      </footer>
    </div>
  );
};

export default MainInterface;
