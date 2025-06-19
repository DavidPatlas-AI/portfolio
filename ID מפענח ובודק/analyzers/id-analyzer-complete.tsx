import React, { useState } from 'react';
import { Shield, Scan, AlertTriangle, FileText, Award, Flag, Heart, Users, Compass, Star, Database, Info } from 'lucide-react';

export default function IDAnalyzer() {
  const [idNumber, setIdNumber] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

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
      setResults({
        id: idNumber,
        isValid: valid,
        age: {
          range: getAgeRange(idNumber),
          birthYear: getBirthYear(idNumber),
          explanation: getAgeExplanation(idNumber)
        },
        immigration: {
          status: getImmigrationStatus(idNumber),
          origin: getImmigrationOrigin(idNumber),
          period: getImmigrationPeriod(idNumber),
          explanation: getImmigrationExplanation(idNumber)
        },
        generation: {
          value: getGeneration(idNumber),
          explanation: getGenerationExplanation(idNumber)
        },
        location: {
          place: getIssuanceLocation(idNumber),
          explanation: getIssuanceLocationExplanation(idNumber)
        },
        religious: {
          distribution: getReligiousDistribution(idNumber),
          explanation: getReligiousExplanation(idNumber)
        },
        security: {
          category: getSecurityCategory(idNumber),
          score: getSecurityScore(idNumber),
          explanation: getSecurityExplanation(idNumber)
        },
        paamei: {
          score: getPaameiScore(idNumber),
          explanation: getPaameiExplanation(idNumber)
        },
        personality: {
          traits: getPersonalityTraits(idNumber),
          explanation: getPersonalityExplanation(idNumber)
        },
        special: {
          categories: getSpecialCategories(idNumber),
          explanation: getSpecialExplanation(idNumber)
        }
      });
      
      setAnalyzing(false);
    }, 1500);
  };
  
  // Helper functions
  
  function getAgeRange(id) {
    const firstDigits = parseInt(id.substring(0, 2));
    
    if (firstDigits < 10) return 'נולד בשנות ה-90 או אחרי 2000';
    if (firstDigits < 20) return 'נולד בשנות ה-80';
    if (firstDigits < 30) return 'נולד בשנות ה-70';
    if (firstDigits < 40) return 'נולד בשנות ה-60';
    return 'נולד לפני שנות ה-60';
  }
  
  function getBirthYear(id) {
    const firstDigits = parseInt(id.substring(0, 2));
    
    if (firstDigits < 10) return firstDigits > 5 ? 1990 + firstDigits : 2000 + firstDigits;
    if (firstDigits < 20) return 1980 + (firstDigits - 10);
    if (firstDigits < 30) return 1970 + (firstDigits - 20);
    if (firstDigits < 40) return 1960 + (firstDigits - 30);
    return 1950 + (firstDigits - 40);
  }
  
  function getAgeExplanation(id) {
    const firstDigits = parseInt(id.substring(0, 2));
    const birthYear = getBirthYear(id);
    
    return `הספרות ${firstDigits} בתחילת הת"ז מצביעות על לידה בשנת ${birthYear} בקירוב. מספרי ת"ז מוקצים בסדר כרונולוגי, כך שישנה קורלציה בין טווח המספרים לבין שנת הלידה. הדבר מאפשר להעריך את הגיל בדיוק סביר.`;
  }
  
  function getImmigrationStatus(id) {
    const firstDigits = parseInt(id.substring(0, 2));
    const thirdDigits = parseInt(id.substring(0, 3));
    
    if (firstDigits > 0 && firstDigits < 10) return 'עולה חדש';
    if (thirdDigits > 300 && thirdDigits < 320) return 'עולה חדש';
    if (firstDigits > 40 && firstDigits < 50) return 'עולה ותיק';
    return 'לא זוהה כעולה';
  }
  
  function getImmigrationOrigin(id) {
    const firstDigits = parseInt(id.substring(0, 2));
    const thirdDigits = parseInt(id.substring(0, 3));
    
    if (firstDigits > 0 && firstDigits < 10) return 'ברית המועצות לשעבר';
    if (thirdDigits > 300 && thirdDigits < 320) return 'אתיופיה';
    if (firstDigits > 40 && firstDigits < 50) return 'צפון אפריקה/מזרח אירופה';
    return 'ישראל (כנראה)';
  }
  
  function getImmigrationPeriod(id) {
    const firstDigits = parseInt(id.substring(0, 2));
    const thirdDigits = parseInt(id.substring(0, 3));
    
    if (firstDigits > 0 && firstDigits < 10) return 'שנות ה-90';
    if (thirdDigits > 300 && thirdDigits < 320) return 'שנות ה-80/90';
    if (firstDigits > 40 && firstDigits < 50) return 'שנות ה-50';
    return 'לא רלוונטי';
  }
  
  function getImmigrationExplanation(id) {
    const firstDigits = parseInt(id.substring(0, 2));
    const thirdDigits = parseInt(id.substring(0, 3));
    
    if (firstDigits > 0 && firstDigits < 10) {
      return `מספרי ת"ז המתחילים בספרות 0${firstDigits} הונפקו לעולים מברית המועצות לשעבר בתקופת העלייה הגדולה בשנות ה-90. ניתוח מגמות הקצאת המספרים בתקופה זו מראה קורלציה גבוהה למוצא זה.`;
    }
    if (thirdDigits > 300 && thirdDigits < 320) {
      return `טווח המספרים ${thirdDigits}XXX-XX מופיע באופן סטטיסטי בקרב עולים ממבצעי העלייה מאתיופיה. ניתוח מגמות הנפקת מספרי ת"ז בתקופת מבצעי משה ושלמה מראה קורלציה למוצא זה.`;
    }
    if (firstDigits > 40 && firstDigits < 50) {
      return `טווחי מספרים המתחילים ב-4X הונפקו בתקופת העליות הגדולות של שנות ה-50. ההיסטוריה הדמוגרפית מצביעה על הסתברות גבוהה למוצא מצפון אפריקה או מזרח אירופה.`;
    }
    return `לא נמצאו מאפיינים סטטיסטיים מובהקים המעידים על עלייה. בהסתברות גבוהה יותר מדובר באזרח שנולד בישראל ומספר הת"ז הונפק בתהליך רגיל.`;
  }
  
  function getGeneration(id) {
    const immigrationStatus = getImmigrationStatus(id);
    const digitSum = id.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    
    if (immigrationStatus.includes('עולה')) return 'דור ראשון (עולה)';
    if (digitSum % 7 === 0) return 'דור שביעי ומעלה';
    if (digitSum % 5 === 0) return 'דור שני-שלישי';
    if (digitSum % 3 === 0) return 'דור רביעי-שישי';
    return 'לא ניתן לקבוע בוודאות';
  }
  
  function getGenerationExplanation(id) {
    const immigrationStatus = getImmigrationStatus(id);
    const digitSum = id.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    
    if (immigrationStatus.includes('עולה')) {
      return `בהתבסס על ניתוח סטטוס העלייה, זוהה דפוס המאפיין דור ראשון בארץ (עולה). מספר הת"ז מרמז על הנפקה במסגרת תהליך קליטת עלייה.`;
    }
    if (digitSum % 7 === 0) {
      return `סכום הספרות (${digitSum}) מתחלק ב-7 ללא שארית, דפוס שנמצא בקורלציה סטטיסטית עם משפחות ותיקות מאוד בארץ. מדובר בדפוס מספרי נדיר יחסית ברמת הסתברות נמוכה.`;
    }
    if (digitSum % 5 === 0) {
      return `סכום הספרות (${digitSum}) מתחלק ב-5 ללא שארית, דפוס שנמצא בקורלציה עם משפחות דור שני-שלישי בארץ. דפוס זה תואם מספרי ת"ז שהונפקו לצאצאי העולים מהעליות הגדולות של המאה ה-20.`;
    }
    if (digitSum % 3 === 0) {
      return `סכום הספרות (${digitSum}) מתחלק ב-3 ללא שארית, דפוס שנמצא בקורלציה עם משפחות ותיקות בארץ ברמת ודאות בינונית-נמוכה.`;
    }
    return `לא נמצאו דפוסים סטטיסטיים מובהקים המאפשרים קביעת דור בארץ. מדובר במספר ת"ז שאינו מציג מאפיינים ייחודיים בהקשר זה.`;
  }
  
  function getIssuanceLocation(id) {
    const locationCode = parseInt(id.substring(2, 4));
    
    if (locationCode < 10) return 'ירושלים';
    if (locationCode < 20) return 'תל אביב';
    if (locationCode < 30) return 'חיפה';
    if (locationCode < 40) return 'באר שבע';
    if (locationCode < 50) return 'נתניה/חדרה';
    if (locationCode < 60) return 'פתח תקווה/רמלה';
    if (locationCode < 70) return 'אשדוד/אשקלון';
    if (locationCode < 80) return 'צפת/טבריה';
    return 'אחר/לא ידוע';
  }
  
  function getIssuanceLocationExplanation(id) {
    const locationCode = parseInt(id.substring(2, 4));
    
    if (locationCode < 10) {
      return `הספרות ${locationCode} במיקום 3-4 הן בטווח 0-9, המאפיין הנפקות בלשכת האוכלוסין בירושלים. לפי הנהלים המקוריים של משרד הפנים, לכל לשכה הוקצו טווחי מספרים ייעודיים.`;
    }
    if (locationCode < 20) {
      return `הספרות ${locationCode} במיקום 3-4 הן בטווח 10-19, המאפיין הנפקות בלשכת האוכלוסין בתל אביב. לפי נהלי משרד הפנים, לכל לשכה אזורית הוקצו טווחי מספרים ספציפיים.`;
    }
    if (locationCode < 30) {
      return `הספרות ${locationCode} במיקום 3-4 הן בטווח 20-29, המאפיין הנפקות בלשכת האוכלוסין בחיפה. החלוקה הגיאוגרפית של טווחי המספרים נקבעה בתחילת שיטת המספור.`;
    }
    if (locationCode < 40) {
      return `הספרות ${locationCode} במיקום 3-4 הן בטווח 30-39, המאפיין הנפקות בלשכת האוכלוסין בבאר שבע והדרום. זוהי חלוקה היסטורית שנשמרה לאורך שנים.`;
    }
    if (locationCode < 50) {
      return `הספרות ${locationCode} במיקום 3-4 הן בטווח 40-49, המאפיין הנפקות בלשכות האוכלוסין באזור השרון (נתניה/חדרה). דפוס זה נצפה במספרים שהונפקו באזור זה.`;
    }
    return `הספרות ${locationCode} במיקום 3-4 נמצאות מחוץ לטווחים הסטנדרטיים של לשכות האוכלוסין המרכזיות, ויכולות להעיד על לשכה מקומית יותר או על הנפקה במסגרת מיוחדת.`;
  }
  
  function getReligiousDistribution(id) {
    // Get a deterministic distribution based on ID
    const idSum = id.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    const location = getIssuanceLocation(id);
    
    // Base values
    let charedi = 15 + (idSum % 20);
    let datiLeumi = 20 + ((idSum + 1) % 15);
    let masorti = 25 + ((idSum + 2) % 15);
    let chiloni = 15 + ((idSum + 3) % 25);
    
    // Adjust based on location
    if (location === 'ירושלים') {
      charedi += 15;
      chiloni -= 10;
    } else if (location === 'תל אביב') {
      charedi -= 10;
      chiloni += 15;
    } else if (location === 'באר שבע') {
      masorti += 10;
      datiLeumi += 5;
    }
    
    // Ensure positive values
    charedi = Math.max(5, charedi);
    datiLeumi = Math.max(5, datiLeumi);
    masorti = Math.max(5, masorti);
    chiloni = Math.max(5, chiloni);
    
    // Normalize to 100%
    const total = charedi + datiLeumi + masorti + chiloni;
    
    return {
      'חרדי': Math.round((charedi / total) * 100),
      'דתי-לאומי': Math.round((datiLeumi / total) * 100),
      'מסורתי': Math.round((masorti / total) * 100),
      'חילוני': Math.round((chiloni / total) * 100)
    };
  }
  
  function getReligiousExplanation(id) {
    const location = getIssuanceLocation(id);
    
    return `ההסתברויות מבוססות על דפוסים סטטיסטיים הקשורים למקום ההנפקה (${location}), טווח הגיל, ודפוסים מספריים ספציפיים. ישנה קורלציה בין אזור ההנפקה לבין דמוגרפיה דתית; למשל, בירושלים יש ריכוז גבוה יותר של אוכלוסייה חרדית, ובתל אביב של אוכלוסייה חילונית.`;
  }
  
  function getSecurityCategory(id) {
    const securityCode = parseInt(id.substring(3, 6));
    
    if (securityCode >= 200 && securityCode <= 299) return 'מודיעין';
    if (securityCode >= 300 && securityCode <= 399) return 'סייבר';
    if (securityCode >= 400 && securityCode <= 499) return 'טכנולוגי';
    if (securityCode % 13 === 0) return 'יחידות מיוחדות';
    if (securityCode % 7 === 0) return 'פיקוד/הדרכה';
    return 'כללי';
  }
  
  function getSecurityScore(id) {
    const securityCode = parseInt(id.substring(3, 6));
    const idSum = id.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    
    if (securityCode >= 200 && securityCode <= 299) {
      return Math.min(95, Math.max(70, 70 + (idSum % 25)));
    }
    if (securityCode >= 300 && securityCode <= 399) {
      return Math.min(90, Math.max(65, 65 + (idSum % 25)));
    }
    if (securityCode >= 400 && securityCode <= 499) {
      return Math.min(85, Math.max(60, 60 + (idSum % 25)));
    }
    if (securityCode % 13 === 0) {
      return Math.min(88, Math.max(68, 68 + (idSum % 20)));
    }
    if (securityCode % 7 === 0) {
      return Math.min(82, Math.max(62, 62 + (idSum % 20)));
    }
    return Math.min(70, Math.max(30, 30 + (idSum % 40)));
  }
  
  function getSecurityExplanation(id) {
    const securityCode = parseInt(id.substring(3, 6));
    
    if (securityCode >= 200 && securityCode <= 299) {
      return `הספרות ${securityCode} במיקום 4-6 נמצאות בטווח המאפיין פרופילים עם פוטנציאל גבוה לשיבוץ בתפקידי מודיעין, לפי ניתוח סטטיסטי מבוסס דפוסים. ניתוח מגמות שיבוץ מראה קורלציה גבוהה בין טווח זה לבין תפקידים במערך המודיעין.`;
    }
    if (securityCode >= 300 && securityCode <= 399) {
      return `הספרות ${securityCode} במיקום 4-6 נמצאות בטווח המאפיין התאמה לתפקידי סייבר והגנת מידע, לפי ניתוח דפוסי מספרים ושיבוצים. ניתוח מגמות מראה קורלציה בין טווח זה לבין תפקידים טכנולוגיים בדגש על סייבר.`;
    }
    if (securityCode >= 400 && securityCode <= 499) {
      return `הספרות ${securityCode} במיקום 4-6 נמצאות בטווח המאפיין התאמה לתפקידים טכנולוגיים ומחקר בתחום הביטחון, לפי ניתוח מגמות. דפוסים בטווח זה מראים יחס גבוה לתפקידי פיתוח וטכנולוגיה.`;
    }
    if (securityCode % 13 === 0) {
      return `הספרות ${securityCode} מתחלקות ב-13 ללא שארית, תכונה מספרית שנמצאה במאפייני מספרי ת"ז של משרתים ביחידות מיוחדות בתדירות גבוהה מהממוצע.`;
    }
    if (securityCode % 7 === 0) {
      return `הספרות ${securityCode} מתחלקות ב-7 ללא שארית, תכונה מספרית שנמצאה במאפייני מספרי ת"ז של משרתים בתפקידי פיקוד והדרכה בתדירות גבוהה מהממוצע.`;
    }
    return `לא זוהו דפוסים ספציפיים המאפיינים התאמה לתפקידים ביטחוניים מיוחדים. ההערכה מבוססת על ניתוח כללי של המספר והמאפיינים הדמוגרפיים המשוערים.`;
  }
  
  function getPaameiScore(id) {
    const digits = id.split('').map(d => parseInt(d));
    const oddSum = digits.filter((_, i) => i % 2 === 0).reduce((a, b) => a + b, 0);
    const evenSum = digits.filter((_, i) => i % 2 === 1).reduce((a, b) => a + b, 0);
    
    // Avoid division by zero
    if (evenSum === 0) return 50;
    
    const ratio = oddSum / evenSum;
    return Math.min(100, Math.max(0, Math.round(ratio * 33)));
  }
  
  function getPaameiExplanation(id) {
    const digits = id.split('').map(d => parseInt(d));
    const oddSum = digits.filter((_, i) => i % 2 === 0).reduce((a, b) => a + b, 0);
    const evenSum = digits.filter((_, i) => i % 2 === 1).reduce((a, b) => a + b, 0);
    const ratio = evenSum === 0 ? 1.5 : oddSum / evenSum;
    const score = Math.min(100, Math.max(0, Math.round(ratio * 33)));
    
    return `מדד "פעמי עתידים" הוא אומדן להתאמה לתוכנית מצוינות. הציון מחושב לפי היחס בין סכום הספרות במקומות אי-זוגיים (${oddSum}) לבין סכום הספרות במקומות זוגיים (${evenSum}). היחס ${ratio.toFixed(2)} מוכפל ב-33 ומעוגל לציון סופי ${score}. ניתוח מדגם נרחב הראה שדפוסים מספריים אלו מתואמים עם מדד "פעמי עתידים" בהסתברות גבוהה.`;
  }
  
  function getPersonalityTraits(id) {
    const traits = [
      'אנליטי', 'יצירתי', 'מנהיגותי', 'מתמטי', 'לשוני', 
      'חברתי', 'טכנולוגי', 'אמנותי', 'מדעי', 'הומניסטי'
    ];
    
    // Create a deterministic but seemingly random selection based on ID
    const idSum = id.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    const selectedIndices = [];
    let current = idSum % traits.length;
    
    // Select 3-4 traits
    const numTraits = 3 + (idSum % 2);
    
    for (let i = 0; i < numTraits; i++) {
      if (!selectedIndices.includes(current)) {
        selectedIndices.push(current);
      }
      current = (current + parseInt(id[i % 9])) % traits.length;
    }
    
    return selectedIndices.map(idx => traits[idx]);
  }
  
  function getPersonalityExplanation(id) {
    const idSum = id.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    
    return `האינדיקטור האישיותי מבוסס על דפוסים מספריים בתעודת הזהות. ניתוח סכום הספרות (${idSum}), מיקומי הספרות, והיחסים ביניהן, יוצר "טביעת אצבע" אישיותית. מבוססת על מחקר של דפוסים קוגניטיביים והקשר שלהם למאפיינים מספריים.`;
  }
  
  function getSpecialCategories(id) {
    const categories = [];
    const sixthDigit = parseInt(id.substring(5, 6));
    const eighthDigit = parseInt(id.substring(7, 8));
    const fifthDigit = parseInt(id.substring(4, 5));
    
    // Special needs
    if (sixthDigit === 7) {
      categories.push('בעל צרכים מיוחדים (הסתברות נמוכה)');
    }
    
    // Large family
    if (eighthDigit === 8) {
      categories.push('משפחה מרובת ילדים (הסתברות נמוכה)');
    }
    
    // Unique community
    if (fifthDigit === 3) {
      categories.push('שייך לקהילה קטנה/ייחודית (הסתברות נמוכה)');
    }
    
    // Prominent family
    if (parseInt(id.substring(3, 5)) === 11) {
      categories.push('בן למשפחה ידועה (הסתברות נמוכה מאוד)');
    }
    
    return categories;
  }
  
  function getSpecialExplanation(id) {
    return `קטגוריות מיוחדות מזוהות לפי דפוסים סטטיסטיים נדירים. ספרות במיקומים ספציפיים במספר הת"ז נמצאו כמתואמות עם מאפיינים דמוגרפיים מסוימים. מדובר בהסתברויות נמוכות המבוססות על ניתוח דפוסים.`;
  }

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
          <h3 className="text-lg font-medium">הזן מספר תעודת זהות לפענוח מקיף</h3>
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
            <button
              onClick={() => setActiveTab('explanations')}
              className={`px-3 py-2 text-sm font-medium ${
                activeTab === 'explanations'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              הסברים מלאים
            </button>
          </div>
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Age Estimate */}
              <div className="text-right">
                <h4 className="text-sm text-gray-400 mb-1 flex items-center justify-end">
                  <span>הערכת גיל</span>
                  <Users className="w-4 h-4 ml-1 text-blue-400" />
                </h4>
                <p className="text-lg font-medium">{results.age.range}</p>
                <p className="text-sm text-gray-400">שנת לידה משוערת: {results.age.birthYear}</p>
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
                  <span className="text-sm text-gray-400">תקופה: {results.immigration.period}</span>
                </div>
              </div>
              
              {/* Generation */}
              <div className="text-right">
                <h4 className="text-sm text-gray-400 mb-1 flex items-center justify-end">
                  <span>דור בארץ</span>
                  <Flag className="w-4 h-4 ml-1 text-blue-400" />
                </h4>
                <p className="text-lg font-medium">{results.generation.value}</p>
              </div>
              
              {/* Issuance Location */}
              <div className="text-right">
                <h4 className="text-sm text-gray-400 mb-1 flex items-center justify-end">
                  <span>מקום הנפקה ראשוני</span>
                  <Compass className="w-4 h-4 ml-1 text-blue-400" />
                </h4>
                <p className="text-lg font-medium">{results.location.place}</p>
              </div>
              
              {/* Religious Affiliation */}
              <div className="text-right">
                <h4 className="text-sm text-gray-400 mb-2 flex items-center justify-end">
                  <span>שיוך דתי (הסתברות)</span>
                  <Heart className="w-4 h-4 ml-1 text-blue-400" />
                </h4>
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
              
              {/* Personality Traits */}
              <div className="text-right">
                <h4 className="text-sm text-gray-400 mb-2 flex items-center justify-end">
                  <span>אינדיקטור אישיותי</span>
                  <FileText className="w-4 h-4 ml-1 text-blue-400" />
                </h4>
                <div className="flex flex-wrap justify-end gap-2">
                  {results.personality.traits.map((trait, i) => (
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
              {results.special.categories.length > 0 && (
                <div className="text-right">
                  <h4 className="text-sm text-gray-400 mb-2 flex items-center justify-end">
                    <span>קטגוריות מיוחדות</span>
                    <Award className="w-4 h-4 ml-1 text-purple-400" />
                  </h4>
                  <div className="flex flex-wrap justify-end gap-2">
                    {results.special.categories.map((category, i) => (
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
          )}
          
          {/* Personal Tab */}
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <div className="text-right">
                <h4 className="text-sm text-gray-400 mb-1 flex items-center justify-end">
                  <span>הערכת גיל</span>
                  <Users className="w-4 h-4 ml-1 text-blue-400" />
                </h4>
                <p className="text-lg font-medium">{results.age.range}</p>
                <p className="text-sm text-gray-400">שנת לידה משוערת: {results.age.birthYear}</p>
                <div className="mt-2 p-2 bg-gray-900 rounded-lg text-sm text-gray-300">
                  <p className="text-right">{results.age.explanation}</p>
                </div>
              </div>
              
              <div className="text-right">
                <h4 className="text-sm text-gray-400 mb-1 flex items-center justify-end">
                  <span>סטטוס עלייה</span>
                  <Compass className="w-4 h-4 ml-1 text-blue-400" />
                </h4>
                <p className="text-lg font-medium">{results.immigration.status}</p>
                <div className="mt-1 flex flex-col">
                  <span className="text-sm text-gray-400">מוצא: {results.immigration.origin}</span>
                  <span className="text-sm text-gray-400">תקופה: {results.immigration.period}</span>
                </div>
                <div className="mt-2 p-2 bg-gray-900 rounded-lg text-sm text-gray-300">
                  <p className="text-right">{results.immigration.explanation}</p>
                </div>
              </div>
              
              <div className="text-right">
                <h4 className="text-sm text-gray-400 mb-1 flex items-center justify-end">
                  <span>דור בארץ</span>
                  <Flag className="w-4 h-4 ml-1 text-blue-400" />
                </h4>
                <p className="text-lg font-medium">{results.generation.value}</p>
                <div className="mt-2 p-2 bg-gray-900 rounded-lg text-sm text-gray-300">
                  <p className="text-right">{results.generation.explanation}</p>
                </div>
              </div>
              
              <div className="text-right">
                <h4 className="text-sm text-gray-400 mb-1 flex items-center justify-end">
                  <span>מקום הנפקה ראשוני</span>
                  <Compass className="w-4 h-4 ml-1 text-blue-400" />
                </h4>
                <p className="text-lg font-medium">{results.location.place}</p>
                <div className="mt-2 p-2 bg-gray-900 rounded-lg text-sm text-gray-300">
                  <p className="text-right">{results.location.explanation}</p>
                </div>
              </div>
              
              <div className="text-right">
                <h4 className="text-sm text-gray-400 mb-2 flex items-center justify-end">
                  <span>שיוך דתי (הסתברות)</span>
                  <Heart className="w-4 h-4 ml-1 text-blue-400" />
                </h4>
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
                <div className="mt-2 p-2 bg-gray-900 rounded-lg text-sm text-gray-300">
                  <p className="text-right">{results.religious.explanation}</p>
                </div>
              </div>
              
              <div className="text-right">
                <h4 className="text-sm text-gray-400 mb-2 flex items-center justify-end">
                  <span>אינדיקטור אישיותי</span>
                  <FileText className="w-4 h-4 ml-1 text-blue-400" />
                </h4>
                <div className="flex flex-wrap justify-end gap-2">
                  {results.personality.traits.map((trait, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-blue-900/50 border border-blue-800 rounded-full text-sm"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
                <div className="mt-2 p-2 bg-gray-900 rounded-lg text-sm text-gray-300">
                  <p className="text-right">{results.personality.explanation}</p>
                </div>
              </div>
              
              {results.special.categories.length > 0 && (
                <div className="text-right">
                  <h4 className="text-sm text-gray-400 mb-2 flex items-center justify-end">
                    <span>קטגוריות מיוחדות</span>
                    <Award className="w-4 h-4 ml-1 text-purple-400" />
                  </h4>
                  <div className="flex flex-wrap justify-end gap-2">
                    {results.special.categories.map((category, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-purple-900/50 border border-purple-800 rounded-full text-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 p-2 bg-gray-900 rounded-lg text-sm text-gray-300">
                    <p className="text-right">{results.special.explanation}</p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="text-right">
                <h4 className="text-sm text-gray-400 mb-1 flex items-center justify-end">
                  <span>פוטנציאל לתפקיד ביטחוני</span>
                  <Shield className="w-4 h-4 ml-1 text-yellow-400" />
                </h4>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-20 h-20 rounded-full bg-blue-900 border-2 border-blue-600 flex items-center justify-center">
                      <span className="font-bold text-2xl">{results.security.score}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-xl font-medium">מערך {results.security.category}</span>
                    <span className="text-base text-gray-300">
                      {results.security.score >= 80 ? 'התאמה גבוהה מאוד' : 
                       results.security.score >= 60 ? 'התאמה גבוהה' : 
                       results.security.score >= 40 ? 'התאמה בינונית' : 'התאמה נמוכה'}
                    </span>
                  </div>
                </div>
                <div className="mt-4 p-2 bg-gray-900 rounded-lg text-sm text-gray-300">
                  <p className="text-right">{results.security.explanation}</p>
                </div>
              </div>
              
              <div className="text-right">
                <h4 className="text-sm text-gray-400 mb-1 flex items-center justify-end">
                  <span>מדד "פעמי עתידים"</span>
                  <Star className="w-4 h-4 ml-1 text-yellow-400" />
                </h4>
                <div className="w-full h-4 bg-gray-700 rounded-full">
                  <div 
                    className={`h-4 rounded-full ${
                      results.paamei.score >= 70 ? 'bg-green-500' :
                      results.paamei.score >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${results.paamei.score}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">0</span>
                  <span className="text-xs text-gray-500">50</span>
                  <span className="text-xs text-gray-500">100</span>
                </div>
                <p className="text-sm mt-2 font-medium">
                  ציון: <span className="font-bold">{results.paamei.score}</span> - 
                  {results.paamei.score >= 70 ? ' התאמה גבוהה' :
                   results.paamei.score >= 40 ? ' התאמה בינונית' : ' התאמה נמוכה'}
                </p>
                <div className="mt-4 p-2 bg-gray-900 rounded-lg text-sm text-gray-300">
                  <p className="text-right">{results.paamei.explanation}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Explanations Tab */}
          {activeTab === 'explanations' && (
            <div className="space-y-6">
              <div className="text-right">
                <h4 className="text-lg font-medium mb-2 border-b border-gray-700 pb-2">השיטה המתמטית לפענוח מספרי תעודת זהות</h4>
                <p className="text-sm text-gray-300 mb-2">
                  המפענח מבוסס על ניתוח מורכב של דפוסים מספריים בתעודות זהות ישראליות. שיטת הפענוח מתבססת על מספר עקרונות:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 pr-4">
                  <li>ניתוח הספרות במיקומים שונים בתעודת הזהות</li>
                  <li>בחינת היחסים המתמטיים בין ספרות וקבוצות ספרות</li>
                  <li>קורלציות סטטיסטיות בין טווחי מספרים לבין מאפיינים דמוגרפיים</li>
                  <li>דפוסי הנפקה היסטוריים של מספרי ת"ז לקבוצות אוכלוסייה שונות</li>
                  <li>גילוי דפוסים חוזרים באמצעות אלגוריתמים מתקדמים</li>
                </ul>
              </div>
              
              <div className="text-right">
                <h4 className="text-lg font-medium mb-2 border-b border-gray-700 pb-2">כיצד מחושב גיל ושנת לידה?</h4>
                <p className="text-sm text-gray-300 mb-2">
                  מספרי תעודות זהות ניתנים בסדר כרונולוגי, כך שטווחי מספרים מסוימים מתאימים לתקופות לידה מסוימות. הספרות הראשונות במספר ת"ז מספקות אינדיקציה לשנת הלידה המשוערת:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 pr-4">
                  <li>00XXXXX-XX: ילידי שנות ה-90 ואילך</li>
                  <li>01XXXXX-XX: ילידי שנות ה-80</li>
                  <li>02XXXXX-XX: ילידי שנות ה-70</li>
                  <li>03XXXXX-XX: ילידי שנות ה-60</li>
                  <li>04XXXXX-XX עד 08XXXXX-XX: ילידי שנות ה-50 ומטה</li>
                </ul>
              </div>
              
              <div className="text-right">
                <h4 className="text-lg font-medium mb-2 border-b border-gray-700 pb-2">איך מזוהים עולים ומוצא?</h4>
                <p className="text-sm text-gray-300 mb-2">
                  מספרי ת"ז שהונפקו לעולים חדשים בתקופות עלייה מסוימות נמצאים בטווחים ייחודיים:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 pr-4">
                  <li>מספרים המתחילים ב-0 (אך לא ב-00): עולי ברית המועצות לשעבר, שנות ה-90</li>
                  <li>מספרים בטווח 300XXX-320XXX: עולי אתיופיה, מבצעי משה/שלמה</li>
                  <li>מספרים המתחילים ב-4X: עולי צפון אפריקה/מזרח אירופה, שנות ה-50</li>
                </ul>
              </div>
              
              <div className="text-right">
                <h4 className="text-lg font-medium mb-2 border-b border-gray-700 pb-2">כיצד נקבע דור בארץ?</h4>
                <p className="text-sm text-gray-300 mb-2">
                  הדור בארץ נקבע על פי מספר פרמטרים:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 pr-4">
                  <li>זיהוי כעולה חדש: דור ראשון</li>
                  <li>סכום ספרות המתחלק ב-5: דור שני-שלישי בארץ (הסתברות בינונית)</li>
                  <li>סכום ספרות המתחלק ב-3: דור רביעי-שישי (הסתברות נמוכה-בינונית)</li>
                  <li>סכום ספרות המתחלק ב-7: דור שביעי ומעלה (הסתברות נמוכה)</li>
                </ul>
              </div>
              
              <div className="text-right">
                <h4 className="text-lg font-medium mb-2 border-b border-gray-700 pb-2">מה מסמלות הספרות במיקומים שונים?</h4>
                <p className="text-sm text-gray-300 mb-2">
                  לספרות במיקומים שונים במספר הת"ז יש משמעויות שונות:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 pr-4">
                  <li>ספרות 1-2: אינדיקציה לתקופת הלידה/הנפקה</li>
                  <li>ספרות 3-4: מקום ההנפקה (לשכת האוכלוסין)</li>
                  <li>ספרות 4-6: פוטנציאל לתפקידים ביטחוניים</li>
                  <li>ספרה 5: אינדיקציה לקהילות ייחודיות (אם = 3)</li>
                  <li>ספרה 6: אינדיקציה לצרכים מיוחדים (אם = 7)</li>
                  <li>ספרה 8: אינדיקציה למשפחות מרובות ילדים (אם = 8)</li>
                  <li>ספרה 9: ספרת ביקורת המחושבת לפי אלגוריתם מתמטי</li>
                </ul>
              </div>
              
              <div className="text-right">
                <h4 className="text-lg font-medium mb-2 border-b border-gray-700 pb-2">הערה חשובה</h4>
                <p className="text-sm text-gray-300">
                  חשוב לציין שמדובר במודל סטטיסטי בלבד המבוסס על ניתוח דפוסים. התוצאות מוצגות ברמות הסתברות שונות ואינן ודאיות. במציאות, מספרי תעודות זהות ישראליות אינם מקודדים באופן רשמי עם מידע על מוצא, דת, או מאפיינים אישיים.
                </p>
              </div>
            </div>
          )}
          
          <div className="mt-6 pt-4 border-t border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">
                גרסה 2.3 - מפענח ת"ז מתקדם
              </span>
              <div className="flex items-center">
                <Info className="w-3 h-3 text-blue-400 mr-1" />
                <span className="text-xs text-blue-400">הניתוח מבוסס על אלגוריתם סטטיסטי</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <footer className="text-center mt-auto text-xs text-gray-500 p-2">
        <p>המפענח הסודי - המידע מוצג למטרות בידור בלבד</p>
        <p>במציאות, ת"ז אינה מכילה מידע מקודד על מוצא, דת או מאפיינים אישיים</p>
      </footer>
    </div>
  );
}