import React, { useState, useEffect } from 'react';
import { Droplet, Thermometer, Sun, Leaf, Wind, Zap, User, Users, Home, Settings, LogOut } from 'lucide-react';

const translations = {
  he: {
    title: "הגן החכם שלי",
    coins: "נקודות ירוקות",
    water: "השקיה",
    fertilize: "דישון",
    aiAdvice: "ייעוץ AI",
    plantHealth: "בריאות הצמח",
    temperature: "טמפרטורה",
    humidity: "לחות",
    light: "אור",
    co2: "רמת CO₂",
    myPlants: "הצמחים שלי",
    cherryTomato: "עגבניות שרי",
    basil: "בזיליקום",
    mint: "נענע",
    oregano: "אורגנו",
    growthStage: "שלב גדילה",
    login: "התחברות",
    register: "הרשמה",
    profile: "פרופיל",
    communities: "קהילות",
    marketplace: "שוק",
    settings: "הגדרות",
    logout: "התנתקות"
  },
  en: {
    title: "My Smart Garden",
    coins: "Green Points",
    water: "Water",
    fertilize: "Fertilize",
    aiAdvice: "AI Advice",
    plantHealth: "Plant Health",
    temperature: "Temperature",
    humidity: "Humidity",
    light: "Light",
    co2: "CO₂ Level",
    myPlants: "My Plants",
    cherryTomato: "Cherry Tomato",
    basil: "Basil",
    mint: "Mint",
    oregano: "Oregano",
    growthStage: "Growth Stage",
    login: "Login",
    register: "Register",
    profile: "Profile",
    communities: "Communities",
    marketplace: "Marketplace",
    settings: "Settings",
    logout: "Logout"
  },
  ru: {
    title: "Мой умный сад",
    coins: "Зеленые очки",
    water: "Полив",
    fertilize: "Удобрение",
    aiAdvice: "Совет ИИ",
    plantHealth: "Здоровье растения",
    temperature: "Температура",
    humidity: "Влажность",
    light: "Освещение",
    co2: "Уровень CO₂",
    myPlants: "Мои растения",
    cherryTomato: "Томаты черри",
    basil: "Базилик",
    mint: "Мята",
    oregano: "Орегано",
    growthStage: "Стадия роста",
    login: "Вход",
    register: "Регистрация",
    profile: "Профиль",
    communities: "Сообщества",
    marketplace: "Маркет",
    settings: "Настройки",
    logout: "Выход"
  }
};

const plants = [
  { id: 'tomato', name: 'cherryTomato', growthStage: 0 },
  { id: 'basil', name: 'basil', growthStage: 0 },
  { id: 'mint', name: 'mint', growthStage: 0 },
  { id: 'oregano', name: 'oregano', growthStage: 0 }
];

const growthStages = [
  "/api/placeholder/100/100",
  "/api/placeholder/100/100",
  "/api/placeholder/100/100",
  "/api/placeholder/100/100",
  "/api/placeholder/100/100"
];

const ComprehensiveEcoInterface = () => {
  const [language, setLanguage] = useState('he');
  const [coins, setCoins] = useState(100);
  const [selectedPlant, setSelectedPlant] = useState(plants[0]);
  const [plantList, setPlantList] = useState(plants);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('garden');
  
  const t = translations[language];

  useEffect(() => {
    const growthInterval = setInterval(() => {
      setPlantList(prevPlants => 
        prevPlants.map(plant => ({
          ...plant,
          growthStage: plant.growthStage < 4 ? plant.growthStage + 1 : 0
        }))
      );
    }, 5000);
    return () => clearInterval(growthInterval);
  }, []);

  const handleAction = (action, cost) => {
    if (coins >= cost) {
      setCoins(coins - cost);
      // Implement action effects here
    }
  };

  const handleLogin = () => {
    // Implement login logic here
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Implement logout logic here
    setIsLoggedIn(false);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-100 to-blue-100" dir={language === 'he' ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <div className="w-64 bg-green-800 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">{t.title}</h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <button onClick={() => setActiveTab('garden')} className="flex items-center space-x-2 hover:text-green-300">
                <Home /> <span>{t.myPlants}</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('communities')} className="flex items-center space-x-2 hover:text-green-300">
                <Users /> <span>{t.communities}</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('marketplace')} className="flex items-center space-x-2 hover:text-green-300">
                <Leaf /> <span>{t.marketplace}</span>
              </button>
            </li>
            {isLoggedIn && (
              <>
                <li>
                  <button onClick={() => setActiveTab('profile')} className="flex items-center space-x-2 hover:text-green-300">
                    <User /> <span>{t.profile}</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('settings')} className="flex items-center space-x-2 hover:text-green-300">
                    <Settings /> <span>{t.settings}</span>
                  </button>
                </li>
                <li>
                  <button onClick={handleLogout} className="flex items-center space-x-2 hover:text-green-300">
                    <LogOut /> <span>{t.logout}</span>
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <span className="bg-green-700 text-white px-3 py-1 rounded-full">
              <Leaf className="inline mr-1" /> {coins} {t.coins}
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
          {!isLoggedIn && (
            <div>
              <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2 rounded-full mr-2">{t.login}</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full">{t.register}</button>
            </div>
          )}
        </header>

        {activeTab === 'garden' && (
          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-1 bg-white rounded-xl shadow-lg p-4">
              <h2 className="text-xl font-semibold mb-4">{t.myPlants}</h2>
              <ul className="space-y-2">
                {plantList.map(plant => (
                  <li 
                    key={plant.id} 
                    className={`p-2 rounded-lg cursor-pointer ${selectedPlant.id === plant.id ? 'bg-green-200' : 'hover:bg-green-100'}`}
                    onClick={() => setSelectedPlant(plant)}
                  >
                    {t[plant.name]}
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 bg-white rounded-xl shadow-lg p-6 flex flex-col">
              <h2 className="text-2xl font-semibold mb-4">{t[selectedPlant.name]}</h2>
              <div className="flex-grow relative overflow-hidden rounded-xl bg-gradient-to-b from-blue-200 to-green-200 flex items-center justify-center">
                <img 
                  src={growthStages[selectedPlant.growthStage]} 
                  alt={`${t[selectedPlant.name]} - ${t.growthStage} ${selectedPlant.growthStage + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="mt-4 flex justify-around">
                <button onClick={() => handleAction('water', 5)} className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300">
                  <Droplet className="inline mr-2" /> {t.water}
                </button>
                <button onClick={() => handleAction('fertilize', 10)} className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300">
                  <Zap className="inline mr-2" /> {t.fertilize}
                </button>
                <button className="bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-purple-600 transition duration-300">
                  <Sun className="inline mr-2" /> {t.aiAdvice}
                </button>
              </div>
            </div>
            
            <div className="col-span-1 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">{t.plantHealth}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center"><Thermometer className="mr-2" /> {t.temperature}</span>
                  <span className="text-green-600">24°C</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center"><Droplet className="mr-2" /> {t.humidity}</span>
                  <span className="text-blue-600">65%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center"><Sun className="mr-2" /> {t.light}</span>
                  <span className="text-yellow-600">80%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center"><Wind className="mr-2" /> {t.co2}</span>
                  <span className="text-gray-600">450 ppm</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'communities' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">{t.communities}</h2>
            {/* Add community content here */}
          </div>
        )}

        {activeTab === 'marketplace' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">{t.marketplace}</h2>
            {/* Add marketplace content here */}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">{t.profile}</h2>
            {/* Add profile content here */}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">{t.settings}</h2>
            {/* Add settings content here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComprehensiveEcoInterface;
