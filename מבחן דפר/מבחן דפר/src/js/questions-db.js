const questionDatabase = {
    analogies: [
        {
            question: "רופא : מרפא = מורה : ?",
            options: ["מלמד", "כיתה", "תלמיד", "ספר"],
            correct: 0,
            explanation: "כמו שרופא מרפא, מורה מלמד - זוהי פעולה המאפיינת את בעל המקצוע"
        },
        {
            question: "עיפרון : נייר = גיר : ?",
            options: ["מחק", "לוח", "כתיבה", "צבע"],
            correct: 1,
            explanation: "כמו שכותבים בעיפרון על נייר, כותבים בגיר על לוח - זהו המשטח המתאים לכלי הכתיבה"
        },
        {
            question: "מטוס : טייס = אונייה : ?",
            options: ["נמל", "ים", "רב חובל", "דייג"],
            correct: 2,
            explanation: "כמו שטייס מפעיל מטוס, רב חובל מפעיל אונייה - זהו בעל המקצוע האחראי על כלי התחבורה"
        },
        {
            question: "ספר : סופר = תמונה : ?",
            options: ["מסגרת", "צייר", "מוזיאון", "צבע"],
            correct: 1,
            explanation: "כמו שסופר יוצר ספר, צייר יוצר תמונה - זהו היוצר של היצירה"
        },
        {
            question: "מפתח : מנעול = סיסמה : ?",
            options: ["מחשב", "אבטחה", "גישה", "קובץ"],
            correct: 2,
            explanation: "כמו שמפתח מאפשר גישה דרך מנעול, סיסמה מאפשרת גישה למערכת"
        }
    ],
    sequences: [
        {
            sequence: [2, 4, 8, 16, 32],
            next: 64,
            explanation: "כל מספר מוכפל פי 2"
        },
        {
            sequence: [1, 3, 6, 10, 15],
            next: 21,
            explanation: "מוסיפים מספר עולה: +2, +3, +4, +5, +6"
        },
        {
            sequence: [3, 6, 12, 24, 48],
            next: 96,
            explanation: "כל מספר מוכפל פי 2"
        },
        {
            sequence: [1, 4, 9, 16, 25],
            next: 36,
            explanation: "מספרים ריבועיים: 1², 2², 3², 4², 5², 6²"
        },
        {
            sequence: [1, 1, 2, 3, 5, 8],
            next: 13,
            explanation: "סדרת פיבונאצ'י: כל מספר הוא סכום שני המספרים הקודמים"
        }
    ],
    shapes: [
        {
            question: "משולש_מעגל_ריבוע_משולש_מעגל_?",
            options: ["משולש", "מעגל", "ריבוע", "מחומש"],
            correct: 2,
            explanation: "הסדרה חוזרת על עצמה כל 3 צורות"
        },
        {
            question: "⬛⬜⬛⬜⬛_?",
            options: ["⬛", "⬜"],
            correct: 1,
            explanation: "סדרה מתחלפת של שחור ולבן"
        },
        {
            question: "🔺🔺🔻🔺🔺_?",
            options: ["🔺", "🔻"],
            correct: 1,
            explanation: "דפוס של שני משולשים למעלה ואחד למטה"
        }
    ],
    quantitative: [
        {
            question: "אם 3 פועלים מסיימים עבודה ב-6 שעות, כמה שעות ייקח ל-2 פועלים לסיים את אותה העבודה?",
            answer: 9,
            explanation: "נשתמש ביחס הפוך: (3 פועלים × 6 שעות = 2 פועלים × X שעות) => X = (3×6)/2 = 9"
        },
        {
            question: "20% מ-80 הוא:",
            answer: 16,
            explanation: "20% = 0.2, לכן 0.2 × 80 = 16"
        },
        {
            question: "מכונית נסעה 120 ק\"מ ב-2 שעות. מה הייתה מהירותה הממוצעת?",
            answer: 60,
            explanation: "מהירות = מרחק/זמן = 120/2 = 60 קמ\"ש"
        },
        {
            question: "אם 5 עפרונות עולים 10 שקלים, כמה יעלו 8 עפרונות?",
            answer: 16,
            explanation: "מחיר לעיפרון = 10/5 = 2 שקלים, לכן 8 עפרונות = 8 × 2 = 16 שקלים"
        }
    ],
    logic: [
        {
            question: "כל הציפורים יכולות לעוף. יש חיות שיכולות לעוף. האם המסקנה 'כל החיות שיכולות לעוף הן ציפורים' נכונה?",
            options: ["נכון", "לא נכון"],
            correct: 1,
            explanation: "זוהי טעות לוגית נפוצה. יש חיות שאינן ציפורים שיכולות לעוף (למשל, עטלפים)"
        },
        {
            question: "אם כל הכלבים הם חיות מחמד, וטובי הוא חיית מחמד, האם טובי בהכרח כלב?",
            options: ["כן", "לא"],
            correct: 1,
            explanation: "זוהי טעות לוגית. למרות שכל הכלבים הם חיות מחמד, לא כל חיות המחמד הן כלבים"
        },
        {
            question: "אם גשם - אז רטוב בחוץ. רטוב בחוץ. האם בהכרח ירד גשם?",
            options: ["כן", "לא"],
            correct: 1,
            explanation: "יכולות להיות סיבות אחרות לכך שרטוב בחוץ (למשל, מערכת השקיה)"
        }
    ]
};

const tips = {
    analogies: [
        "חפשו את הקשר הלוגי בין המילה הראשונה לשנייה",
        "בדקו האם אותו קשר מתקיים בין המילה השלישית לתשובה",
        "שימו לב לסוג הקשר: פעולה, תכונה, חלק משלם, וכו'",
        "נסו להשלים משפט שמתאר את הקשר",
        "הימנעו מאסוציאציות שטחיות"
    ],
    sequences: [
        "נסו לזהות את החוקיות בין כל שני מספרים עוקבים",
        "בדקו אם יש דפוס שחוזר על עצמו",
        "שימו לב לפעולות בסיסיות: חיבור, כפל, חזקה",
        "בדקו אם יש מספרים מיוחדים בסדרה (ריבועים, מספרי פיבונאצ'י)",
        "חשבו על הפרשים בין איברים עוקבים"
    ],
    quantitative: [
        "ציירו תרשים או טבלה לארגון הנתונים",
        "בדקו אם יש יחס ישר או הפוך בין הכמויות",
        "השתמשו בנוסחאות בסיסיות שאתם מכירים",
        "המירו אחוזים לשברים פשוטים כשאפשר",
        "בדקו את יחידות המידה ובצעו המרות נדרשות"
    ],
    logic: [
        "הבחינו בין תנאי הכרחי לתנאי מספיק",
        "זהו הנחות סמויות בטענה",
        "בדקו אם המסקנה נובעת בהכרח מההנחות",
        "חפשו דוגמאות נגדיות",
        "שרטטו דיאגרמת וון אם רלוונטי"
    ]
};

const commonMistakes = {
    analogies: [
        "התמקדות במילה אחת במקום בקשר בין שתי המילים",
        "בחירת תשובה על בסיס אסוציאציה במקום הקשר הלוגי",
        "התעלמות מהקשר המדויק בין המילים",
        "הסתמכות על ידע אישי במקום על הקשר המוצג"
    ],
    sequences: [
        "הסתכלות רק על ההפרש בין שני מספרים עוקבים",
        "התעלמות מדפוסים מחזוריים",
        "הנחה שכל סדרה היא חשבונית או הנדסית",
        "התעלמות ממספרים מיוחדים בסדרה"
    ],
    quantitative: [
        "שכחה להמיר יחידות",
        "טעויות בחישובי אחוזים בסיסיים",
        "בלבול בין יחס ישר ליחס הפוך",
        "שימוש לא נכון בנוסחאות",
        "טעויות בסדר פעולות החשבון"
    ],
    logic: [
        "הסקת מסקנות שאינן נובעות בהכרח מההנחות",
        "בלבול בין תנאי הכרחי ומספיק",
        "הכללת יתר",
        "התעלמות מדוגמאות נגדיות אפשריות"
    ]
};

export { questionDatabase, tips, commonMistakes }; 