import React, { useState, useEffect } from 'react';

const SmartAgriculturePlatform = () => {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [language, setLanguage] = useState('he');
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isLiveViewActive, setIsLiveViewActive] = useState(false);
  const [userCoins, setUserCoins] = useState(1000);
  const [marketPrices, setMarketPrices] = useState({});

  const t = getTranslations(language);

  const plants = [
    { id: 'tomato', name: t.cherryTomatoes, health: 85, growth: 70, productionCost: 30, marketPrice: 80 },
    { id: 'basil', name: t.basil, health: 92, growth: 85, productionCost: 20, marketPrice: 50 },
    { id: 'mint', name: t.mint, health: 78, growth: 60, productionCost: 15, marketPrice: 40 },
    { id: 'oregano', name: t.oregano, health: 88, growth: 75, productionCost: 25, marketPrice: 60 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      updatePlants();
      updateMarketPrices();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const updatePlants = () => {
    // Simulate plant growth and health changes
  };

  const updateMarketPrices = () => {
    const newPrices = {};
    plants.forEach(plant => {
      newPrices[plant.id] = Math.floor(plant.marketPrice * (0.9 + Math.random() * 0.2));
    });
    setMarketPrices(newPrices);
  };

  const handlePlantAction = (action, cost) => {
    if (userCoins >= cost) {
      setUserCoins(prev => prev - cost);
      setSelectedPlant(prev => ({
        ...prev,
        health: Math.min(prev.health + 10, 100)
      }));
    } else {
      alert(t.notEnoughCoins);
    }
  };

  const renderDashboard = () => (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{t.myPlants}</h2>
      <div className="grid grid-cols-2 gap-4">
        {plants.map(plant => (
          <div 
            key={plant.id}
            className="bg-white p-4 rounded shadow cursor-pointer"
            onClick={() => {
              setSelectedPlant(plant);
              setCurrentScreen('plantDetails');
            }}
          >
            <h3 className="font-semibold">{plant.name}</h3>
            <p>{t.health}: {plant.health}%</p>
            <p>{t.growth}: {plant.growth}%</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPlantDetails = () => {
    if (!selectedPlant) return null;
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">{selectedPlant.name}</h2>
        <div className="bg-white p-4 rounded shadow mb-4">
          <p>{t.health}: {selectedPlant.health}%</p>
          <p>{t.growth}: {selectedPlant.growth}%</p>
          <button 
            onClick={() => handlePlantAction('water', 5)}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2 mr-2"
          >
            {t.water} (5 {t.coins})
          </button>
          <button 
            onClick={() => handlePlantAction('fertilize', 10)}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
          >
            {t.fertilize} (10 {t.coins})
          </button>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">{t.economicOverview}</h3>
          <p>{t.productionCost}: {selectedPlant.productionCost} {t.coins}</p>
          <p>{t.marketPrice}: {marketPrices[selectedPlant.id] || selectedPlant.marketPrice} {t.coins}</p>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (currentScreen) {
      case 'dashboard': return renderDashboard();
      case 'plantDetails': return renderPlantDetails();
      default: return renderDashboard();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100" dir={language === 'he' ? 'rtl' : 'ltr'}>
      <header className="bg-green-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t.smartGarden}</h1>
        <div className="flex items-center space-x-4">
          <span className="bg-green-700 px-3 py-1 rounded-full text-sm">
            {userCoins} {t.coins}
          </span>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-green-700 text-white rounded px-2 py-1"
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
          <button onClick={() => setCurrentScreen('dashboard')}>{t.home}</button>
          <button onClick={() => setCurrentScreen('market')}>{t.market}</button>
          <button onClick={() => setIsLiveViewActive(!isLiveViewActive)}>
            {isLiveViewActive ? t.stopLiveView : t.startLiveView}
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
      cherryTomatoes: "עגבניות שרי",
      basil: "בזיליקום",
      mint: "נענע",
      oregano: "אורגנו",
      health: "בריאות",
      growth: "צמיחה",
      water: "השקיה",
      fertilize: "דישון",
      coins: "מטבעות",
      productionCost: "עלות ייצור",
      marketPrice: "מחיר שוק",
      economicOverview: "סקירה כלכלית",
      notEnoughCoins: "אין מספיק מטבעות",
      home: "בית",
      market: "שוק",
      startLiveView: "התחל שידור חי",
      stopLiveView: "הפסק שידור חי"
    },
    en: {
      smartGarden: "My Smart Garden",
      myPlants: "My Plants",
      cherryTomatoes: "Cherry Tomatoes",
      basil: "Basil",
      mint: "Mint",
      oregano: "Oregano",
      health: "Health",
      growth: "Growth",
      water: "Water",
      fertilize: "Fertilize",
      coins: "Coins",
      productionCost: "Production Cost",
      marketPrice: "Market Price",
      economicOverview: "Economic Overview",
      notEnoughCoins: "Not enough coins",
      home: "Home",
      market: "Market",
      startLiveView: "Start Live View",
      stopLiveView: "Stop Live View"
    },
    ru: {
      smartGarden: "Мой умный сад",
      myPlants: "Мои растения",
      cherryTomatoes: "Помидоры черри",
      basil: "Базилик",
      mint: "Мята",
      oregano: "Орегано",
      health: "Здоровье",
      growth: "Рост",
      water: "Полив",
      fertilize: "Удобрение",
      coins: "Монеты",
      productionCost: "Стоимость производства",
      marketPrice: "Рыночная цена",
      economicOverview: "Экономический обзор",
      notEnoughCoins: "Недостаточно монет",
      home: "Главная",
      market: "Рынок",
      startLiveView: "Начать трансляцию",
      stopLiveView: "Остановить трансляцию"
    }
  };
  return translations[lang];
};

export default SmartAgriculturePlatform;
