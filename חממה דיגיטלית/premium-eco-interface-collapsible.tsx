import React, { useState, useEffect } from 'react';
import { Droplet, Thermometer, Sun, Leaf, Wind, Zap, User, Users, Home, Settings, LogOut, ShoppingCart, Bell, ChevronRight, Menu, X, Plus } from 'lucide-react';

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
    logout: "התנתקות",
    notifications: "התראות",
    dashboard: "לוח בקרה",
    tasks: "משימות",
    insights: "תובנות",
    addNewPlant: "הוסף צמח חדש"
  },
  // ... (other translations)
};

const plants = [
  { id: 'tomato', name: 'cherryTomato', growthStage: 0, health: 85 },
  { id: 'basil', name: 'basil', growthStage: 0, health: 92 },
  { id: 'mint', name: 'mint', growthStage: 0, health: 78 },
  { id: 'oregano', name: 'oregano', growthStage: 0, health: 88 }
];

const growthStages = [
  "/api/placeholder/100/100",
  "/api/placeholder/100/100",
  "/api/placeholder/100/100",
  "/api/placeholder/100/100",
  "/api/placeholder/100/100"
];

const PremiumEcoInterface = () => {
  const [language, setLanguage] = useState('he');
  const [coins, setCoins] = useState(1000);
  const [selectedPlant, setSelectedPlant] = useState(plants[0]);
  const [plantList, setPlantList] = useState(plants);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState(3);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const t = translations[language];

  useEffect(() => {
    const growthInterval = setInterval(() => {
      setPlantList(prevPlants => 
        prevPlants.map(plant => ({
          ...plant,
          growthStage: plant.growthStage < 4 ? plant.growthStage + 1 : 0,
          health: Math.min(plant.health + 1, 100)
        }))
      );
    }, 5000);
    return () => clearInterval(growthInterval);
  }, []);

  const handleAction = (action, cost) => {
    if (coins >= cost) {
      setCoins(coins - cost);
      setSelectedPlant(prev => ({
        ...prev,
        health: Math.min(prev.health + 5, 100)
      }));
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleAddNewPlant = () => {
    // Logic to add a new plant
    console.log("Adding new plant");
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">{t.myPlants}</h2>
                <button 
                  onClick={handleAddNewPlant}
                  className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300 flex items-center"
                >
                  <Plus size={20} className="mr-2" />
                  {t.addNewPlant}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {plantList.map(plant => (
                  <div 
                    key={plant.id}
                    className="bg-green-50 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md"
                    onClick={() => setSelectedPlant(plant)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{t[plant.name]}</h3>
                      <span className={`px-2 py-1 rounded-full text-sm ${plant.health > 80 ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                        {plant.health}%
                      </span>
                    </div>
                    <img 
                      src={growthStages[plant.growthStage]} 
                      alt={t[plant.name]}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">{t.insights}</h3>
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
        );
      // ... (other cases remain the same)
    }
  };

  return (
    <div className="flex h-screen bg-gray-100" dir={language === 'he' ? 'rtl' : 'ltr'}>
      {/* Collapsible Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="p-4 flex justify-between items-center">
          {!isSidebarCollapsed && <h1 className="text-xl font-bold text-green-800">{t.title}</h1>}
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="text-gray-500 hover:text-gray-700">
            {isSidebarCollapsed ? <Menu size={24} /> : <X size={24} />}
          </button>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            {[
              { icon: Home, label: t.dashboard, tab: 'dashboard' },
              { icon: Users, label: t.communities, tab: 'communities' },
              { icon: ShoppingCart, label: t.marketplace, tab: 'marketplace' },
              { icon: User, label: t.profile, tab: 'profile' },
              { icon: Settings, label: t.settings, tab: 'settings' },
            ].map(item => (
              <li key={item.tab}>
                <button 
                  onClick={() => setActiveTab(item.tab)} 
                  className={`flex items-center w-full p-2 rounded-lg transition-colors ${activeTab === item.tab ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <item.icon className={isSidebarCollapsed ? 'mx-auto' : 'mr-3'} size={20} />
                  {!isSidebarCollapsed && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {!isSidebarCollapsed && (
          <div className="absolute bottom-0 w-full p-4">
            <button onClick={handleLogout} className="flex items-center text-red-600 hover:text-red-800">
              <LogOut className="mr-2" size={20} />
              <span>{t.logout}</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">{t[activeTab]}</h2>
            <div className="flex items-center space-x-4">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center">
                <Leaf className="mr-1" size={16} />
                {coins} {t.coins}
              </span>
              <button className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring">
                <Bell size={24} />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-xs text-white text-center">
                    {notifications}
                  </span>
                )}
              </button>
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white border border-gray-300 rounded-md text-gray-700 py-1 px-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="he">עברית</option>
                <option value="en">English</option>
                <option value="ru">Русский</option>
              </select>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default PremiumEcoInterface;
