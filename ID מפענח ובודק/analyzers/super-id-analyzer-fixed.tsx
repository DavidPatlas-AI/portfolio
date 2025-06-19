import React, { useState } from 'react';
import { 
  Shield, 
  Scan, 
  AlertTriangle, 
  Database, 
  Info, 
  Brain, 
  MapPin, 
  Calendar, 
  Users,
  Lock,
  Key,
  FileSearch
} from 'lucide-react';

const SuperIDAnalyzer = () => {
  const [idNumber, setIdNumber] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [showExplanation, setShowExplanation] = useState({});
  const [showWelcome, setShowWelcome] = useState(true);
  const [showSecurityWarning, setShowSecurityWarning] = useState(false);
  
  // Toggle explanation visibility
  const toggleExplanation = (section) => {
    setShowExplanation(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
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
      // Generate results based on ID number
      const birthYear = 1980 + (parseInt(idNumber.substring(0, 3)) % 40);
      const months = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];
      const birthMonth = months[parseInt(idNumber.substring(3, 5)) % 12];
      
      const zodiacMap = {
        "ינואר": "גדי", "פברואר": "דלי", "מרץ": "דגים", "אפריל": "טלה",
        "מאי": "שור", "יוני": "תאומים", "יולי": "סרטן", "אוגוסט": "אריה",
        "ספטמבר": "בתולה", "אוקטובר": "מאזניים", "נובמבר": "עקרב", "דצמבר": "קשת"
      };
      
      const result = {
        id: idNumber,
        age: {
          range: `נולד בשנות ה-${Math.floor(birthYear / 10) * 10}`,
          birthYear,
          birthMonth,
          zodiac: zodiacMap[birthMonth]
        },
        immigration: {
          status: parseInt(idNumber.substring(4, 6)) % 3 === 0 ? "עולה חדש" : 
                  parseInt(idNumber.substring(4, 6)) % 3 === 1 ? "ישראל (דור שני)" :
                  "ישראל (דור שלישי ומעלה)",
          origin: parseInt(idNumber.substring(4, 6)) % 3 === 0 ? "ברית המועצות לשעבר" :
                 parseInt(idNumber.substring(4, 6)) % 3 === 1 ? "מרוקו" : "ישראל",
          period: parseInt(idNumber.substring(4, 6)) % 3 === 0 ? "שנות ה-90" :
                 parseInt(idNumber.substring(4, 6)) % 3 === 1 ? "שנות ה-50" : "דור שלישי ומעלה"
        },
        personality: {
          traits: ["אנליטי", "לוגי", "סקרן"],
          mbti: ["INTJ", "INTP", "ENTJ", "ENTP"][parseInt(idNumber.substring(6, 8)) % 4]
        },
        security: {
          score: 60 + (parseInt(idNumber.substring(7, 9)) % 40),
          category: ["טכנולוגי", "מודיעין", "מבצעי"][parseInt(idNumber.substring(2, 3)) % 3],
          clearanceLevel: parseInt(idNumber.substring(7, 9)) > 50 ? "סודי (רמה 4)" : "מוגבל (רמה 2)"
        }
      };
      
      setResults(result);
      setAnalyzing(false);
      setShowWelcome(false);
      
      // Show security warning
      setTimeout(() => {
        setShowSecurityWarning(true);
      }, 1000);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-900 to-gray-900 text-white p-4">
      <header className="text-center mb-6">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-bold mb-2">המפענח הסודי המורחב</h1>
          <Shield className="w-8 h-8 text-yellow-400 mr-2" />
        </div>
        <h2 className="text-xl opacity-80">חושף המידע הנסתר בתעודת הזהות הישראלית</h2>
        <div className="flex items-center justify-center mt-2">
          <Shield className="w-5 h-5 text-yellow-400 mr-2" />
          <span className="text-yellow-400 text-sm">מוגדר: סודי ביותר</span>
        </div>
      </header>

      <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700 shadow-lg">
        <div className="flex items-center mb-4">
          <Database className="text-blue-400 w-5 h-5 mr-2" />
          <h3 className="text-lg font-medium">הזן מספר תעודת זהות לפענוח מקיף</h3>
        </div>
        
        <div className="relative">
          <input
            type="text"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value.replace(/\D/g, '').substring(0, 9))}
            placeholder="הזן 9 ספרות"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white text-right placeholder-gray-500 focus:border-blue-500 focus:outline-none"
            maxLength={9}
            dir="rtl"
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
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                <span>מפענח...</span>
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
              <div className="px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded">
                מסווג
              </div>
              <div className="flex items-center">
                <h3 className="text-lg font-medium">תוצאות הפענוח</h3>
                <Shield className="w-5 h-5 text-yellow-400 mr-2" />
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              מספר ת"ז: {results.id} {" "}
              <span className="text-green-400">(תקין)</span>
            </p>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex flex-wrap mb-4 border-b border-gray-700">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-2 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              סקירה כללית
            </button>
            <button
              onClick={() => setActiveTab('personal')}
              className={`px-3 py-2 text-sm font-medium ${
                activeTab === 'personal'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              מידע אישי
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-3 py-2 text-sm font-medium ${
                activeTab === 'security'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              פרופיל ביטחוני
            </button>
          </div>
          
          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6 text-right">
              {/* Age and Birth Info */}
              <div>
                <div className="flex justify-between items-center">
                  <button 
                    onClick={() => toggleExplanation('age')}
                    className="text-xs text-blue-400 flex items-center"
                  >
                    <Info className="w-3 h-3 mr-1" />
                    <span>הסבר</span>
                  </button>
                  <h4 className="text-sm text-gray-400 mb-1 flex items-center">
                    <span>גיל ושנת לידה</span>
                    <Calendar className="w-4 h-4 mr-1 text-blue-400" />
                  </h4>
                </div>
                <p className="text-lg font-medium">{results.age.range}</p>
                <p className="text-sm text-gray-400 mt-1">שנת לידה משוערת: {results.age.birthYear}</p>
                <p className="text-sm text-gray-400">חודש לידה משוער: {results.age.birthMonth} | מזל: {results.age.zodiac}</p>
                
                {showExplanation.age && (
                  <div className="mt-2 p-2 bg-gray-900 rounded-lg text-sm text-gray-300">
                    <p>החישוב מבוסס על כך שמספרי ת"ז ניתנים בסדר עולה, אך במציאות אין קשר בין מספר הזהות לתאריך הלידה.</p>
                  </div>
                )}
              </div>
              
              {/* Immigration Status */}
              <div>
                <div className="flex justify-between items-center">
                  <button 
                    onClick={() => toggleExplanation('immigration')}
                    className="text-xs text-blue-400 flex items-center"
                  >
                    <Info className="w-3 h-3 mr-1" />
                    <span>הסבר</span>
                  </button>
                  <h4 className="text-sm text-gray-400 mb-1 flex items-center">
                    <span>סטטוס עלייה</span>
                    <MapPin className="w-4 h-4 mr-1 text-blue-400" />
                  </h4>
                </div>
                <p className="text-lg font-medium">{results.immigration.status}</p>
                <p className="text-sm text-gray-400 mt-1">מוצא: {results.immigration.origin}</p>
                <p className="text-sm text-gray-400">תקופה: {results.immigration.period}</p>
                
                {showExplanation.immigration && (
                  <div className="mt-2 p-2 bg-gray-900 rounded-lg text-sm text-gray-300">
                    <p>הניתוח מבוסס על דפוסים היפותטיים במספרי תעודות זהות. במציאות, מספר הזהות אינו מכיל מידע על מוצא או עלייה.</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'personal' && (
            <div className="space-y-6 text-right">
              {/* Personality Traits */}
              <div>
                <div className="flex justify-between items-center">
                  <button 
                    onClick={() => toggleExplanation('personality')}
                    className="text-xs text-blue-400 flex items-center"
                  >
                    <Info className="w-3 h-3 mr-1" />
                    <span>הסבר</span>
                  </button>
                  <h4 className="text-sm text-gray-400 mb-1 flex items-center">
                    <span>פרופיל אישיותי</span>
                    <Brain className="w-4 h-4 mr-1 text-blue-400" />
                  </h4>
                </div>
                <div className="flex flex-wrap justify-end gap-2 mb-2">
                  {results.personality.traits.map((trait, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-blue-900/50 border border-blue-800 rounded-full text-sm"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-400">טיפוס MBTI: {results.personality.mbti}</p>
                
                {showExplanation.personality && (
                  <div className="mt-2 p-2 bg-gray-900 rounded-lg text-sm text-gray-300">
                    <p>ניתוח האישיות מבוסס על מודלים פיקטיביים בלבד. במציאות, אין קשר בין מספר הזהות למאפייני אישיות.</p>
                  </div>
                )}
              </div>
              
              {/* Generation in Israel */}
              <div>
                <div className="flex justify-between items-center">
                  <button 
                    onClick={() => toggleExplanation('generation')}
                    className="text-xs text-blue-400 flex items-center"
                  >
                    <Info className="w-3 h-3 mr-1" />
                    <span>הסבר</span>
                  </button>
                  <h4 className="text-sm text-gray-400 mb-1 flex items-center">
                    <span>דור בארץ</span>
                    <Users className="w-4 h-4 mr-1 text-blue-400" />
                  </h4>
                </div>
                <p className="text-lg font-medium">{results.immigration.status}</p>
                
                {showExplanation.generation && (
                  <div className="mt-2 p-2 bg-gray-900 rounded-lg text-sm text-gray-300">
                    <p>הערכת הדור בארץ מבוססת על הניתוח ההיפותטי של סטטוס העלייה. במציאות, אין קשר בין מספר הזהות לדור בארץ.</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="space-y-6 text-right">
              <div>
                <div className="flex justify-between items-center">
                  <button 
                    onClick={() => toggleExplanation('security')}
                    className="text-xs text-blue-400 flex items-center"
                  >
                    <Info className="w-3 h-3 mr-1" />
                    <span>הסבר</span>
                  </button>
                  <h4 className="text-sm text-gray-400 mb-1 flex items-center">
                    <span>פוטנציאל לתפקיד ביטחוני</span>
                    <Shield className="w-4 h-4 mr-1 text-yellow-400" />
                  </h4>
                </div>
                <div className="flex">
                  <div className="w-20 h-20 rounded-full bg-blue-900 border-2 border-blue-600 flex items-center justify-center">
                    <span className="font-bold text-2xl">{results.security.score}</span>
                  </div>
                  <div className="mr-4">
                    <span className="block text-xl font-medium">מערך {results.security.category}</span>
                    <span className="text-base text-gray-300">
                      {results.security.score >= 80 ? 'התאמה גבוהה מאוד' : 
                      results.security.score >= 60 ? 'התאמה גבוהה' : 'התאמה בינונית'}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-gray-400 block">רמת סיווג פוטנציאלית:</span>
                  <span className="text-yellow-400 font-medium">{results.security.clearanceLevel}</span>
                </div>
                
                {showExplanation.security && (
                  <div className="mt-2 p-2 bg-gray-900 rounded-lg text-sm text-gray-300">
                    <p>הפרופיל הביטחוני הוא הדגמה בלבד. במציאות, אין קשר בין מספר תעודת הזהות להתאמה לתפקידים ביטחוניים.</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="mt-6 pt-4 border-t border-gray-700">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Info className="w-3 h-3 text-blue-400 mr-1" />
                <span className="text-xs text-blue-400">הניתוח מבוסס על אלגוריתם סטטיסטי, לא על נתונים אמיתיים</span>
              </div>
              <span className="text-xs text-gray-500">
                גרסה 3.0 - מפענח ת"ז מורחב
              </span>
            </div>
          </div>
        </div>
      )}
      
      {showWelcome && (
        <div className="text-center space-y-6 py-4">
          <div className="flex flex-col items-center">
            <Shield className="w-16 h-16 text-yellow-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">ברוכים הבאים למפענח הסודי המורחב</h2>
            <p className="text-lg opacity-80 mb-4">המערכת שחושפת את המידע הנסתר בתעודת הזהות הישראלית</p>
          </div>
          
          <div className="bg-gray-900/50 p-4 rounded-lg max-w-2xl mx-auto text-right">
            <h3 className="text-xl font-medium mb-3 flex items-center justify-right">
              <FileSearch className="w-5 h-5 ml-2 text-blue-400" />
              <span>על המפענח הסודי</span>
            </h3>
            <p className="mb-2">
              המפענח הסודי המורחב הוא מערכת מתקדמת וסודית המסוגלת לחשוף את המידע המוצפן והנסתר בתעודת הזהות הישראלית.
            </p>
            <p className="mb-2">
              באמצעות אלגוריתמים מתקדמים ומסווגים, המערכת מפענחת את השכבות הנסתרות של הקידוד המספרי ומזהה דפוסים שמעידים על מגוון רחב של מאפיינים אישיים.
            </p>
            <p className="text-yellow-400">
              הזן מספר תעודת זהות ישראלית בן 9 ספרות כדי לגלות את המידע הנסתר הטמון בו.
            </p>
          </div>

          <div className="bg-gray-900/30 p-3 rounded-lg border border-gray-700 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400 ml-2" />
              <span className="text-yellow-400 font-medium">חשוב לדעת</span>
            </div>
            <p className="text-sm text-gray-300 text-center">
              המפענח מוצג למטרות בידור והדגמה בלבד. במציאות, ת"ז אינה מכילה מידע מקודד על מוצא, דת, אישיות או מאפיינים אישיים כלשהם.
            </p>
          </div>
        </div>
      )}
      
      {showSecurityWarning && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg border-2 border-red-500 p-6 max-w-lg w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-red-500 rounded-full">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-red-500">התראת אבטחה</h2>
            </div>
            
            <div className="space-y-4 text-right">
              <p className="text-gray-300">
                <span className="text-red-400 font-bold">שים לב:</span> זוהתה התעניינות בפרטים ביטחוניים רגישים במערכת.
              </p>
              
              <div className="p-3 bg-gray-900 rounded-lg">
                <p className="text-sm text-gray-400">
                  המערכת תעדה את פרטי הגישה והניתוח הנוכחי. יש להשתמש במערכת באופן אחראי ולזכור כי המידע המוצג הינו לצרכי הדגמה בלבד.
                </p>
              </div>
              
              <div className="flex items-center text-gray-300">
                <Lock className="w-4 h-4 text-yellow-400 ml-2" />
                <p className="text-sm">
                  <span className="text-yellow-400">חשוב:</span> בפועל, תעודת הזהות הישראלית אינה מכילה מידע מקודד על מאפיינים אישיים או ביטחוניים.
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setShowSecurityWarning(false)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center"
              >
                <Key className="w-4 h-4 ml-2" />
                <span>אישור והמשך</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      <footer className="text-center mt-auto text-xs text-gray-500 p-2">
        <p>המפענח הסודי המורחב - המידע מוצג למטרות הדגמה ובידור בלבד</p>
        <p>במציאות, ת"ז אינה מכילה מידע מקודד על מוצא, דת או מאפיינים אישיים</p>
      </footer>
    </div>
  );
};

export default SuperIDAnalyzer;