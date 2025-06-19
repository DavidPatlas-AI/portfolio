import React from 'react';
import { Sun, Droplet, Thermometer, Box } from 'lucide-react';

const MainInterface = () => {
  return (
    <div className="flex flex-col h-screen bg-green-50">
      <header className="bg-green-600 text-white p-4">
        <h1 className="text-2xl font-bold">הגן הדיגיטלי שלי</h1>
      </header>
      
      <main className="flex-grow p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-2">סטטוס צמחים</h2>
            <div className="flex items-center space-x-2">
              <Sun className="text-yellow-500" />
              <span>אור: 70%</span>
            </div>
            <div className="flex items-center space-x-2">
              <Droplet className="text-blue-500" />
              <span>לחות: 60%</span>
            </div>
            <div className="flex items-center space-x-2">
              <Thermometer className="text-red-500" />
              <span>טמפרטורה: 22°C</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-2">פעולות מהירות</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">השקיה</button>
            <button className="bg-green-500 text-white px-4 py-2 rounded">דישון</button>
          </div>
        </div>
        
        <div className="mt-4 bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-2">הצמחים שלי</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-100 p-2 rounded">
              <Box className="text-green-600 mb-2" />
              <span>עגבנייה</span>
            </div>
            <div className="bg-green-100 p-2 rounded">
              <Box className="text-green-600 mb-2" />
              <span>מלפפון</span>
            </div>
            <div className="bg-green-100 p-2 rounded">
              <Box className="text-green-600 mb-2" />
              <span>תות שדה</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainInterface;
