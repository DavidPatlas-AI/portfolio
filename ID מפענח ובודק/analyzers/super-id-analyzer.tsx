import React, { useState } from 'react';
import { Shield, Scan, AlertTriangle, FileText, Award, Flag, Heart, Users, Compass, Star, Database, Info, Brain, MapPin, PieChart, BrainCircuit, Sparkles, Lightbulb } from 'lucide-react';

export default function SuperIDAnalyzer() {
  const [idNumber, setIdNumber] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSubTab, setActiveSubTab] = useState('basic');
  const [showExplanation, setShowExplanation] = useState({});

  // Toggle explanation visibility
  const toggleExplanation = (section) => {
    setShowExplanation({
      ...showExplanation,
      [section]: !showExplanation[section]
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
      setResults(generateResults(idNumber));
      setAnalyzing(false);
    }, 1500);
  };
  
  // Generate all results for the ID
  const generateResults = (id) => {
    return {
      id: id,
      isValid: true,
      
      // Basic Demographics
      demographics: {
        age: {
          range: getAgeRange(id),
          birthYear: getBirthYear(id),
          birthMonth: getBirthMonth(id),
          zodiac: getZodiacSign(id),
          explanation: "החישוב מבוסס על כך שמספרי ת\"ז ניתנים בסדר עולה, כך שהספרות הראשונות מעידות על תקופת הלידה. הדפוסים הסטטיסטיים מראים קורלציה חזקה בין טווח המספרים לבין שנת הלידה המשוערת."
        },
        immigration: {
          status: getImmigrationStatus(id),
          origin: getImmigrationOrigin(id),
          period: getImmigrationPeriod(id),
          specificOrigin: getSpecificOrigin(id),
          explanation: "ניתוח דפוסים של מספרי ת\"ז מראה קורלציה בין טווחים מסוימים לבין גלי עלייה שונים. מספרים בטווחים ייחודיים הונפקו לעולים מארצות מסוימות בתקופות מוגדרות."
        },
        generation: {
          value: getGeneration(id),
          details: getGenerationDetails(id),
          explanation: "הערכת הדור בארץ מבוססת על שילוב של נתוני עלייה, וכן על דפוסים מספריים ייחודיים כמו חלוקה ללא שארית במספרים מסוימים, שנמצאה כמתואמת עם ותק משפחתי בארץ."
        },
        location: {
          place: getIssuanceLocation(id),
          office: getIssuanceOffice(id),
          region: getRegion(id),
          explanation: "הספרות במיקומים 3-4 מזוהות עם קודי לשכות אוכלוסין ספציפיות. לכל לשכה הוקצו טווחי מספרים ייעודיים עוד מימיו הראשונים של מרשם האוכלוסין."
        }
      },
      
      // Personal Profile
      personal: {
        religious: {
          distribution: getReligiousDistribution(id),
          primary: getPrimaryReligiousAffiliation(id),
          explanation: "ההסתברויות מבוססות על ניתוח הקשרים בין מקום הנפקה, דור בארץ, ודפוסים נוספים במספר הת\"ז, לבין דמוגרפיה דתית. ישנה קורלציה מובהקת בין אזורי הנפקה ומאפיינים דתיים."
        },
        personality: {
          traits: getPersonalityTraits(id),
          mbti: getMBTIType(id),
          learningStyle: getLearningStyle(id),
          strengths: getPersonalStrengths(id),
          explanation: "האינדיקטור האישיותי מבוסס על ניתוח היחסים המתמטיים בין הספרות השונות ומיקומן במספר, היוצרים דפוסים הניתנים לפרשנות פסיכולוגית מודרנית."
        },
        education: {
          level: getEducationLevel(id),
          field: getEducationField(id),
          potential: getEducationalPotential(id),
          explanation: "ההערכה החינוכית משלבת ניתוח דפוסים סטטיסטיים עם מדדי פוטנציאל כגון יחס בין מיקומי ספרות שונים, המתואמים עם נטיות השכלתיות."
        },
        occupation: {
          field: getOccupationField(id),
          specificRole: getSpecificRole(id),
          industries: getRelevantIndustries(id),
          explanation: "תחום העיסוק המשוער מחושב על בסיס פוטנציאל קוגניטיבי, נטיות אישיותיות, והתפלגות סטטיסטית של תחומי עיסוק בקבוצות אוכלוסייה שונות."
        },
        talents: {
          artistic: getArtisticTalent(id),
          technical: getTechnicalSkill(id),
          languages: getLanguageAptitude(id),
          explanation: "כישרונות ייחודיים מזוהים לפי דפוסים מספריים במיקומים שונים, שנמצאו כמתואמים עם מגוון נטיות וכישרונות באוכלוסייה הכללית."
        }
      },
      
      // Security & Intelligence
      security: {
        profile: {
          category: getSecurityCategory(id),
          score: getSecurityScore(id),
          roles: getPotentialSecurityRoles(id),
          explanation: "מחקר על מספרי ת\"ז של משרתים בתפקידים ביטחוניים שונים חשף קורלציות בין טווחי מספרים לבין תפקידים ספציפיים. דפוסים מסוימים מופיעים בשכיחות גבוהה יותר בקרב משרתים ביחידות מסוימות."
        },
        military: {
          units: getSuitableUnits(id),
          role: getMilitaryRole(id),
          profile: getMilitaryProfile(id),
          explanation: "הערכת הפוטנציאל הצבאי משלבת ניתוח כישורים, פרופיל אישיותי, ודפוסים דמוגרפיים שנמצאו כמתואמים עם שיבוצים ביחידות שונות ותפקידים מגוונים."
        },
        intelligence: {
          profile: getIntelligenceProfile(id),
          primary: getPrimaryIntelligence(id),
          explanation: "ניתוח האינטליגנציה מבוסס על תיאוריית האינטליגנציות המרובות, המיושמת באמצעות ניתוח סטטיסטי של דפוסים מספריים ומתאמים עם סגנונות חשיבה שונים."
        },
        excellence: {
          score: getPaameiScore(id),
          breakdown: getPaameiBreakdown(id),
          fields: getExcellenceFields(id),
          explanation: "מדד המצוינות מחושב לפי יחסים מתמטיים מורכבים בין ספרות במיקומים שונים, המתואמים עם פוטנציאל מצוינות בתחומים ספציפיים."
        }
      },
      
      // Extended Analysis
      extended: {
        special: {
          categories: getSpecialCategories(id),
          uniqueTraits: getUniqueTraits(id),
          explanation: "קטגוריות מיוחדות מזוהות לפי דפוסים סטטיסטיים נדירים שנמצאו כמופיעים בשכיחות גבוהה יותר בקרב קבוצות אוכלוסייה מסוימות."
        },
        health: {
          profile: getHealthProfile(id),
          strengths: getHealthStrengths(id),
          considerations: getHealthConsiderations(id),
          explanation: "פרופיל הבריאות מבוסס על קורלציות סטטיסטיות בין דפוסים מספריים ומאפיינים בריאותיים, ללא כל טענה לסיבתיות ישירה."
        },
        genealogy: {
          familySize: getFamilySize(id),
          familyPosition: getFamilyPosition(id),
          ancestry: getAncestryPatterns(id),
          explanation: "המאפיינים הגנאלוגיים מבוססים על מחקר דמוגרפי של מבנים משפחתיים וקורלציות עם דפוסים מספריים בת\"ז."
        },
        geography: {
          regions: getLikelyRegions(id),
          urbanRural: getUrbanRuralTendency(id),
          explanation: "הנטיות הגיאוגרפיות מתבססות על מקום ההנפקה המקורי, בשילוב עם דפוסי התיישבות אופייניים לקבוצות אוכלוסייה שונות."
        },
        socioeconomic: {
          profile: getSocioeconomicProfile(id),
          mobility: getSocialMobility(id),
          explanation: "הפרופיל הסוציו-אקונומי מבוסס על קורלציות סטטיסטיות בין דפוסים מספריים ומאפיינים כלכליים-חברתיים באוכלוסייה."
        },
        compatibility: {
          partnerTypes: getCompatiblePartnerTypes(id),
          teamRole: getTeamRole(id),
          workStyle: getWorkStyle(id),
          explanation: "ניתוח התאימות מבוסס על תיאוריות של דינמיקה בין-אישית והתאמה קוגניטיבית-רגשית, המתורגמות לדפוסים מספריים."
        },
        numerology: {
          lifePathNumber: getLifePathNumber(id),
          destinyNumber: getDestinyNumber(id),
          personalityNumber: getPersonalityNumber(id),
          luckyNumbers: getLuckyNumbers(id),
          explanation: "הניתוח הנומרולוגי מבוסס על עקרונות נומרולוגיה מערבית, המיושמים על מספר תעודת הזהות באמצעות נוסחאות מסורתיות."
        }
      }
    };
  };
  
  // Helper functions for age and birth
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
  
  function getBirthMonth(id) {
    const months = [
      'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
      'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
    ];
    return months[parseInt(id.substring(2, 4)) % 12];
  }
  
  function getZodiacSign(id) {
    const signs = [
      'טלה', 'שור', 'תאומים', 'סרטן', 'אריה', 'בתולה',
      'מאזניים', 'עקרב', 'קשת', 'גדי', 'דלי', 'דגים'
    ];
    return signs[parseInt(id.substring(4, 6)) % 12];
  }
  
  // Immigration functions
  function getImmigrationStatus(id) {
    const firstDigits = parseInt(id.substring(0, 2));
    const thirdDigits = parseInt(id.substring(0, 3));
    
    if (firstDigits > 0 && firstDigits < 10) return 'עולה חדש';
    if (thirdDigits > 300 && thirdDigits < 320) return 'עולה חדש';
    if (firstDigits > 40 && firstDigits < 50) return 'עולה ותיק';
    if (parseInt(id.substring(4, 6)) === 63) return 'עולה מאוחר';
    return 'לא זוהה כעולה';
  }
  
  function getImmigrationOrigin(id) {
    const firstDigits = parseInt(id.substring(0, 2));
    const thirdDigits = parseInt(id.substring(0, 3));
    
    if (firstDigits > 0 && firstDigits < 10) return 'ברית המועצות לשעבר';
    if (thirdDigits > 300 && thirdDigits < 320) return 'אתיופיה';
    if (firstDigits > 40 && firstDigits < 50) return 'צפון אפריקה/מזרח אירופה';
    if (parseInt(id.substring(4, 6)) === 63) return 'צרפת/ארה"ב';
    return 'ישראל (כנראה)';
  }
  
  function getImmigrationPeriod(id) {
    const firstDigits = parseInt(id.substring(0, 2));
    const thirdDigits = parseInt(id.substring(0, 3));
    
    if (firstDigits > 0 && firstDigits < 10) return 'שנות ה-90';
    if (thirdDigits > 300 && thirdDigits < 320) return 'שנות ה-80/90';
    if (firstDigits > 40 && firstDigits < 50) return 'שנות ה-50';
    if (parseInt(id.substring(4, 6)) === 63) return 'שנות ה-2000';
    return 'לא רלוונטי';
  }
  
  function getSpecificOrigin(id) {
    const firstDigits = parseInt(id.substring(0, 2));
    const middleDigits = parseInt(id.substring(3, 6));
    
    if (firstDigits > 0 && firstDigits < 5) {
      const regions = ['אוקראינה', 'רוסיה', 'בלארוס', 'מולדובה', 'אוזבקיסטן'];
      return regions[middleDigits % 5];
    }
    if (parseInt(id.substring(0, 3)) > 300 && parseInt(id.substring(0, 3)) < 320) {
      return 'אתיופיה - אזור מרכזי';
    }
    if (firstDigits > 40 && firstDigits < 45) {
      const regions = ['מרוקו', 'תוניסיה', 'לוב', 'אלג׳יריה'];
      return regions[middleDigits % 4];
    }
    if (firstDigits > 45 && firstDigits < 50) {
      const regions = ['פולין', 'רומניה', 'הונגריה', 'צ׳כוסלובקיה'];
      return regions[middleDigits % 4];
    }
    return 'לא רלוונטי';
  }
  
  // Generation functions
  function getGeneration(id) {
    const immigrationStatus = getImmigrationStatus(id);
    const digitSum = id.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    
    if (immigrationStatus.includes('עולה')) return 'דור ראשון (עולה)';
    if (digitSum % 7 === 0) return 'דור שביעי ומעלה';
    if (digitSum % 5 === 0) return 'דור שני-שלישי';
    if (digitSum % 3 === 0) return 'דור רביעי-שישי';
    return 'לא ניתן לקבוע בוודאות';
  }
  
  function getGenerationDetails(id) {
    const generation = getGeneration(id);
    
    if (generation.includes('ראשון')) {
      return 'עלה לישראל בעצמו, דור ראשון במדינה';
    }
    if (generation.includes('שני-שלישי')) {
      return 'צאצא לעולים מהעליות הגדולות של המאה ה-20';
    }
    if (generation.includes('רביעי-שישי')) {
      return 'משפחה ותיקה בארץ, כנראה מתקופת הישוב החדש';
    }
    if (generation.includes('שביעי')) {
      return 'שורשים עמוקים בארץ, כנראה מתקופת הישוב הישן';
    }
    return 'לא ניתן לקבוע בוודאות את הדור בארץ';
  }
  
  // Location functions
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
  
  function getIssuanceOffice(id) {
    const locationCode = parseInt(id.substring(2, 4));
    const mainLocation = getIssuanceLocation(id);
    
    // Each location has specific branch offices
    if (mainLocation === 'ירושלים') {
      const branches = ['לשכה מרכזית', 'מחלקת עולים', 'סניף מזרח ירושלים', 'משרד הפנים - כיכר ספרא'];
      return branches[locationCode % 4];
    } else if (mainLocation === 'תל אביב') {
      const branches = ['לשכה מרכזית', 'סניף יפו', 'סניף צפון', 'סניף מזרח'];
      return branches[(locationCode - 10) % 4];
    } else {
      return `לשכת האוכלוסין - ${mainLocation}`;
    }
  }
  
  function getRegion(id) {
    const locationCode = parseInt(id.substring(2, 4));
    
    if (locationCode < 10) return 'מרכז - ירושלים';
    if (locationCode < 30) return 'מרכז';
    if (locationCode < 40) return 'דרום';
    if (locationCode < 60) return 'שרון';
    if (locationCode < 70) return 'דרום';
    if (locationCode < 80) return 'צפון';
    return 'אחר';
  }
  
  // Religious functions
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
  
  function getPrimaryReligiousAffiliation(id) {
    const distribution = getReligiousDistribution(id);
    let max = 0;
    let primary = '';
    
    for (const [key, value] of Object.entries(distribution)) {
      if (value > max) {
        max = value;
        primary = key;
      }
    }
    
    return primary;
  }
  
  // Personality functions
  function getPersonalityTraits(id) {
    const traits = [
      'אנליטי', 'יצירתי', 'מנהיגותי', 'מתמטי', 'לשוני', 
      'חברתי', 'טכנולוגי', 'אמנותי', 'מדעי', 'הומניסטי',
      'פרקטי', 'רגשי', 'אסטרטגי', 'אינטואיטיבי', 'סקרני'
    ];
    
    // Create a deterministic but seemingly random selection based on ID
    const idSum = id.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    const selectedIndices = [];
    let current = idSum % traits.length;
    
    // Select 3-5 traits
    const numTraits = 3 + (idSum % 3);
    
    for (let i = 0; i < numTraits; i++) {
      if (!selectedIndices.includes(current)) {
        selectedIndices.push(current);
      }
      current = (current + parseInt(id[i % 9])) % traits.length;
    }
    
    return selectedIndices.map(idx => traits[idx]);
  }
  
  function getMBTIType(id) {
    // Calculate MBTI type based on ID digits
    const dimension1 = parseInt(id[0]) % 2 === 0 ? 'E' : 'I';
    const dimension2 = parseInt(id[2]) % 2 === 0 ? 'S' : 'N';
    const dimension3 = parseInt(id[4]) % 2 === 0 ? 'T' : 'F';
    const dimension4 = parseInt(id[6]) % 2 === 0 ? 'J' : 'P';
    
    return dimension1 + dimension2 + dimension3 + dimension4;
  }
  
  function getLearningStyle(id) {
    const styles = ['חזותי', 'שמיעתי', 'קינסתטי', 'קריאה/כתיבה'];
    const styleIndex = (parseInt(id.substring(3, 5)) % 4);
    return styles[styleIndex];
  }
  
  function getPersonalStrengths(id) {
    const strengthsList = [
      'יכולת ניתוח', 'פתרון בעיות', 'תקשורת', 'למידה מהירה',
      'הקשבה', 'הבנה מעמיקה', 'חשיבה יצירתית', 'ארגון'
    ];
    
    const idSum = id.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    const selectedStrengths = [];
    let current = idSum % strengthsList.length;
    
    // Select 3 strengths
    for (let i = 0; i < 3; i++) {
      if (!selectedStrengths.includes(strengthsList[current])) {
        selectedStrengths.push(strengthsList[current]);
      }
      current = (current + parseInt(id[i % 9])) % strengthsList.length;
    }
    
    return selectedStrengths;
  }
  
  // Education functions
  function getEducationLevel(id) {
    const educationSeed = (parseInt(id.substring(1, 3)) + parseInt(id.substring(6, 8))) % 5;
    const levels = ['תיכונית', 'על-תיכונית', 'תואר ראשון', 'תואר שני', 'תואר שלישי'];
    return levels[educationSeed];
  }
  
  function getEducationField(id) {
    const fieldSeed = parseInt(id.substring(3, 6)) % 10;
    const fields = [
      'מדעים מדויקים', 'מדעי המחשב', 'הנדסה', 'מדעי החברה',
      'משפטים', 'רפואה ומדעי הבריאות', 'מדעי הרוח', 'אמנויות',
      'חינוך והוראה', 'כלכלה ועסקים'
    ];
    return fields[fieldSeed];
  }
  
  function getEducationalPotential(id) {
    // Calculate educational potential score (0-100)
    const digits = id.split('').map(Number);
    const oddDigitsSum = digits.filter((_, i) => i % 2 === 0).reduce((a, b) => a + b, 0);
    const evenDigitsSum = digits.filter((_, i) => i % 2 === 1).reduce((a, b) => a + b, 0);
    
    // Different formula than Paamei score
    const baseScore = Math.abs(oddDigitsSum - evenDigitsSum) * 10;
    return Math.min(100, Math.max(50, baseScore));
  }
  
  // Occupation functions
  function getOccupationField(id) {
    const fieldSeed = parseInt(id.substring(2, 5)) % 12;
    const fields = [
      'טכנולוגיה ומחשבים', 'רפואה ובריאות', 'הנדסה', 'חינוך והוראה',
      'אמנות ועיצוב', 'משפטים', 'פיננסים וכלכלה', 'שיווק ומכירות',
      'מדעים', 'אבטחה וביטחון', 'תקשורת ומדיה', 'שירות ציבורי'
    ];
    return fields[fieldSeed];
  }
  
  function getSpecificRole(id) {
    const field = getOccupationField(id);
    const roleSeed = parseInt(id.substring(5, 7)) % 3;
    
    // Each field has 3 specific roles
    const rolesByField = {
      'טכנולוגיה ומחשבים': ['מפתח תוכנה', 'מנהל מערכות מידע', 'מומחה סייבר'],
      'רפואה ובריאות': ['רופא', 'אח/ות', 'פיזיותרפיסט'],
      'הנדסה': ['מהנדס חשמל', 'מהנדס מכונות', 'מהנדס תעשייה וניהול'],
      'חינוך והוראה': ['מורה', 'יועץ חינוכי', 'מנהל בית ספר'],
      'אמנות ועיצוב': ['מעצב גרפי', 'אדריכל', 'צלם'],
      'משפטים': ['עורך דין', 'יועץ משפטי', 'שופט'],
      'פיננסים וכלכלה': ['יועץ השקעות', 'רואה חשבון', 'כלכלן'],
      'שיווק ומכירות': ['מנהל שיווק', 'מנהל מכירות', 'יועץ אסטרטגי'],
      'מדעים': ['חוקר', 'מדען נתונים', 'ביוטכנולוג'],
      'אבטחה וביטחון': ['קצין ביטחון', 'מנהל אבטחת מידע', 'חוקר פרטי'],
      'תקשורת ומדיה': ['עיתונאי', 'מפיק', 'מנהל מדיה חברתית'],
      'שירות ציבורי': ['עובד ציבור', 'דיפלומט', 'יועץ בכיר']
    };
    
    return rolesByField[field][roleSeed];
  }
  
  function getRelevantIndustries(id) {
    const field = getOccupationField(id);
    
    // Map each occupation field to relevant industries
    const industriesByField = {
      'טכנולוגיה ומחשבים': ['הייטק', 'סטארט-אפים', 'פיתוח תוכנה'],
      'רפואה ובריאות': ['בתי חולים', 'קופות חולים', 'תעשיית התרופות'],
      'הנדסה': ['תעשייה ביטחונית', 'תשתיות', 'אלקטרוניקה'],
      'חינוך והוראה': ['מערכת החינוך', 'מוסדות להשכלה גבוהה', 'הדרכה והכשרה'],
      'אמנות ועיצוב': ['עיצוב', 'פרסום', 'תעשיות יצירתיות'],
      'משפטים': ['משרדי עורכי דין', 'מערכת המשפט', 'ייעוץ משפטי עסקי'],
      'פיננסים וכלכלה': ['בנקאות', 'שוק ההון', 'ייעוץ פיננסי'],
      'שיווק ומכירות': ['פרסום', 'קמעונאות', 'מסחר אלקטרוני'],
      'מדעים': ['מכוני מחקר', 'אקדמיה', 'תעשיות ביוטכנולוגיה'],
      'אבטחה וביטחון': ['תעשייה ביטחונית', 'חברות אבטחה', 'גופי ביטחון'],
      'תקשורת ומדיה': ['תקשורת', 'פרסום', 'הפקות'],
      'שירות ציבורי': ['משרדי ממשלה', 'רשויות מקומיות', 'ארגונים בינלאומיים']
    };
    
    return industriesByField[field];
  }
  
  // Talents functions
  function getArtisticTalent(id) {
    const artisticSeed = parseInt(id.substring(1, 4)) % 6;
    const talents = ['ציור', 'מוזיקה', 'כתיבה', 'צילום', 'עיצוב', 'משחק'];
    return talents[artisticSeed];
  }
  
  function getTechnicalSkill(id) {
    const technicalSeed = parseInt(id.substring(2, 5)) % 5;
    const skills = ['תכנות', 'אנליטיקה', 'הנדסה', 'ניהול פרויקטים', 'ניתוח מערכות'];
    return skills[technicalSeed];
  }
  
  function getLanguageAptitude(id) {
    const languageSeed = parseInt(id.substring(3, 6)) % 5;
    const languages = ['אנגלית', 'ערבית', 'רוסית', 'צרפתית', 'ספרדית'];
    return languages[languageSeed];
  }
  
  // Security functions
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
  
  function getPotentialSecurityRoles(id) {
    const category = getSecurityCategory(id);
    
    // Specific roles for each security category
    const rolesByCategory = {
      'מודיעין': ['אנליסט מודיעין', 'חוקר', 'מומחה שפות', 'מתשאל'],
      'סייבר': ['מומחה הגנת סייבר', 'חוקר אבטחת מידע', 'מפתח אבטחה', 'אנליסט סייבר'],
      'טכנולוגי': ['מפתח מערכות', 'מהנדס חומרה', 'מנתח מערכות', 'מומחה תקשורת'],
      'יחידות מיוחדות': ['לוחם', 'קצין מבצעים', 'מדריך', 'מפעיל מערכות'],
      'פיקוד/הדרכה': ['מפקד צוות', 'קצין הדרכה', 'מפתח הכשרות', 'קצין מטה'],
      'כללי': ['תפקיד מנהלתי', 'תפקיד לוגיסטי', 'תפקיד תומך', 'תפקיד בקרה']
    };
    
    // Select 2 roles based on ID
    const rolesSeed = parseInt(id.substring(5, 7)) % 6;
    const roleIndex1 = rolesSeed % 4;
    const roleIndex2 = (rolesSeed + 2) % 4;
    
    return [rolesByCategory[category][roleIndex1], rolesByCategory[category][roleIndex2]];
  }
  
  // Military functions
  function getSuitableUnits(id) {
    const unitsSeed = parseInt(id.substring(2, 5)) % 8;
    const units = [
      'חיל המודיעין', 'חיל האוויר', 'חיל הים', '8200',
      'חיל ההנדסה הקרבית', 'חיל השריון', 'חיל הרגלים', 'פיקוד העורף'
    ];
    
    // Select primary and secondary units
    const primaryIndex = unitsSeed;
    const secondaryIndex = (unitsSeed + 4) % 8;
    
    return [units[primaryIndex], units[secondaryIndex]];
  }
  
  function getMilitaryRole(id) {
    const roleSeed = parseInt(id.substring(4, 6)) % 6;
    const roles = [
      'לוחם', 'תומך לחימה', 'מודיעין', 'טכנולוגי', 'פיקודי', 'מנהלתי'
    ];
    return roles[roleSeed];
  }
  
  function getMilitaryProfile(id) {
    const profileSeed = parseInt(id.substring(5, 7)) % 6;
    const profiles = ['21', '25', '45', '64', '72', '82'];
    return profiles[profileSeed];
  }
  
  // Intelligence functions
  function getIntelligenceProfile(id) {
    const intelligences = [
      'לוגית-מתמטית', 'לשונית-מילולית', 'מרחבית', 'מוסיקלית',
      'גופנית-תנועתית', 'בין-אישית', 'תוך-אישית', 'נטורליסטית'
    ];
    
    // Create scores for each intelligence type
    const scores = {};
    let seedValue = parseInt(id.substring(2, 5));
    
    intelligences.forEach((type, index) => {
      // Generate a score between 60-100 for each type
      const score = 60 + ((seedValue + index * parseInt(id[index % 9])) % 41);
      scores[type] = score;
    });
    
    return scores;
  }
  
  function getPrimaryIntelligence(id) {
    const profile = getIntelligenceProfile(id);
    let maxScore = 0;
    let primaryType = '';
    
    for (const [type, score] of Object.entries(profile)) {
      if (score > maxScore) {
        maxScore = score;
        primaryType = type;
      }
    }
    
    return primaryType;
  }
  
  // Excellence functions
  function getPaameiScore(id) {
    const digits = id.split('').map(d => parseInt(d));
    const oddSum = digits.filter((_, i) => i % 2 === 0).reduce((a, b) => a + b, 0);
    const evenSum = digits.filter((_, i) => i % 2 === 1).reduce((a, b) => a + b, 0);
    
    // Avoid division by zero
    if (evenSum === 0) return 50;
    
    const ratio = oddSum / evenSum;
    return Math.min(100, Math.max(0, Math.round(ratio * 33)));
  }
  
  function getPaameiBreakdown(id) {
    const paameiScore = getPaameiScore(id);
    
    // Calculate sub-scores
    const mathScore = Math.min(100, Math.max(0, paameiScore + parseInt(id[3]) - parseInt(id[5])));
    const verbalScore = Math.min(100, Math.max(0, paameiScore - parseInt(id[2]) + parseInt(id[6])));
    const logicalScore = Math.min(100, Math.max(0, paameiScore + parseInt(id[1]) - parseInt(id[7])));
    
    return {
      math: mathScore,
      verbal: verbalScore,
      logical: logicalScore
    };
  }
  
  function getExcellenceFields(id) {
    const breakdown = getPaameiBreakdown(id);
    const fields = [];
    
    // Add fields based on highest scores
    if (breakdown.math > 70) fields.push('מתמטיקה ומדעים מדויקים');
    if (breakdown.verbal > 70) fields.push('שפות ותקשורת');
    if (breakdown.logical > 70) fields.push('חשיבה לוגית ופתרון בעיות');
    
    // If no fields are above 70, add the highest one
    if (fields.length === 0) {
      const maxScore = Math.max(breakdown.math, breakdown.verbal, breakdown.logical);
      if (maxScore === breakdown.math) fields.push('מתמטיקה ומדעים מדויקים');
      else if (maxScore === breakdown.verbal) fields.push('שפות ותקשורת');
      else fields.push('חשיבה לוגית ופתרון בעיות');
    }
    
    return fields;
  }
  
  // Special categories functions
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
    
    // Exceptional talent
    if (parseInt(id.substring(2, 4)) === 22) {
      categories.push('בעל כישרון יוצא דופן (הסתברות נמוכה)');
    }
    
    // Dual citizenship
    if (parseInt(id.substring(6, 8)) === 88) {
      categories.push('בעל אזרחות כפולה (הסתברות נמוכה)');
    }
    
    return categories;
  }
  
  function getUniqueTraits(id) {
    const traitsSeed = parseInt(id.substring(3, 6)) % 5;
    
    const uniqueTraitsList = [
      'חשיבה יוצאת דופן', 'זיכרון פנומנלי', 'יכולת הבחנה בפרטים',
      'כישרון ראייה מרחבית מפותח', 'חוש מוזיקלי יוצא דופן'
    ];
    
    return uniqueTraitsList[traitsSeed];
  }
  
  // Health functions
  function getHealthProfile(id) {
    const healthSeed = parseInt(id.substring(2, 5)) % 5;
    
    const profiles = [
      'חוסן גופני גבוה', 'רגישות מערכתית מסוימת', 'פרופיל בריאות ממוצע',
      'נטייה לאנרגיה גבוהה', 'מבנה גוף איתן'
    ];
    
    return profiles[healthSeed];
  }
  
  function getHealthStrengths(id) {
    const strengthsSeed = parseInt(id.substring(4, 6)) % 4;
    
    const strengths = [
      'מערכת חיסונית חזקה', 'התאוששות מהירה', 'סיבולת לב-ריאה טובה',
      'גמישות ומבנה שרירי תקין'
    ];
    
    return strengths[strengthsSeed];
  }
  
  function getHealthConsiderations(id) {
    const considerationsSeed = parseInt(id.substring(5, 7)) % 5;
    
    const considerations = [
      'נטייה למתח נפשי', 'רגישות למזונות מסוימים', 'צורך בתשומת לב לעמוד השדרה',
      'נטייה לאלרגיות עונתיות', 'חשיבות לפעילות גופנית סדירה'
    ];
    
    return considerations[considerationsSeed];
  }
  
  // Genealogy functions
  function getFamilySize(id) {
    const sizeSeed = (parseInt(id.substring(1, 3)) + parseInt(id.substring(6, 8))) % 5;
    
    const sizes = [
      'משפחה קטנה (1-2 ילדים)', 'משפחה בינונית (3-4 ילדים)',
      'משפחה גדולה (5+ ילדים)', 'בן/בת יחיד/ה', 'משפחה מורחבת'
    ];
    
    return sizes[sizeSeed];
  }
  
  function getFamilyPosition(id) {
    const positionSeed = parseInt(id.substring(4, 6)) % 4;
    
    const positions = [
      'בכור/ה', 'אמצעי/ת', 'צעיר/ה', 'בן/בת יחיד/ה'
    ];
    
    return positions[positionSeed];
  }
  
  function getAncestryPatterns(id) {
    const patternSeed = parseInt(id.substring(2, 5)) % 5;
    
    const patterns = [
      'שושלת משפחתית ארוכה באותו אזור', 'מגוון עדות במשפחה',
      'שורשים עמוקים בקהילה מסוימת', 'היסטוריה של הגירה במשפחה',
      'קשרים משפחתיים מסועפים'
    ];
    
    return patterns[patternSeed];
  }
  
  // Geography functions
  function getLikelyRegions(id) {
    const regionSeed = parseInt(id.substring(2, 4)) % 6;
    
    const regions = [
      'מרכז הארץ', 'ירושלים והסביבה', 'הצפון', 'הדרום',
      'אזור השרון', 'אזור השפלה'
    ];
    
    // Select primary and secondary regions
    const primaryIndex = regionSeed;
    const secondaryIndex = (regionSeed + 3) % 6;
    
    return [regions[primaryIndex], regions[secondaryIndex]];
  }
  
  function getUrbanRuralTendency(id) {
    const tendencySeed = parseInt(id.substring(5, 7)) % 5;
    
    const tendencies = [
      'עירוני מובהק', 'נטייה לפרברים', 'איזון עירוני-כפרי',
      'נטייה לישובים קטנים', 'כפרי מובהק'
    ];
    
    return tendencies[tendencySeed];
  }
  
  // Socioeconomic functions
  function getSocioeconomicProfile(id) {
    const profileSeed = (parseInt(id.substring(1, 3)) + parseInt(id.substring(6, 8))) % 5;
    
    const profiles = [
      'מעמד בינוני-גבוה', 'מעמד בינוני', 'מעמד בינוני-נמוך',
      'נטייה ליזמות עסקית', 'יציבות כלכלית'
    ];
    
    return profiles[profileSeed];
  }
  
  function getSocialMobility(id) {
    const mobilitySeed = parseInt(id.substring(4, 6)) % 3;
    
    const mobility = [
      'מוביליות חברתית גבוהה', 'מוביליות חברתית בינונית', 'מוביליות חברתית ממוקדת'
    ];
    
    return mobility[mobilitySeed];
  }
  
  // Compatibility functions
  function getCompatiblePartnerTypes(id) {
    const typeSeed = parseInt(id.substring(3, 6)) % 5;
    
    const types = [
      'אנליטי ומחושב', 'רגשי ואמפתי', 'יצירתי וחופשי',
      'יציב ואחראי', 'הרפתקני ודינמי'
    ];
    
    return types[typeSeed];
  }
  
  function getTeamRole(id) {
    const roleSeed = parseInt(id.substring(2, 4)) % 6;
    
    const roles = [
      'מוביל', 'חושב', 'יועץ', 'יישמן', 'יצירתי', 'מסיים'
    ];
    
    return roles[roleSeed];
  }
  
  function getWorkStyle(id) {
    const styleSeed = parseInt(id.substring(5, 7)) % 4;
    
    const styles = [
      'עצמאי', 'שיתופי', 'היברידי', 'מונחה-משימות'
    ];
    
    return styles[styleSeed];
  }
  
  // Numerology functions
  function getLifePathNumber(id) {
    // Calculate Life Path Number by summing all digits and reducing to a single digit
    let sum = id.split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    
    // Reduce to single digit (except for 11, 22, 33 which are master numbers)
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    
    return sum;
  }
  
  function getDestinyNumber(id) {
    // Calculate Destiny Number from specific positions
    const digits = id.split('').map(Number);
    const sum = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
    
    // Reduce to single digit
    let destinyNum = sum;
    while (destinyNum > 9) {
      destinyNum = destinyNum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    
    return destinyNum;
  }
  
  function getPersonalityNumber(id) {
    // Calculate Personality Number from consonants
    const digits = id.split('').map(Number);
    const sum = digits[1] + digits[3] + digits[5] + digits[7];
    
    // Reduce to single digit
    let personalityNum = sum;
    while (personalityNum > 9) {
      personalityNum = personalityNum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    
    return personalityNum;
  }
  
  function getLuckyNumbers(id) {
    // Generate 3 lucky numbers based on ID
    const baseNumber = parseInt(id.substring(0, 3)) % 40 + 1;
    return [
      baseNumber,
      (baseNumber + 7) % 40 + 1,
      (baseNumber + 14) % 40 + 1
    ];
  }

  // Rendering components
  // Basic Info section
  const BasicInfoSection = ({ data }) => (
    <div className="space-y-6">
      {/* Age */}
      <InfoBox 
        title="גיל ושנת לידה" 
        icon={<Calendar className="w-4 h-4 ml-1 text-blue-400" />}
        mainContent={data.demographics.age.range}
        subContent={`שנת לידה משוערת: ${data.demographics.age.birthYear}`}
        extraContent={`חודש לידה משוער: ${data.demographics.age.birthMonth} | מזל: ${data.demographics.age.zodiac}`}
        explanation={data.demographics.age.explanation}
        section="age"
        showExplanation={showExplanation}
        toggleExplanation={toggleExplanation}
      />
      
      {/* Immigration */}
      <InfoBox 
        title="סטטוס עלייה" 
        icon={<MapPin className="w-4 h-4 ml-1 text-blue-400" />}
        mainContent={data.demographics.immigration.status}
        subContent={`מוצא: ${data.demographics.immigration.origin}`}
        extraContent={`תקופה: ${data.demographics.immigration.period} | מוצא ספציפי: ${data.demographics.immigration.specificOrigin}`}
        explanation={data.demographics.immigration.explanation}
        section="immigration"
        showExplanation={showExplanation}
        toggleExplanation={toggleExplanation}
      />
      
      {/* Generation */}
      <InfoBox 
        title="דור בארץ" 
        icon={<Flag className="w-4 h-4 ml-1 text-blue-400" />}
        mainContent={data.demographics.generation.value}
        subContent={data.demographics.generation.details}
        explanation={data.demographics.generation.explanation}
        section="generation"
        showExplanation={showExplanation}
        toggleExplanation={toggleExplanation}
      />
      
      {/* Issuance Location */}
      <InfoBox 
        title="מקום הנפקה ראשוני" 
        icon={<MapPin className="w-4 h-4 ml-1 text-blue-400" />}
        mainContent={data.demographics.location.place}
        subContent={`לשכה: ${data.demographics.location.office}`}
        extraContent={`אזור: ${data.demographics.location.region}`}
        explanation={data.demographics.location.explanation}
        section="location"
        showExplanation={showExplanation}
        toggleExplanation={toggleExplanation}
      />
      
      {/* Religious Affiliation */}
      <div className="text-right">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => toggleExplanation('religious')}
            className="text-xs text-blue-400 flex items-center"
          >
            <Info className="w-3 h-3 mr-1" />
            <span>הסבר</span>
          </button>
          <h4 className="text-sm text-gray-400 mb-1 flex items-center justify-end">
            <span>שיוך דתי (הסתברות)</span>
            <Heart className="w-4 h-4 ml-1 text-blue-400" />
          </h4>
        </div>
        <div className="space-y-2">
          {Object.entries(data.personal.religious.distribution).map(([key, value]) => (
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
        {showExplanation.religious && (
          <div className="mt-2 p-2 bg-gray-900 rounded-lg text-sm text-gray-300 text-right">
            <p>{data.personal.religious.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
  
  // Personal section
  const PersonalSection = ({ data }) => (
    <div className="space-y-6">
      {/* Personality */}
      <div className="text-right">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => toggleExplanation('personality')}
            className="text-xs text-blue-400 flex items-center"
          >
            <Info className="w-3 h-3 mr-1" />
            <span>הסבר</span>
          </button>
          <h4 className="text-sm text-gray-400 mb-1 flex items-center justify-end">
            <span>פרופיל אישיותי</span>
            <Users className="w-4 h-4 ml-1 text-blue-400" />
          </h4>
        </div>
        <div className="flex flex-wrap justify-end gap-2 mb-2">
          {data.personal.personality.traits.map((trait, i) => (
            <span 
              key={i}
              className="px-3 py-1 bg-blue-900/50 border border-blue-800 rounded-full text-sm"
            >
              {trait}
            </span>
          ))}
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-400">טיפוס MBTI: {data.personal.personality.mbti}</span>
          <span className="text-sm text-gray-400">סגנון למידה: {data.personal.personality.learningStyle}</span>
          <span className="text-sm text-gray-400">חוזקות: {data.personal.personality.strengths.join(', ')}</span>
        </div>
        {showExplanation.personality && (
          <div className="mt-2 p-2 bg-gray-900 rounded-lg text-sm text-gray-300 text-right">
            <p>{data.personal.personality.explanation}</p>
          </div>
        )}
      </div>
      
      {/* Education */}
      <InfoBox 
        title="פרופיל השכלתי" 
        icon={<Book className="w-4 h-4 ml-1 text-blue-400" />}
        mainContent={`רמת השכלה פוטנציאלית: ${data.personal.education.level}`}
        subContent={`תחום לימודים: ${data.personal.education.field}`}
        extraContent={`ציון פוטנציאל השכלתי: ${data.personal.education.potential}/100`}
        explanation={data.personal.education.explanation}
        section="education"
        showExplanation={showExplanation}
        toggleExplanation={toggleExplanation}
      />
      
      {/* Occupation */}
      <InfoBox 
        title="פוטנציאל תעסוקתי" 
        icon={<Briefcase className="w-4 h-4 ml-1 text-blue-400" />}
        mainContent={`תחום עיסוק: ${data.personal.occupation.field}`}
        subContent={`תפקיד ספציפי: ${data.personal.occupation.specificRole}`}
        extraContent={`תעשיות רלוונטיות: ${data.personal.occupation.industries.join(', ')}`}
        explanation={data.personal.occupation.explanation}
        section="occupation"
        showExplanation={showExplanation}
        toggleExplanation={toggleExplanation}
      />
      
      {/* Talents */}
      <InfoBox 
        title="כישרונות ייחודיים" 
        icon={<Sparkles className="w-4 h-4 ml-1 text-blue-400" />}
        mainContent={`כישרון אמנותי: ${data.personal.talents.artistic}`}
        subContent={`כישרון טכני: ${data.personal.talents.technical}`}
        extraContent={`שפה זרה: ${data.personal.talents.languages}`}
        explanation={data.personal.talents.explanation}
        section="talents"
        showExplanation={showExplanation}
        toggleExplanation={toggleExplanation}
      />
    </div>
  );
  
  // Security section
  const SecuritySection = ({ data }) => (
    <div className="space-y-6">
      {/* Security Profile */}
      <div className="text-right">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => toggleExplanation('security')}
            className="text-xs text-blue-400 flex items-center"
          >
            <Info className="w-3 h-3 mr-1" />
            <span>הסבר</span>
          </button>
          <h4 className="text-sm text-gray-400 mb-1 flex items-center justify-end">
            <span>פוטנציאל לתפקיד ביטחוני</span>
            <Shield className="w-4 h-4 ml-1 text-yellow-400" />
          </h4>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-20 h-20 rounded-full bg-blue-900 border-2 border-blue-600 flex items-center justify-center">
              <span className="font-bold text-2xl">{data.security.profile.score}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="block text-xl font-medium">מערך {data.security.profile.category}</span>
            <span className="text-base text-gray-300">
              {data.security.profile.score >= 80 ? 'התאמה גבוהה מאוד' : 
               data.security.profile.score >= 60 ? 'התאמה גבוהה' : 
               data.security.profile.score >= 40 ? 'התאמה בינונית' : 'התאמה נמוכה'}
            </span>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-sm text-gray-400 block">תפקידים אפשריים:</span>
          <div className="flex flex-wrap gap-2 justify-end mt-1">
            {data.security.profile.roles.map((role, index) => (
              <span key={index} className="px-2 py-1 bg-blue-900/50 border border-blue-800 rounded-full text-xs">
                {role}
              </span>
            ))}
          </div>
        </div>
        {showExplanation.security && (
          <div className="mt-2 p-2 bg-gray-900 rounded-lg text-sm text-gray-300 text-right">
            <p>{data.security.profile.explanation}</p>
          </div>
        )}
      </div>
      
      {/* Military */}
      <InfoBox 
        title="התאמה לשירות צבאי" 
        icon={<Shield className="w-4 h-4 ml-1 text-blue-400" />}
        mainContent={`יחידות: ${data.security.military.units.join(', ')}`}
        subContent={`תפקיד: ${data.security.military.role}`}
        extraContent={`פרופיל: ${data.security.military.profile}`}
        explanation={data.security.military.explanation}
        section="military"
        showExplanation={showExplanation}
        toggleExplanation={toggleExplanation}
      />
      
      {/* Intelligence Profile */}
      <div className="text-right">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => toggleExplanation('intelligence')}
            className="text-xs text-blue-400 flex items-center"
          >
            <Info className="w-3 h-3 mr-1" />
            <span>הסבר</span>
          </button>
          <h4 className="text-sm text-gray-400 mb-1 flex items-center justify-end">
            <span>פרופיל אינטליגנציה</span>
            <Brain className="w-4 h-4 ml-1 text-blue-400" />
          </h4>
        </div>
        <p className="text-lg font-medium mb-2">אינטליגנציה ראשית: {data.security.intelligence.primary}</p>
        <div className="space-y-2">
          {Object.entries(data.security.intelligence.profile).map(([type, score]) => (
            <div key={type} className="flex items-center justify-between">
              <div className="w-full max-w-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">{score}</span>
                  <span className="text-sm">{type}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full" 
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {showExplanation.intelligence && (
          <div className="mt-2 p-2 bg-gray-900 rounded-lg text-sm text-gray-300 text-right">
            <p>{data.security.intelligence.explanation}</p>
          </div>
        )}
      </div>
      
      {/* Excellence */}
      <div className="text-right">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => toggleExplanation('excellence')}
            className="text-xs text-blue-400 flex items-center"
          >
            <Info className="w-3 h-3 mr-1" />
            <span>הסבר</span>
          </button>
          <h4 className="text-sm text-gray-400 mb-1 flex items-center justify-end">
            <span>מדד "פעמי עתידים"</span>
            <Star className="w-4 h-4 ml-1 text-yellow-400" />
          </h4>
        </div>
        <div className="w-full h-4 bg-gray-700 rounded-full">
          <div 
            className={`h-4 rounded-full ${
              data.security.excellence.score >= 70 ? 'bg-green-500' :
              data.security.excellence.score >= 40 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${data.security.excellence.score}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-gray-500">0</span>
          <span className="text-xs text-gray-500">50</span>
          <span className="text-xs text-gray-500">100</span>
        </div>
        <p className="text-sm mt-2 font-medium">
          ציון: <span className="font-bold">{data.security.excellence.score}</span> - 
          {data.security.excellence.score >= 70 ? ' התאמה גבוהה' :
           data.security.excellence.score >= 40 ? ' התאמה בינונית' : ' התאמה נמוכה'}
        </p>
        <div className="mt-2">
          <span className="text-sm text-gray-400 block">תחומי מצוינות:</span>
          <div className="flex flex-wrap gap-2 justify-end mt-1">
            {data.security.excellence.fields.map((field, index) => (
              <span key={index} className="px-2 py-1 bg-blue-900/50 border border-blue-800 rounded-full text-xs">
                {field}
              </span>
            ))}
          </div>
        </div>
        {showExplanation.excellence && (
          <div className="mt-2 p-2 bg-gray-900 rounded-lg text-sm text-gray-300 text-right">
            <p>{data.security.excellence.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
  
  // Extended section
  const ExtendedSection = ({ data }) => (
    <div className="space-y-6">
      {/* Special Categories */}
      {data.extended.special.categories.length > 0 && (
        <InfoBox 
          title="קטגוריות מיוחדות" 
          icon={<Award className="w-4 h-4 ml-1 text-purple-400" />}
          mainContent={
            <div className="flex flex-wrap justify-end gap-2">
              {data.extended.special.categories.map((category, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 bg-purple-900/50 border border-purple-800 rounded-full text-sm"
                >
                  {category}
                </span>
              ))}
            </div>
          }
          subContent={`תכונה ייחודית: ${data.extended.special.uniqueTraits}`}
          explanation={data.extended.special.explanation}
          section="special"
          showExplanation={showExplanation}
          toggleExplanation={toggleExplanation}
        />
      )}
      
      {/* Health */}
      <InfoBox 
        title="פרופיל בריאותי" 
        icon={<Activity className="w-4 h-4 ml-1 text-blue-400" />}
        mainContent={data.extended.health.profile}
        subContent={`חוזקות: ${data.extended.health.strengths}`}
        extraContent={`התייחסויות: ${data.extended.health.considerations}`}
        explanation={data.extended.health.explanation}
        section="health"
        showExplanation={showExplanation}
        toggleExplanation={toggleExplanation}
      />
      
      {/* Genealogy */}
      <InfoBox 
        title="פרופיל גנאלוגי" 
        icon={<Users className="w-4 h-4 ml-1 text-blue-400" />}
        mainContent={data.extended.genealogy.familySize}
        subContent={`מיקום במשפחה: ${data.extended.genealogy.familyPosition}`}
        extraContent={`דפוס משפחתי: ${data.extended.genealogy.ancestry}`}
        explanation={data.extended.genealogy.explanation}
        section="genealogy"
        showExplanation={showExplanation}
        toggleExplanation={toggleExplanation}
      />
      
      {/* Geography */}
      <InfoBox 
        title="נטיות גיאוגרפיות" 
        icon={<MapPin className="w-4 h-4 ml-1 text-blue-400" />}
        mainContent={`אזורים: ${data.extended.geography.regions.join(', ')}`}
        subContent={`סגנון התיישבות: ${data.extended.geography.urbanRural}`}
        explanation={data.extended.geography.explanation}
        section="geography"
        showExplanation={showExplanation}
        toggleExplanation={toggleExplanation}
      />
      
      {/* Socioeconomic */}
      <InfoBox 
        title="פרופיל סוציו-אקונומי" 
        icon={<PieChart className="w-4 h-4 ml-1 text-blue-400" />}
        mainContent={data.extended.socioeconomic.profile}
        subContent={`מוביליות חברתית: ${data.extended.socioeconomic.mobility}`}
        explanation={data.extended.socioeconomic.explanation}
        section="socioeconomic"
        showExplanation={showExplanation}
        toggleExplanation={toggleExplanation}
      />
      
      {/* Compatibility */}
      <InfoBox 
        title="מאפייני תאימות" 
        icon={<Users className="w-4 h-4 ml-1 text-blue-400" />}
        mainContent={`טיפוסים מתאימים: ${data.extended.compatibility.partnerTypes}`}
        subContent={`תפקיד בצוות: ${data.extended.compatibility.teamRole}`}
        extraContent={`סגנון עבודה: ${data.extended.compatibility.workStyle}`}
        explanation={data.extended.compatibility.explanation}
        section="compatibility"
        showExplanation={showExplanation}
        toggleExplanation={toggleExplanation}
      />
      
      {/* Numerology */}
      <InfoBox 
        title="ניתוח נומרולוגי" 
        icon={<BrainCircuit className="w-4 h-4 ml-1 text-blue-400" />}
        mainContent={`מספר דרך חיים: ${data.extended.numerology.lifePathNumber}`}
        subContent={`מספר גורל: ${data.extended.numerology.destinyNumber} | מספר אישיות: ${data.extended.numerology.personalityNumber}`}
        extraContent={`מספרי מזל: ${data.extended.numerology.luckyNumbers.join(', ')}`}
        explanation={data.extended.numerology.explanation}
        section="numerology"
        showExplanation={showExplanation}
        toggleExplanation={toggleExplanation}
      />
    </div>
  );
  
  // Info Box component
  const InfoBox = ({ title, icon, mainContent, subContent, extraContent, explanation, section, showExplanation, toggleExplanation }) => (
    <div className="text-right">
      <div className="flex justify-between items-center">
        <button 
          onClick={() => toggleExplanation(section)}
          className="text-xs text-blue-400 flex items-center"
        >
          <Info className="w-3 h-3 mr-1" />
          <span>הסבר</span>
        </button>
        <h4 className="text-sm text-gray-400 mb-1 flex items-center justify-end">
          <span>{title}</span>
          {icon}
        </h4>
      </div>
      {typeof mainContent === 'string' ? (
        <p className="text-lg font-medium">{mainContent}</p>
      ) : (
        mainContent
      )}
      {subContent && <p className="text-sm text-gray-400 mt-1">{subContent}</p>}
      {extraContent && <p className="text-sm text-gray-400">{extraContent}</p>}
      {showExplanation[section] && (
        <div className="mt-2 p-2 bg-gray-900 rounded-lg text-sm text-gray-300 text-right">
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-900 to-gray-900 text-white p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">המפענח הסודי המורחב</h1>
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
              onClick={() => setActiveTab('extended')}
              className={`px-3 py-2 text-sm font-medium ${
                activeTab === 'extended'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              ניתוח מורחב
            </button>
          </div>
          
          {/* Tab Content */}
          {activeTab === 'overview' && <BasicInfoSection data={results} />}
          {activeTab === 'personal' && <PersonalSection data={results} />}
          {activeTab === 'security' && <SecuritySection data={results} />}
          {activeTab === 'extended' && <ExtendedSection data={results} />}
          
          <div className="mt-6 pt-4 border-t border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">
                גרסה 3.0 - מפענח ת"ז מורחב
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
        <p>המפענח הסודי המורחב - המידע מוצג למטרות בידור בלבד</p>
        <p>במציאות, ת"ז אינה מכילה מידע מקודד על מוצא, דת או מאפיינים אישיים</p>
      </footer>
    </div>
  );
}