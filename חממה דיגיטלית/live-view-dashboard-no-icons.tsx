import React, { useState } from 'react';

const Dashboard = () => {
  const [isLiveViewActive, setIsLiveViewActive] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);

  const plants = [
    { id: 'tomato', name: 'עגבניות שרי', health: 85 },
    { id: 'basil', name: 'בזיליקום', health: 92 },
    { id: 'mint', name: 'נענע', health: 78 },
    { id: 'oregano', name: 'אורגנו', health: 88 }
  ];

  const menuItems = [
    { label: 'לוח בקרה' },
    { label: 'קהילות' },
    { label: 'שוק' },
    { label: 'פרופיל' },
    { label: 'הגדרות' },
  ];

  return (
    <div className="flex h-screen bg-gray-100" dir="rtl">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-green-800">הגן החכם שלי</h1>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            {menuItems.map(item => (
              <li key={item.label}>
                <button className="flex items-center w-full p-2 text-gray-600 hover:bg-gray-100">
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-green-600 text-white p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">לוח בקרה</h2>
            <div className="flex items-center space-x-4">
              <span className="bg-white text-green-800 px-3 py-1 rounded-full flex items-center">
                1000 נקודות ירוקות
              </span>
              <button className="relative p-2">
                התראות
                <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-xs text-white text-center">
                  3
                </span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-green-800">הצמחים שלי</h2>
              <button 
                onClick={() => setIsLiveViewActive(!isLiveViewActive)}
                className={`px-4 py-2 rounded-full transition-colors ${isLiveViewActive ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
              >
                {isLiveViewActive ? 'הפסק שידור חי' : 'הפעל שידור חי'}
              </button>
            </div>
            
            {isLiveViewActive ? (
              <div className="bg-black rounded-lg aspect-video flex items-center justify-center mb-4">
                <span className="text-white text-lg">שידור חי מהחממה</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {plants.map(plant => (
                  <div 
                    key={plant.id}
                    className="bg-green-50 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md"
                    onClick={() => setSelectedPlant(plant)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{plant.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-sm ${plant.health > 80 ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                        {plant.health}%
                      </span>
                    </div>
                    <div className="w-full h-32 bg-green-200 rounded-lg flex items-center justify-center">
                      תמונת {plant.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {selectedPlant && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">{selectedPlant.name}</h3>
                <p>בריאות: {selectedPlant.health}%</p>
                <div className="mt-2 flex space-x-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
                    השקיה
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300">
                    דישון
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
