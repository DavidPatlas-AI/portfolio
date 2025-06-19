import React, { useState, useEffect } from 'react';

const SmartAgriculturePlatform = () => {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [language, setLanguage] = useState('he');
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isLiveViewActive, setIsLiveViewActive] = useState(false);
  const [virtualResources, setVirtualResources] = useState({ water: 100, fertilizer: 50, solarEnergy: 75 });
  const [userCoins, setUserCoins] = useState(1000);

  const t = getTranslations(language);

  const plants = [
    { id: 'tomato', name: t.cherryTomatoes, health: 85, growth: 70, lastWatered: '2023-06-10', lastFertilized: '2023-06-05', lightExposure: 80 },
    { id: 'basil', name: t.basil, health: 92, growth: 85, lastWatered: '2023-06-11', lastFertilized: '2023-06-07', lightExposure: 75 },
    { id: 'mint', name: t.mint, health: 78, growth: 60, lastWatered: '2023-06-09', lastFertilized: '2023-06-04', lightExposure: 70 },
    { id: 'oregano', name: t.oregano, health: 88, growth: 75, lastWatered: '2023-06-10', lastFertilized: '2023-06-06', lightExposure: 85 }
  ];

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setPlants(prevPlants => prevPlants.map(plant => ({
        ...plant,
        growth: Math.min(plant.growth + 1, 100),
        health: Math.max(plant.health - 0.5, 0)
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderDashboard = () => (
    <div className="p-4 bg-green-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-green-800">{t.myPlants}</h2>
        <button 
          onClick={() => setCurrentScreen('newPlant')}
          className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300 flex items-center"
        >
          + {t.addNewPlant}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {plants.map(plant => (
          <div 
            key={plant.id}
            className="bg-white rounded-lg p-4 shadow-md cursor-pointer transition-all hover:shadow-lg"
            onClick={() => {
              setSelectedPlant(plant);
              setCurrentScreen('plantDetails');
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">{plant.name}</h3>
              <span className={`px-2 py-1 rounded-full text-sm ${plant.health > 80 ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                {plant.health}% {t.health}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${plant.growth}%` }}></div>
            </div>
            <p className="text-sm text-gray-600">{t.growth}: {plant.growth}%</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPlantDetails = () => {
    if (!selectedPlant) return null;
    return (
      <div className="p-4 bg-green-50">
        <h2 className="text-2xl font-bold text-green-800 mb-4">{selectedPlant.name}</h2>
        <div className="bg-white rounded-lg p-4 shadow-md mb-4">
          <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg mb-4">
            <div className="flex items-center justify-center text-white">
              {t.liveStreamPlaceholder}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex flex-col items-center">
              <span className="text-blue-500 text-2xl mb-2">💧</span>
              <p className="text-sm">{t.lastWatered}: {selectedPlant.lastWatered}</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-green-500 text-2xl mb-2">🌱</span>
              <p className="text-sm">{t.lastFertilized}: {selectedPlant.lastFertilized}</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-yellow-500 text-2xl mb-2">☀️</span>
              <p className="text-sm">{t.lightExposure}: {selectedPlant.lightExposure}%</p>
            </div>
          </div>
          <div className="flex justify-around">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
              {t.water}
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300">
              {t.fertilize}
            </button>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition duration-300">
              {t.adjustLight}
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h3 className="font-semibold text-lg mb-2">{t.economicOverview}</h3>
          <p>{t.growthCost}: 50 {t.coins}</p>
          <p>{t.potentialProfit}: 150 {t.coins}</p>
          <button className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition duration-300">
            {t.sellHarvest}
          </button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (currentScreen) {
      case 'dashboard':
        return renderDashboard();
      case 'plantDetails':
        return renderPlantDetails();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-green-100" dir={language === 'he' ? 'rtl' : 'ltr'}>
      <header className="bg-green-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t.smartGarden}</h1>
        <div className="flex items-center space-x-4">
          <span className="bg-green-700 px-3 py-1 rounded-full text-sm">
            {userCoins} {t.coins}
          </span>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-green-700 text-white rounded-full px-3 py-1"
          >
            <option value="he">עברית</option>
            <option value="en">English</option>
            <option value="ru">Русский</option>
          </select>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto">
        {renderContent()}
      </main>

      <footer className="bg-green-600 text-white p-2">
        <nav className="flex justify-around">
          <button onClick={() => setCurrentScreen('dashboard')} className="flex flex-col items-center">
            <span className="text-2xl">🏠</span>
            <span className="text-xs">{t.home}</span>
          </button>
          <button onClick={() => setCurrentScreen('market')} className="flex flex-col items-center">
            <span className="text-2xl">🛒</span>
            <span className="text-xs">{t.market}</span>
          </button>
          <button onClick={() => setCurrentScreen('liveView')} className="flex flex-col items-center">
            <span className="text-2xl">📹</span>
            <span className="text-xs">{t.liveView}</span>
          </button>
          <button onClick={() => setCurrentScreen('community')} className="flex flex-col items-center">
            <span className="text-2xl">👥</span>
            <span className="text-xs">{t.community}</span>
          </button>
          <button onClick={() => setCurrentScreen('settings')} className="flex flex-col items-center">
            <span className="text-2xl">⚙️</span>
            <span className="text-xs">{t.settings}</span>
          </button>
        </nav>
      </footer>
    </div>
  );
};

const getTranslations = (lang) => {
  const translations = {
    he: {
      smartGarden: "הגן החכם שלי",
      myPlants: "הצמחים שלי",
      addNewPlant: "הוסף צמח חדש",
      cherryTomatoes: "עגבניות שרי",
      basil: "בזיליקום",
      mint: "נענע",
      oregano: "אורגנו",
      health: "בריאות",
      growth: "צמיחה",
      water: "השקיה",
      fertilize: "דישון",
      adjustLight: "כוונון אור",
      lastWatered: "השקיה אחרונה",
      lastFertilized: "דישון אחרון",
      lightExposure: "חשיפה לאור",
      liveStreamPlaceholder: "שידור חי מהחממה",
      economicOverview: "סקירה כלכלית",
      growthCost: "עלות גידול",
      potentialProfit: "רווח פוטנציאלי",
      coins: "מטבעות",
      sellHarvest: "מכור את היבול",
      home: "בית",
      market: "שוק",
      liveView: "שידור חי",
      community: "קהילה",
      settings: "הגדרות"
    },
    en: {
      smartGarden: "My Smart Garden",
      myPlants: "My Plants",
      addNewPlant: "Add New Plant",
      cherryTomatoes: "Cherry Tomatoes",
      basil: "Basil",
      mint: "Mint",
      oregano: "Oregano",
      health: "Health",
      growth: "Growth",
      water: "Water",
      fertilize: "Fertilize",
      adjustLight: "Adjust Light",
      lastWatered: "Last Watered",
      lastFertilized: "Last Fertilized",
      lightExposure: "Light Exposure",
      liveStreamPlaceholder: "Live Stream from Greenhouse",
      economicOverview: "Economic Overview",
      growthCost: "Growth Cost",
      potentialProfit: "Potential Profit",
      coins: "Coins",
      sellHarvest: "Sell Harvest",
      home: "Home",
      market: "Market",
      liveView: "Live View",
      community: "Community",
      settings: "Settings"
    },
    ru: {
      smartGarden: "Мой умный сад",
      myPlants: "Мои растения",
      addNewPlant: "Добавить растение",
      cherryTomatoes: "Помидоры черри",
      basil: "Базилик",
      mint: "Мята",
      oregano: "Орегано",
      health: "Здоровье",
      growth: "Рост",
      water: "Полив",
      fertilize: "Удобрение",
      adjustLight: "Настройка света",
      lastWatered: "Последний полив",
      lastFertilized: "Последнее удобрение",
      lightExposure: "Освещение",
      liveStreamPlaceholder: "Прямая трансляция из теплицы",
      economicOverview: "Экономический обзор",
      growthCost: "Стоимость выращивания",
      potentialProfit: "Потенциальная прибыль",
      coins: "Монеты",
      sellHarvest: "Продать урожай",
      home: "Главная",
      market: "Рынок",
      liveView: "Трансляция",
      community: "Сообщество",
      settings: "Настройки"
    }
  };
  return translations[lang];
};

export default SmartAgriculturePlatform;
