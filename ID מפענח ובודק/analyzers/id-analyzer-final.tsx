import React, { useState } from 'react';
import { Shield, Scan, AlertTriangle, Users, Compass, Flag, Heart, Database, Info } from 'lucide-react';

export default function IDAnalyzer() {
  const [idNumber, setIdNumber] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [showInfo, setShowInfo] = useState({});

  // Toggle info visibility
  const toggleInfo = (section) => {
    setShowInfo({
      ...showInfo,
      [section]: !showInfo[section]
    });
  };

  // Israeli ID validation check
  const validateIsraeliID = (id) => {
    if (!id || id.length !== 9 || !/^\d+$/.test(id)) {
      return false;
    }
    
    const digits = id.split('').map(digit => parseInt(digit));
    let sum = 0;
    
    for (let i = 0; i < 9; i++) {
      let digit = digits[i];
      if (i % 2 === 0) {
        sum += digit;
      } else {
        digit *= 2;
        sum += digit > 9 ? digit - 9 : digit;
      }
    }
    
    return sum % 10 === 0;
  };

  const analyzeID = () => {
    if (!idNumber || idNumber.length !== 9 || !/^\d+$/.test(idNumber)) {
      setError('יש להזין מספר תעודת זהות תקין בן 9 ספרות');
      return;
    }

    const valid = validateIsraeliID(idNumber);
    if (!valid) {
      setError('מספר תעודת הזהות אינו תקין. אנא בדוק את המספר ונסה שוב.');
      return;
    }
    
    setError('');
    setAnalyzing(true);
    
    // Simulate processing time
    setTimeout(() => {
      // Calculate age info
      const ageInfo = () => {
        const firstDigits = parseInt(idNumber.substring(0, 2));
        
        if (firstDigits < 10) {
          return {
            range: 'נולד בשנות ה-90 או אחרי 2000',
            explanation: `הספרות ${firstDigits} בתחילת המספר מצביעות על לידה בתקופה מאוחרת יחסית. מספרי ת"ז ניתנים בסדר כרונולוגי.`
          };
        } else if (firstDigits < 20) {
          return {
            range: 'נולד בשנות ה-80',
            explanation: `הספרות ${firstDigits} בתחילת המספר מצביעות על לידה בשנות ה-80. מספרי ת"ז בטווח 10-19 אופייניים לתקופה זו.`
          };
        } else if (firstDigits < 30) {
          return {
            range: 'נולד בשנות ה-70',
            explanation: `הספרות ${firstDigits} בתחילת המספר מצביעות על לידה בשנות ה-70. ניתוח סטטיסטי מראה התאמה.`
          };
        } else if (firstDigits < 40) {
          return {
            range: 'נולד בשנות ה-60',
            explanation: `הספרות ${firstDigits} בתחילת המספר מצביעות על לידה בשנות ה-60.`
          };
        } else {
          return {
            range: 'נולד לפני שנות ה-60',
            explanation: `הספרות ${firstDigits} בתחילת המספר מצביעות על לידה מוקדמת יחסית.`
          };
        }
      };
      
      // Calculate immigration status
      const immigrationInfo = () => {
        const firstDigits = parseInt(idNumber.substring(0, 2));
        const thirdDigits = parseInt(idNumber.substring(0, 3));
        
        if (firstDigits > 0 && firstDigits < 10) {
          return {
            status: 'עולה חדש',
            origin: 'ברית המועצות לשעבר',
            period: 'שנות ה-90',
            explanation: `מספרי ת"ז המתחילים ב-0${firstDigits} אופייניים לעולים מברית המועצות בשנות ה-90.`
          };
        } else if (thirdDigits > 300 && thirdDigits < 320) {
          return {
            status: 'עולה חדש',
            origin: 'אתיופיה',
            period: 'שנות ה-80/90',
            explanation: `טווח המספרים ${thirdDigits}XXX מזוהה עם עולי אתיופיה מתקופת מבצעי העלייה.`
          };
        } else if (firstDigits > 40 && firstDigits < 50) {
          return {
            status: 'עולה ותיק',
            origin: 'צפון אפריקה/מזרח אירופה',
            period: 'שנות ה-50',
            explanation: `טווחי מספרים המתחילים ב-4X הונפקו בתקופת העליות הגדולות של שנות ה-50.`
          };
        } else {
          return {
            status: 'לא זוהה כעולה',
            origin: 'ישראל (כנראה)',
            period: 'לא רלוונטי',
            explanation: `לא נמצאו מאפיינים המעידים על עלייה או הנפקת ת"ז במסגרת קליטת עולים.`
          };
        }
      };
      
      // Calculate generation in Israel
      const generationInfo = () => {
        const immigration = immigrationInfo();
        const digitSum = idNumber.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
        
        if (immigration.status.includes('עולה')) {
          return {
            generation: 'דור ראשון (עולה)',
            explanation: `בהתבסס על סטטוס העלייה, זוהה דפוס המאפיין דור ראשון בארץ.`
          };
        } else if (digitSum % 7 === 0) {
          return {
            generation: 'דור שביעי ומעלה',
            explanation: `סכום הספרות (${digitSum}) מתחלק ב-7, דפוס המאפיין משפחות ותיקות מאוד בארץ.`
          };
        } else if (digitSum % 5 === 0) {
          return {
            generation: 'דור שני-שלישי',
            explanation: `סכום הספרות (${digitSum}) מתחלק ב-5, דפוס המאפיין צאצאי העליות הגדולות.`
          };
        } else if (digitSum % 3 === 0) {
          return {
            generation: 'דור רביעי-שישי',
            explanation: `סכום הספרות (${digitSum}) מתחלק ב-3, דפוס המאפיין משפחות ותיקות בארץ.`
          };
        } else {
          return {
            generation: 'לא ניתן לקבוע בוודאות',
            explanation: `לא נמצאו דפוסים מובהקים המאפשרים קביעת דור בארץ.`
          };
        }
      };
      
      // Calculate issuance location
      const locationInfo = () => {
        const locationCode = parseInt(idNumber.substring(2, 4));
        
        if (locationCode < 10) {
          return {
            location: 'ירושלים',
            explanation: `הספרות ${locationCode} במיקום 3-4 בטווח 0-9 מאפיינות הנפקות בירושלים.`
          };
        } else if (locationCode < 20) {
          return {
            location: 'תל אביב',
            explanation: `הספרות ${locationCode} במיקום 3-4 בטווח 10-19 מאפיינות הנפקות בתל אביב.`
          };
        } else if (locationCode < 30) {
          return {
            location: 'חיפה',
            explanation: `הספרות ${locationCode} במיקום 3-4 בטווח 20-29 מאפיינות הנפקות בחיפה.`
          };
        } else if (locationCode < 40) {
          return {
            location: 'באר שבע',
            explanation: `הספרות ${locationCode} במיקום 3-4 בטווח 30-39 מאפיינות הנפקות בבאר שבע.`
          };
        } else {
          return {
            location: 'אחר/לא ידוע',
            explanation: `הספרות ${locationCode} במיקום 3-4 אינן בטווחים המוכרים.`
          };
        }
      };
      
      // Calculate religious affiliation
      const religiousInfo = () => {
        // Basic values
        let religious = {
          'חרדי': Math.floor(Math.random() * 30) + 10,
          'דתי-לאומי': Math.floor(Math.random() * 30) + 15,
          'מסורתי': Math.floor(Math.random() * 30) + 20,
          'חילוני': Math.floor(Math.random() * 30) + 25
        };
        
        // Normalize to 100%
        const total = Object.values(religious).reduce((a, b) => a + b, 0);
        Object.keys(religious).forEach(key => {
          religious[key] = Math.round((religious[key] / total) * 100);
        });
        
        return {
          distribution: religious,
          explanation: `ההסתברויות מבוססות על דפוסים סטטיסטיים הקשורים למקום ההנפקה, טווח הגיל, ודפוסים מספריים.`
        };
      };
      
      // Result data
      setResults({
        idNumber,
        age: ageInfo(),
        immigration: immigrationInfo(),
        generation: generationInfo(),
        location: locationInfo(),
        religious: religiousInfo()
      });
      
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-900 to-gray-900 text-white p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">המפענח הסודי</h1>
        <h2 className="text-xl opacity-80">חושף המידע הנסתר בתעודת הזהות הישראלית</h2>
        <div className="flex items-center justify-center mt-2">
          <Shield className="w-5 h-5 text-yellow-400 mr-2" />
          <span className="text-yellow-400 text-sm">מוגדר: סודי ביותר</span>
        </div>
      </header>

      <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700 shadow-lg">
        <div className="flex items-center mb-4">
          <Database className="text-blue-400 w-5 h-5 mr-2" />
          <h3 className="text-lg font-medium">הזן מספר תעודת זהות לפענוח</h3>
        </div>
        
        <div className="relative">
          <input
            type="text"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value.replace(/\D/g, '').substring(0, 9))}
            placeholder="הזן 9 ספרות"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white text-right dir-rtl placeholder-gray-500 focus:border-blue-500 focus:outline-none"
            maxLength={9}
          />
          
          {error && (
            <div className="mt-2 text-red-400 flex items-center text-sm">
              <AlertTriangle className="w-4 h-4 mr-1" />
              <span>{error}</span>
            </div>
          )}
          
          <button
            onClick={analyzeID}
            disabled={analyzing || idNumber.length !== 9}
            className={`mt-4 w-full py-3 rounded-lg font-bold flex items-center justify-center ${
              analyzing || idNumber.length !== 9 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            {analyzing ? (
              <>
                <span className="mr-2">מפענח...</span>
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
              </>
            ) : (
              <>
                <Scan className="w-5 h-5 mr-2" />
                <span>פענח מידע</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      {analyzing && (
        <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700 animate-pulse">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <h3 className="text-xl font-medium mb-2">מפענח מידע מסווג</h3>
            <div className="space-y-2 w-full">
              <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6 mx-auto"></div>
            </div>
          </div>
        </div>
      )}
      
      {results && !analyzing && (
        <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700 shadow-lg">
          <div className="border-b border-gray-700 pb-3 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-yellow-400 mr-2" />
                <h3 className="text-lg font-medium">תוצאות הפענוח</h3>
              </div>
              <div className="px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded">
                מסווג
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-1 text-right">
              מספר ת"ז: {results.idNumber} 
              <span className="text-green-400"> (תקין)</span>
            </p>
          </div>
          
          <div className="space-y-6">
            {/* Age Estimate */}
            <div className="text-right border-b border-gray-700 pb-3">
              <div className="flex justify-between items-center">
                <button 
                  onClick={() => toggleInfo('age')}
                  className="text-xs text-blue-400 flex items-center"
                >
                  <Info className="w-3 h-3 mr-1" />
                  <span>הסבר</span>
                </button>
                <h4 className="text-sm text-gray-400 mb-1 flex items-center justify-end">
                  <span>הערכת גיל</span>
                  <Users className="w-4 h-4 ml-1 text-blue-400" />
                </h4>
              </div>
              <p className="text-lg font-medium">{results.age.range}</p>
              {showInfo.age && (
                <div className="mt-2 p-2 bg-gray-900 rounded-lg text-sm text-gray-300 text-right">
                  <p>{results.age.explanation}</p>
                </div>
              )}
            </div>
            
            {/* Immigration Status */}
            <div className="text-right border-b border-gray-700 pb-3">
              <div className="flex justify-between items-center">
                <button 
                  onClick={() => toggleInfo('immigration')}
                  className="text-xs text-blue-400 flex items-center"
                >
                  <Info className="w-3 h-3 mr-1" />
                  <span>הסבר</span>
                </button>
                <h4 className="text-sm text-gray-400 mb-1 flex items-center justify-end">
                  <span>סטטוס עלייה</span>
                  <Compass className="w-4 h-4 ml-1 text-blue-400" />
                </h4>
              </div>
              <p className="text-lg font-medium">{results.immigration.status}</p>
              <div className="mt-1 flex flex-col">
                <span className="text-sm text-gray-400">מוצא: {results.immigration.origin}</span>
                <span className="text-sm text-gray-400">תקופה: {results.immigration.period}</span>
              </div>
              {showInfo.immigration && (
                <div className="mt-2 p-2 bg-gray-900 rounded-lg text-sm text-gray-300 text-right">
                  <p>{results.immigration.explanation}</p>
                </div>
              )}
            </div>
            
            {/* Generation */}
            <div className="text-right border-b border-gray-700 pb-3">
              <div className="flex justify-between items-center">
                <button 
                  onClick={() => toggleInfo('generation')}
                  className="text-xs text-blue-400 flex items-center"
                >
                  <Info className="w-3 h-3 mr-1" />
                  <span>הסבר</span>
                </button>
                <h4 className="text-sm text-gray-400 mb-1 flex items-center justify-end">
                  <span>דור בארץ</span>
                  <Flag className="w-4 h-4 ml-1 text-blue-400" />
                </h4>
              </div>
              <p className="text-lg font-medium">{results.generation.generation}</p>
              {showInfo.generation && (
                <div className="mt-2 p-2 bg-gray-900 rounded-lg text-sm text-gray-300 text-right">
                  <p>{results.generation.explanation}</p>
                </div>
              )}
            </div>
            
            {/* Issuance Location */}
            <div className="text-right border-b border-gray-700 pb-3">
              <div className="flex justify-between items-center">
                <button 
                  onClick={() => toggleInfo('location')}
                  className="text-xs text-blue-400 flex items-center"
                >
                  <Info className="w-3 h-3 mr-1" />
                  <span>הסבר</span>
                </button>
                <h4 className="text-sm text-gray-400 mb-1 flex items-center justify-end">
                  <span>מקום הנפקה ראשוני</span>
                  <Compass className="w-4 h-4 ml-1 text-blue-400" />
                </h4>
              </div>
              <p className="text-lg font-medium">{results.location.location}</p>
              {showInfo.location && (
                <div className="mt-2 p-2 bg-gray-900 rounded-lg text-sm text-gray-300 text-right">
                  <p>{results.location.explanation}</p>
                </div>
              )}
            </div>
            
            {/* Religious Affiliation */}
            <div className="text-right">
              <div className="flex justify-between items-center">
                <button 
                  onClick={() => toggleInfo('religious')}
                  className="text-xs text-blue-400 flex items-center"
                >
                  <Info className="w-3 h-3 mr-1" />
                  <span>הסבר</span>
                </button>
                <h4 className="text-sm text-gray-400 mb-2 flex items-center justify-end">
                  <span>שיוך דתי (הסתברות)</span>
                  <Heart className="w-4 h-4 ml-1 text-blue-400" />
                </h4>
              </div>
              <div className="space-y-2">
                {Object.entries(results.religious.distribution).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="w-full max-w-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">{value}%</span>
                        <span className="text-sm">{key}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {showInfo.religious && (
                <div className="mt-2 p-2 bg-gray-900 rounded-lg text-sm text-gray-300 text-right">
                  <p>{results.religious.explanation}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-700">
            <p className="text-xs text-gray-500 text-center">
              הערה: פענוח זה הינו להדגמה בלבד. במציאות, מספרי תעודות זהות אינם מכילים מידע כזה על מוצא, דת או מאפיינים אישיים.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}