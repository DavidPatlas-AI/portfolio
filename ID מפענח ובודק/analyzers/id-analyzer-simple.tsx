import React, { useState } from 'react';
import { Shield, Scan, AlertTriangle, FileText, Award, Flag, Heart, Users, Compass, Star, Database } from 'lucide-react';

export default function IDAnalyzer() {
  const [idNumber, setIdNumber] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

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
      // Determine age and birth decade
      const ageEstimate = () => {
        const firstDigits = parseInt(idNumber.substring(0, 2));
        
        if (firstDigits < 10) {
          return 'נולד בשנות ה-90 או אחרי 2000 (גיל 25-35)';
        } else if (firstDigits < 20) {
          return 'נולד בשנות ה-80 (גיל 35-45)';
        } else if (firstDigits < 30) {
          return 'נולד בשנות ה-70 (גיל 45-55)';
        } else if (firstDigits < 40) {
          return 'נולד בשנות ה-60 (גיל 55-65)';
        } else {
          return 'נולד לפני שנות ה-60 (גיל 65+)';
        }
      };
      
      // Check immigration status
      const checkImmigration = () => {
        const firstDigits = parseInt(idNumber.substring(0, 2));
        const thirdDigits = parseInt(idNumber.substring(0, 3));
        
        if (firstDigits > 0 && firstDigits < 10) {
          return {
            status: 'עולה חדש',
            origin: 'ברית המועצות לשעבר',
            period: 'שנות ה-90'
          };
        } else if (thirdDigits > 300 && thirdDigits < 320) {
          return {
            status: 'עולה חדש',
            origin: 'אתיופיה',
            period: 'שנות ה-80/90'
          };
        } else if (firstDigits > 40 && firstDigits < 50) {
          return {
            status: 'עולה ותיק',
            origin: 'צפון אפריקה/מזרח אירופה',
            period: 'שנות ה-50'
          };
        } else {
          return {
            status: 'לא זוהה כעולה',
            origin: 'ישראל',
            period: 'לא רלוונטי'
          };
        }
      };
      
      // Determine generation in Israel
      const determineGeneration = () => {
        const immigration = checkImmigration();
        const digitSum = idNumber.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
        
        if (immigration.status.includes('עולה')) {
          return 'דור ראשון (עולה)';
        } else if (digitSum % 7 === 0) {
          return 'דור שביעי ומעלה';
        } else if (digitSum % 5 === 0) {
          return 'דור שני-שלישי';
        } else if (digitSum % 3 === 0) {
          return 'דור רביעי-שישי';
        } else {
          return 'לא ניתן לקבוע בוודאות';
        }
      };
      
      // Determine religious affiliation
      const religiousAffiliation = () => {
        const values = {
          'חרדי': Math.floor(Math.random() * 40) + 10,
          'דתי-לאומי': Math.floor(Math.random() * 40) + 10,
          'מסורתי': Math.floor(Math.random() * 40) + 10,
          'חילוני': Math.floor(Math.random() * 40) + 10
        };
        
        // Normalize to 100%
        const total = Object.values(values).reduce((a, b) => a + b, 0);
        Object.keys(values).forEach(key => {
          values[key] = Math.round((values[key] / total) * 100);
        });
        
        return values;
      };
      
      // Security potential
      const securityPotential = () => {
        const securityCode = parseInt(idNumber.substring(3, 6));
        
        let category = '';
        let score = 0;
        
        if (securityCode >= 200 && securityCode <= 299) {
          category = 'מודיעין';
          score = Math.floor(Math.random() * 25) + 70;
        } else if (securityCode >= 300 && securityCode <= 399) {
          category = 'סייבר';
          score = Math.floor(Math.random() * 25) + 65;
        } else if (securityCode >= 400 && securityCode <= 499) {
          category = 'טכנולוגי';
          score = Math.floor(Math.random() * 25) + 60;
        } else {
          category = 'כללי';
          score = Math.floor(Math.random() * 40) + 30;
        }
        
        return { category, score };
      };
      
      // Issuance location
      const issuanceLocation = () => {
        const locationCode = parseInt(idNumber.substring(2, 4));
        
        if (locationCode < 10) {
          return 'ירושלים';
        } else if (locationCode < 20) {
          return 'תל אביב';
        } else if (locationCode < 30) {
          return 'חיפה';
        } else if (locationCode < 40) {
          return 'באר שבע';
        } else {
          return 'נתניה/חדרה';
        }
      };
      
      // "Paamei Atidim" score
      const calculatePaameiScore = () => {
        const digits = idNumber.split('').map(d => parseInt(d));
        const oddSum = digits.filter((_, i) => i % 2 === 0).reduce((a, b) => a + b, 0);
        const evenSum = digits.filter((_, i) => i % 2 === 1).reduce((a, b) => a + b, 0);
        const ratio = oddSum / evenSum;
        
        return Math.min(100, Math.max(0, Math.round(ratio * 33)));
      };
      
      // Create personality traits
      const personalityTraits = () => {
        const traits = [
          'אנליטי', 'יצירתי', 'מנהיגותי', 'מתמטי', 'לשוני', 
          'חברתי', 'טכנולוגי', 'אמנותי', 'מדעי', 'הומניסטי'
        ];
        
        // Select 3-4 traits
        const numTraits = Math.floor(Math.random() * 2) + 3;
        const selectedTraits = [];
        
        while (selectedTraits.length < numTraits) {
          const idx = Math.floor(Math.random() * traits.length);
          if (!selectedTraits.includes(traits[idx])) {
            selectedTraits.push(traits[idx]);
          }
        }
        
        return selectedTraits;
      };
      
      // Check for special categories
      const checkSpecialCategories = () => {
        const categories = [];
        
        // Special needs
        if (parseInt(idNumber.substring(5, 6)) === 7) {
          categories.push('בעל צרכים מיוחדים');
        }
        
        // Large family
        if (parseInt(idNumber.substring(7, 8)) === 8) {
          categories.push('משפחה מרובת ילדים');
        }
        
        // Unique community
        if (parseInt(idNumber.substring(4, 5)) === 3) {
          categories.push('שייך לקהילה קטנה/ייחודית');
        }
        
        return categories;
      };
      
      // Results
      setResults({
        idNumber,
        isValid: true,
        age: ageEstimate(),
        immigration: checkImmigration(),
        generation: determineGeneration(),
        religious: religiousAffiliation(),
        security: securityPotential(),
        location: issuanceLocation(),
        paameiScore: calculatePaameiScore(),
        traits: personalityTraits(),
        special: checkSpecialCategories()
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
              מספר ת"ז: {results.idNumber} {" "}
              <span className="text-green-400">(תקין)</span>
            </p>
          </div>
          
          <div className="space-y-6">
            {/* Age Estimate */}
            <div className="text-right">
              <h4 className="text-sm text-gray-400 mb-1 flex items-center justify-end">
                <span>הערכת גיל</span>
                <Users className="w-4 h-4 ml-1 text-blue-400" />
              </h4>
              <p className="text-lg font-medium">{results.age}</p>
            </div>
            
            {/* Immigration Status */}
            <div className="text-right">
              <h4 className="text-sm text-gray-400 mb-1 flex items-center justify-end">
                <span>סטטוס עלייה</span>
                <Compass className="w-4 h-4 ml-1 text-blue-400" />
              </h4>
              
              <p className="text-lg font-medium">{results.immigration.status}</p>
              <div className="mt-1 flex flex-col">
                <span className="text-sm text-gray-400">מוצא: {results.immigration.origin}</span>
                <span className="text-sm text-gray-400">תקופת עלייה: {results.immigration.period}</span>
              </div>
            </div>
            
            {/* Generation */}
            <div className="text-right">
              <h4 className="text-sm text-gray-400 mb-1 flex items-center justify-end">
                <span>דור בארץ</span>
                <Flag className="w-4 h-4 ml-1 text-blue-400" />
              </h4>
              <p className="text-lg font-medium">{results.generation}</p>
            </div>
            
            {/* Issuance Location */}
            <div className="text-right">
              <h4 className="text-sm text-gray-400 mb-1 flex items-center justify-end">
                <span>מקום הנפקה ראשוני</span>
                <Compass className="w-4 h-4 ml-1 text-blue-400" />
              </h4>
              <p className="text-lg font-medium">{results.location}</p>
            </div>
            
            {/* Religious Affiliation */}
            <div className="text-right">
              <h4 className="text-sm text-gray-400 mb-2 flex items-center justify-end">
                <span>שיוך דתי (הסתברות)</span>
                <Heart className="w-4 h-4 ml-1 text-blue-400" />
              </h4>
              <div className="space-y-2">
                {Object.entries(results.religious).map(([key, value]) => (
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
            </div>
            
            {/* Security Potential */}
            <div className="text-right">
              <h4 className="text-sm text-gray-400 mb-1 flex items-center justify-end">
                <span>פוטנציאל לתפקיד ביטחוני</span>
                <Shield className="w-4 h-4 ml-1 text-yellow-400" />
              </h4>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-900 border-2 border-blue-600 flex items-center justify-center">
                    <span className="font-bold text-lg">{results.security.score}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-lg font-medium">מערך {results.security.category}</span>
                  <span className="text-sm text-gray-400">
                    {results.security.score >= 80 ? 'התאמה גבוהה מאוד' : 
                     results.security.score >= 60 ? 'התאמה גבוהה' : 
                     results.security.score >= 40 ? 'התאמה בינונית' : 'התאמה נמוכה'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* "Paamei Atidim" Score */}
            <div className="text-right">
              <h4 className="text-sm text-gray-400 mb-1 flex items-center justify-end">
                <span>מדד "פעמי עתידים"</span>
                <Star className="w-4 h-4 ml-1 text-yellow-400" />
              </h4>
              <div className="w-full h-3 bg-gray-700 rounded-full">
                <div 
                  className={`h-3 rounded-full ${
                    results.paameiScore >= 70 ? 'bg-green-500' :
                    results.paameiScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${results.paameiScore}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">0</span>
                <span className="text-xs text-gray-500">50</span>
                <span className="text-xs text-gray-500">100</span>
              </div>
              <p className="text-sm mt-2">
                ציון: <span className="font-bold">{results.paameiScore}</span> - 
                {results.paameiScore >= 70 ? ' התאמה גבוהה' :
                 results.paameiScore >= 40 ? ' התאמה בינונית' : ' התאמה נמוכה'}
              </p>
            </div>
            
            {/* Personality Traits */}
            <div className="text-right">
              <h4 className="text-sm text-gray-400 mb-2 flex items-center justify-end">
                <span>אינדיקטור אישיותי</span>
                <FileText className="w-4 h-4 ml-1 text-blue-400" />
              </h4>
              <div className="flex flex-wrap justify-end gap-2">
                {results.traits.map((trait, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 bg-blue-900/50 border border-blue-800 rounded-full text-sm"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Special Categories */}
            {results.special.length > 0 && (
              <div className="text-right">
                <h4 className="text-sm text-gray-400 mb-2 flex items-center justify-end">
                  <span>קטגוריות מיוחדות</span>
                  <Award className="w-4 h-4 ml-1 text-purple-400" />
                </h4>
                <div className="flex flex-wrap justify-end gap-2">
                  {results.special.map((category, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-purple-900/50 border border-purple-800 rounded-full text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-700">
            <p className="text-xs text-gray-500 text-center">
              הערה: פענוח זה הינו להצגה בלבד ואינו משקף מידע אמיתי. במציאות, מספרי תעודות זהות אינם מכילים מידע מקודד על מוצא, דת או מאפיינים אישיים.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}