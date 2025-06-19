import React, { useState } from 'react';

const SimplifiedDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isLiveViewActive, setIsLiveViewActive] = useState(false);

  const plants = [
    { id: 'tomato', name: 'עגבניות שרי', health: 85 },
    { id: 'basil', name: 'בזיליקום', health: 92 },
    { id: 'mint', name: 'נענע', health: 78 },
    { id: 'oregano', name: 'אורגנו', health: 88 }
  ];

  const menuItems = ['לוח בקרה', 'קהילות', 'שוק', 'פרופיל', 'הגדרות'];

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-green-600 text-white p-4 flex justify-between items-center">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl">
          ☰
        </button>
        <h1 className="text-xl font-bold">הגן החכם שלי</h1>
        <span className="bg-white text-green-800 px-2 py-1 rounded-full text-sm">
          1000 נקודות
        </span>
      </header>

      {/* Sidebar */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50">
          <div className="w-64 h-full bg-white p-4">
            <button onClick={() => setIsMenuOpen(false)} className="mb-4 text-xl">
              &times; סגור
            </button>
            <nav>
              <ul>
                {menuItems.map((item, index) => (
                  <li key={index} className="mb-2">
                    <button className="w-full text-right p-2 hover:bg-gray-200 rounded">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="mb-4">
          <button 
            onClick={() => setIsLiveViewActive(!isLiveViewActive)}
            className={`px-4 py-2 rounded ${isLiveViewActive ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
          >
            {isLiveViewActive ? 'הפסק שידור חי' : 'הפעל שידור חי'}
          </button>
        </div>

        {isLiveViewActive ? (
          <div className="bg-black text-white p-4 rounded mb-4 text-center">
            שידור חי מהחממה
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {plants.map(plant => (
              <div 
                key={plant.id}
                onClick={() => setSelectedPlant(plant)}
                className="bg-white p-4 rounded shadow cursor-pointer"
              >
                <h3 className="font-bold">{plant.name}</h3>
                <p>בריאות: {plant.health}%</p>
              </div>
            ))}
          </div>
        )}

        {selectedPlant && (
          <div className="mt-4 bg-white p-4 rounded shadow">
            <h3 className="font-bold mb-2">{selectedPlant.name}</h3>
            <p>בריאות: {selectedPlant.health}%</p>
            <div className="mt-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                השקיה
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded">
                דישון
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SimplifiedDashboard;
