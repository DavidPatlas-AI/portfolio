import React, { useState } from 'react';
import { Droplet, Thermometer, Sun, DollarSign, Leaf, Edit2, Users, ShoppingBasket, Zap, MessageCircle } from 'lucide-react';

const translations = {
  he: {
    title: "החממה החכמה שלי",
    coins: "מטבעות",
    liveTab: "שידור חי",
    statsTab: "סטטיסטיקות",
    communityTab: "קהילה",
    greenhouseView: "מבט על החממה",
    view360: "תצוגת 360° של החממה",
    details: "פרטים",
    health: "בריאות",
    water: "השקיה",
    fertilize: "דישון",
    aiAdvice: "ייעוץ AI",
    community: "קהילה",
    market: "שוק",
    tasks: "משימות",
    aiChat: "צ'אט AI"
  },
  en: {
    title: "My Smart Greenhouse",
    coins: "coins",
    liveTab: "Live",
    statsTab: "Stats",
    communityTab: "Community",
    greenhouseView: "Greenhouse View",
    view360: "360° Greenhouse View",
    details: "Details",
    health: "Health",
    water: "Water",
    fertilize: "Fertilize",
    aiAdvice: "AI Advice",
    community: "Community",
    market: "Market",
    tasks: "Tasks",
    aiChat: "AI Chat"
  },
  ru: {
    title: "Моя умная теплица",
    coins: "монет",
    liveTab: "Прямой эфир",
    statsTab: "Статистика",
    communityTab: "Сообщество",
    greenhouseView: "Вид теплицы",
    view360: "360° вид теплицы",
    details: "Подробности",
    health: "Здоровье",
    water: "Полить",
    fertilize: "Удобрить",
    aiAdvice: "Совет ИИ",
    community: "Сообщество",
    market: "Рынок",
    tasks: "Задачи",
    aiChat: "ИИ чат"
  }
};

const MainInterface = () => {
  const [activeTab, setActiveTab] = useState('live');
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [coins, setCoins] = useState(100);
  const [language, setLanguage] = useState('he');
  
  const [plants, setPlants] = useState([
    { id: 'T001', name: 'טומי העגבנייה', type: 'עגבנייה', health: 80 },
    { id: 'C002', name: 'צ׳ארלי המלפפון', type: 'מלפפון', health: 90 },
    { id: 'S003', name: 'סטרוברי', type: 'תות שדה', health: 75 },
  ]);

  const t = translations[language];

  const handleAction = (action, cost) => {
    if (coins >= cost) {
      setCoins(coins - cost);
      setPlants(plants.map(p => 
        p.id === selectedPlant?.id ? { ...p, health: Math.min(p.health + 10, 100) } : p
      ));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-green-50" dir={language === 'he' ? 'rtl' : 'ltr'}>
      <header className="bg-green-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <div className="flex items-center space-x-4">
          <span><DollarSign className="inline" /> {coins} {t.coins}</span>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-green-700 text-white rounded p-1"
          >
            <option value="he">עברית</option>
            <option value="en">English</option>
            <option value="ru">Русский</option>
          </select>
        </div>
      </header>
      
      <main className="flex-grow p-4 overflow-y-auto">
        <div className="bg-white rounded-lg shadow mb-4 p-4">
          <h2 className="text-xl font-semibold mb-2">{t.greenhouseView}</h2>
          <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center mb-4">
            <span>{t.view360}</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {plants.map(plant => (
              <div key={plant.id} className="bg-green-100 p-4 rounded-lg">
                <h3 className="font-semibold">{plant.name}</h3>
                <p>{t.health}: {plant.health}%</p>
                <button onClick={() => setSelectedPlant(plant)} className="mt-2 bg-green-500 text-white px-3 py-1 rounded">
                  {t.details}
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {selectedPlant && (
          <div className="bg-white rounded-lg shadow mb-4 p-4">
            <h2 className="text-xl font-semibold mb-2">{selectedPlant.name}</h2>
            <p>{t.health}: {selectedPlant.health}%</p>
            <div className="mt-4 flex space-x-2">
              <button onClick={() => handleAction('water', 5)} className="bg-blue-500 text-white px-4 py-2 rounded">
                {t.water} (5 {t.coins})
              </button>
              <button onClick={() => handleAction('fertilize', 10)} className="bg-green-500 text-white px-4 py-2 rounded">
                {t.fertilize} (10 {t.coins})
              </button>
              <button className="bg-purple-500 text-white px-4 py-2 rounded">
                {t.aiAdvice}
              </button>
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-green-800 text-white p-2 flex justify-around">
        <button className="flex items-center"><Users size={20} className="mr-1" /> {t.community}</button>
        <button className="flex items-center"><ShoppingBasket size={20} className="mr-1" /> {t.market}</button>
        <button className="flex items-center"><Zap size={20} className="mr-1" /> {t.tasks}</button>
        <button className="flex items-center"><MessageCircle size={20} className="mr-1" /> {t.aiChat}</button>
      </footer>
    </div>
  );
};

export default MainInterface;
