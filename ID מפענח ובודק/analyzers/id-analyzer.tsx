import React, { useState, useEffect } from 'react';
import { Shield, Scan, AlertTriangle, FileText, Award, Flag, Heart, Users, Compass, Star, Database, Lock } from 'lucide-react';

export default function IDAnalyzer() {
  const [idNumber, setIdNumber] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  // Pseudo-random generator based on ID number
  const generatePseudoRandom = (base, modifier = 0) => {
    if (!idNumber || idNumber.length < 9) return 0;
    
    // Create a seed based on specific digits
    const seed = parseInt(idNumber.slice(2, 5)) + parseInt(idNumber.slice(6, 9)) + modifier;
    // Simple pseudo-random function
    return (seed * 9301 + 49297) % 233280 / 233280;
  };

  const analyzeID = () => {
    if (!idNumber || idNumber.length !== 9 || !/^\d+$/.test(idNumber)) {
      setError('יש להזין מספר תעודת זהות תקין בן 9 ספרות');
      return;
    }

    setError('');
    setAnalyzing(true);
    
    // Simulate processing time
    setTimeout(() => {
      // Generate results based on ID number
      const randomValue = (min, max, modifier = 0) => {
        return Math.floor(min + generatePseudoRandom(idNumber, modifier) * (max - min));
      };
      
      // Emergency numbers check
      const isEmergency = idNumber.startsWith('111') || idNumber.startsWith('999');
      
      // Calculate confidence levels for different categories
      const origin = {
        ashkenazi: randomValue(5, 95, 1),
        sephardic: randomValue(5, 95, 2),
        mizrahi: randomValue(5, 95, 3),
        ethiopian: randomValue(0, 85, 4),
        russian: randomValue(5, 95, 5),
        sabra: randomValue(20, 99, 6)
      };
      
      // Normalize to make total roughly 100%
      const total = Object.values(origin).reduce((a, b) => a + b, 0);
      Object.keys(origin).forEach(key => {
        origin[key] = Math.round((origin[key] / total) * 100);
      });
      
      // Determine generation in Israel
      let generation = '';
      const digitSum = idNumber.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
      
      if (digitSum % 7 === 0) {
        generation = 'דור שביעי ומעלה';
      } else if (digitSum % 5 === 0) {
        generation = 'דור שני-שלישי';
      } else if (digitSum % 3 === 0) {
        generation = 'דור ראשון (עולה חדש)';
      } else {
        generation = 'דור רביעי-שישי';
      }
      
      // Determine religious affiliation
      const religiousAffliation = () => {
        const types = ['חרדי', 'דתי-לאומי', 'מסורתי', 'חילוני'];
        const weights = [
          randomValue(10, 90, 7),
          randomValue(10, 90, 8),
          randomValue(10, 90, 9),
          randomValue(10, 90, 10)
        ];
        
        const totalWeight = weights.reduce((a, b) => a + b, 0);
        const normalizedWeights = weights.map(w => Math.round((w / totalWeight) * 100));
        
        return types.reduce((obj, type, i) => {
          obj[type] = normalizedWeights[i];
          return obj;
        }, {});
      };
      
      // Calculate potential for security roles
      const securityPotential = () => {
        const securityCode = parseInt(idNumber.substring(3, 6));
        
        let category = '';
        let score = 0;
        
        if (securityCode >= 200 && securityCode <= 299) {
          category = 'מודיעין';
          score = randomValue(70, 95, 11);
        } else if (securityCode >= 300 && securityCode <= 399) {
          category = 'סייבר';
          score = randomValue(65, 90, 12);
        } else if (securityCode >= 400 && securityCode <= 499) {
          category = 'טכנולוגי';
          score = randomValue(60, 85, 13);
        } else {
          category = 'כללי';
          score = randomValue(30, 70, 14);
        }
        
        return { category, score };
      };
      
      // Age estimate
      const ageEstimate = () => {
        let ageRange = '';
        const firstDigits = parseInt(idNumber.substring(0, 2));
        
        if (firstDigits < 10) {
          ageRange = 'נולד בשנות ה-90 או אחרי';
        } else if (firstDigits < 20) {
          ageRange = 'נולד בשנות ה-80';
        } else if (firstDigits < 30) {
          ageRange = 'נולד בשנות ה-70';
        } else if (firstDigits < 40) {
          ageRange = 'נולד בשנות ה-60';
        } else {
          ageRange = 'נולד לפני שנות ה-60';
        }
        
        return ageRange;
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
        
        // Select 3-5 traits
        const numTraits = randomValue(3, 6, 15);
        const selectedTraits = [];
        
        for (let i = 0; i < numTraits; i++) {
          const idx = randomValue(0, traits.length, 16 + i);
          if (!selectedTraits.includes(traits[idx])) {
            selectedTraits.push(traits[idx]);
          }
        }
        
        return selectedTraits;
      };
      
      // Results
      setResults({
        idNumber,
        isEmergency,
        origin,
        generation,
        religiousAffiliation: religiousAffliation(),
        securityPotential: securityPotential(),
        ageEstimate: ageEstimate(),
        paameiAtidimScore: calculatePaameiScore(),
        personalityTraits: personalityTraits(),
        specialCategory: Math.random() < 0.1 // 10% chance of special category
      });
      
      setAnalyzing(false);
    }, 2000);
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
        <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700 shadow-lg animate-fadeIn">
          <div className="border-b border-gray-700 pb-3 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-yellow-400 mr-2" />
                <h3 className="text-lg font-medium">תוצאות הפענוח</h3>
              </div>
              <div className="px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded">
                {results.isEmergency ? 'מספר חירום' : 'מסווג'}
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-1 text-right">
              מספר ת"ז: {results.idNumber}
            </p>
          </div>
          
          {results.isEmergency && (
            <div className="bg-red-900/30 border border-red-800 rounded-lg p-3 mb-4 text-right">
              <div className="flex items-center mb-2">
                <AlertTriangle className="w-5 h-5 text-red-400 ml-2" />
                <span className="font-bold text-red-400">התראה: מספר חירום</span>
              </div>
              <p className="text-sm text-gray-300">
                זוהה מספר המיועד למצבי חירום או שירותים מיוחדים. הגישה למידע זה מוגבלת.
              </p>
            </div>
          )}
          
          <div className="space-y-6">
            {/* Age Estimate */}
            <div className="text-right">
              <h4 className="text-sm text-gray-400 mb-1 flex items-center justify-end">
                <span>הערכת גיל</span>
                <Users className="w-4 h-4 ml-1 text-blue-400" />
              </h4>
              <p className="text-lg font-medium">{results.ageEstimate}</p>
            </div>
            
            {/* Generation */}
            <div className="text-right">
              <h4 className="text-sm text-gray-400 mb-1 flex items-center justify-end">
                <span>דור בארץ</span>
                <Flag className="w-4 h-4 ml-1 text-blue-400" />
              </h4>
              <p className="text-lg font-medium">{results.generation}</p>
            </div>
            
            {/* Origin */}
            <div className="text-right">
              <h4 className="text-sm text-gray-400 mb-2 flex items-center justify-end">
                <span>מוצא עדתי/אתני (הסתברות)</span>
                <Compass className="w-4 h-4 ml-1 text-blue-400" />
              </h4>
              <div className="space-y-2">
                {Object.entries(results.origin).map(([key, value]) => {
                  let label;
                  switch(key) {
                    case 'ashkenazi': label = 'אשכנזי'; break;
                    case 'sephardic': label = 'ספרדי'; break;
                    case 'mizrahi': label = 'מזרחי'; break;
                    case 'ethiopian': label = 'אתיופי'; break;
                    case 'russian': label = 'עולה מברה"מ לשעבר'; break;
                    case 'sabra': label = 'צבר ישראלי'; break;
                    default: label = key;
                  }
                  
                  return (
                    <div key={key} className="flex items-center justify-between">
                      <div className="w-full max-w-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">{value}%</span>
                          <span className="text-sm">{label}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${value}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Religious Affiliation */}
            <div className="text-right">
              <h4 className="text-sm text-gray-400 mb-2 flex items-center justify-end">
                <span>שיוך דתי (הסתברות)</span>
                <Heart className="w-4 h-4 ml-1 text-blue-400" />
              </h4>
              <div className="space-y-2">
                {Object.entries(results.religiousAffiliation).map(([key, value]) => (
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
                <Lock className="w-4 h-4 ml-1 text-yellow-400" />
              </h4>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-900 border-2 border-blue-600 flex items-center justify-center">
                    <span className="font-bold text-lg">{results.securityPotential.score}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-lg font-medium">מערך {results.securityPotential.category}</span>
                  <span className="text-sm text-gray-400">
                    {results.securityPotential.score >= 80 ? 'התאמה גבוהה מאוד' : 
                     results.securityPotential.score >= 60 ? 'התאמה גבוהה' : 
                     results.securityPotential.score >= 40 ? 'התאמה בינונית' : 'התאמה נמוכה'}
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
                    results.paameiAtidimScore >= 70 ? 'bg-green-500' :
                    results.paameiAtidimScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${results.paameiAtidimScore}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">0</span>
                <span className="text-xs text-gray-500">50</span>
                <span className="text-xs text-gray-500">100</span>
              </div>
              <p className="text-sm mt-2">
                ציון: <span className="font-bold">{results.paameiAtidimScore}</span> - 
                {results.paameiAtidimScore >= 70 ? ' התאמה גבוהה' :
                 results.paameiAtidimScore >= 40 ? ' התאמה בינונית' : ' התאמה נמוכה'}
              </p>
            </div>
            
            {/* Personality Traits */}
            <div className="text-right">
              <h4 className="text-sm text-gray-400 mb-2 flex items-center justify-end">
                <span>אינדיקטור אישיותי</span>
                <FileText className="w-4 h-4 ml-1 text-blue-400" />
              </h4>
              <div className="flex flex-wrap justify-end gap-2">
                {results.personalityTraits.map((trait, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 bg-blue-900/50 border border-blue-800 rounded-full text-sm"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Special Category */}
            {results.specialCategory && (
              <div className="text-right bg-purple-900/30 border border-purple-800 rounded-lg p-3 mt-4">
                <h4 className="text-sm text-purple-400 mb-1 flex items-center justify-end">
                  <span>קטגוריה מיוחדת</span>
                  <Award className="w-4 h-4 ml-1 text-purple-400" />
                </h4>
                <p className="text-sm">זוהה מספר ת"ז המשתייך לקטגוריה מיוחדת. למידע נוסף יש לפנות לרשויות המוסמכות.</p>
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
