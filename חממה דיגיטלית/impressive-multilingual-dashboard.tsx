import React, { useState, useEffect } from 'react';

const translations = {
  he: {
    title: "הגן החכם שלי",
    dashboard: "לוח בקרה",
    communities: "קהילות",
    marketplace: "שוק",
    profile: "פרופיל",
    settings: "הגדרות",
    points: "נקודות ירוקות",
    liveView: "שידור חי",
    stopLiveView: "הפסק שידור חי",
    health: "בריאות",
    water: "השקיה",
    fertilize: "דישון",
    myPlants: "הצמחים שלי"
  },
  en: {
    title: "My Smart Garden",
    dashboard: "Dashboard",
    communities: "Communities",
    marketplace: "Marketplace",
    profile: "Profile",
    settings: "Settings",
    points: "Green Points",
    liveView: "Live View",
    stopLiveView: "Stop Live View",
    health: "Health",
    water: "Water",
    fertilize: "Fertilize",
    myPlants: "My Plants"
  },
  ru: {
    title: "Мой умный сад",
    dashboard: "Панель управления",
    communities: "Сообщества",
    marketplace: "Маркет",
    profile: "Профиль",
    settings: "Настройки",
    points: "Зеленые очки",
    liveView: "Прямой эфир",
    stopLiveView: "Остановить эфир",
    health: "Здоровье",
    water: "Полив",
    fertilize: "Удобрение",
    myPlants: "Мои растения"
  }
};

const ImpressiveDashboard = () => {
  const [language, setLanguage] = useState('he');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isLiveViewActive, setIsLiveViewActive] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);

  const t = translations[language];

  const plants = [
    { id: 'tomato', name: 'Cherry Tomatoes', health: 85, image: '🍅' },
    { id: 'basil', name: 'Basil', health: 92, image: '🌿' },
    { id: 'mint', name: 'Mint', health: 78, image: '🍃' },
    { id: 'oregano', name: 'Oregano', health: 88, image: '🌱' }
  ];

  const menuItems = [
    { key: 'dashboard', icon: '📊' },
    { key: 'communities', icon: '👥' },
    { key: 'marketplace', icon: '🛒' },
    { key: 'profile', icon: '👤' },
    { key: 'settings', icon: '⚙️' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationProgress((prev) => (prev + 1) % 101);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-100 to-blue-100" dir={language === 'he' ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <div className={`w-64 bg-white shadow-lg transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-30 md:relative md:translate-x-0`}>
        <div className="p-4">
          <h1 className="text-2xl font-bold text-green-800">{t.title}</h1>
        </div>
        <nav className="mt-8">
          <ul className="space-y-2">
            {menuItems.map(item => (
              <li key={item.key}>
                <button className="flex items-center w-full p-2 text-gray-600 hover:bg-green-50 transition-colors duration-200">
                  <span className="text-2xl mr-3">{item.icon}</span>
                  <span>{t[item.key]}</span>
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
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl">
              ☰
            </button>
            <h2 className="text-2xl font-semibold text-gray-800">{t.dashboard}</h2>
            <div className="flex items-center space-x-4">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                1000 {t.points}
              </span>
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white border border-gray-300 rounded-md text-gray-700 py-1 px-3"
              >
                <option value="he">עברית</option>
                <option value="en">English</option>
                <option value="ru">Русский</option>
              </select>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-green-800">{t.myPlants}</h2>
              <button 
                onClick={() => setIsLiveViewActive(!isLiveViewActive)}
                className={`px-4 py-2 rounded-full transition-colors duration-300 ${isLiveViewActive ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
              >
                {isLiveViewActive ? t.stopLiveView : t.liveView}
              </button>
            </div>
            
            {isLiveViewActive ? (
              <div className="bg-black rounded-lg aspect-video flex items-center justify-center mb-4 relative overflow-hidden">
                <span className="text-white text-lg z-10">{t.liveView}</span>
                <div 
                  className="absolute top-0 left-0 h-1 bg-green-500 transition-all duration-300 ease-linear"
                  style={{ width: `${animationProgress}%` }}
                ></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {plants.map(plant => (
                  <div 
                    key={plant.id}
                    className="bg-green-50 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md"
                    onClick={() => setSelectedPlant(plant)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{plant.name}</h3>
                      <span className="text-4xl">{plant.image}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${plant.health}%` }}></div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{t.health}: {plant.health}%</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {selectedPlant && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{selectedPlant.name}</h3>
              <p className="mb-4">{t.health}: {selectedPlant.health}%</p>
              <div className="flex space-x-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
                  {t.water}
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300">
                  {t.fertilize}
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ImpressiveDashboard;
