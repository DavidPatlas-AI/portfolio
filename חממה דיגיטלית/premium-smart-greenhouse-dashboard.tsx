import React, { useState, useEffect } from 'react';

const PremiumDashboard = () => {
  const [isLiveViewActive, setIsLiveViewActive] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  const plants = [
    { id: 'tomato', name: 'עגבניות שרי', health: 85, growth: 70 },
    { id: 'basil', name: 'בזיליקום', health: 92, growth: 85 },
    { id: 'mint', name: 'נענע', health: 78, growth: 60 },
    { id: 'oregano', name: 'אורגנו', health: 88, growth: 75 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationProgress((prev) => (prev + 1) % 101);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { label: 'לוח בקרה', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { label: 'קהילות', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { label: 'שוק', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
    { label: 'פרופיל', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { label: 'הגדרות', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-50 to-blue-50" dir="rtl">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-green-800">הגן החכם שלי</h1>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            {menuItems.map(item => (
              <li key={item.label}>
                <button className="flex items-center w-full p-2 text-gray-600 hover:bg-green-50 transition-colors duration-200">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">לוח בקרה</h2>
            <div className="flex items-center space-x-4">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                1000 נקודות ירוקות
              </span>
              <button className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-xs text-white text-center">
                  3
                </span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-green-800">הצמחים שלי</h2>
              <button 
                onClick={() => setIsLiveViewActive(!isLiveViewActive)}
                className={`px-4 py-2 rounded-full transition-colors duration-300 ${isLiveViewActive ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
              >
                {isLiveViewActive ? 'הפסק שידור חי' : 'הפעל שידור חי'}
              </button>
            </div>
            
            {isLiveViewActive ? (
              <div className="bg-black rounded-lg aspect-video flex items-center justify-center mb-4 relative overflow-hidden">
                <span className="text-white text-lg z-10">שידור חי מהחממה</span>
                <div 
                  className="absolute top-0 left-0 w-full h-1 bg-green-500"
                  style={{ width: `${animationProgress}%` }}
                ></div>
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
                    <div className="w-full h-32 bg-gradient-to-br from-green-200 to-green-300 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <span className="text-green-800 font-semibold z-10">תמונת {plant.name}</span>
                      <div 
                        className="absolute bottom-0 left-0 w-full bg-green-500 transition-all duration-1000"
                        style={{ height: `${plant.growth}%` }}
                      ></div>
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
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    השקיה
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
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

export default PremiumDashboard;
