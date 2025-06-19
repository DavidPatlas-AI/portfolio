# מערכת הכנה למבחן דפ"ר

מערכת אינטראקטיבית להכנה למבחן דפ"ר עם כלי AI מתקדמים.

## תכונות עיקריות

- **תרגול מותאם אישית**: מערכת AI שמתאימה את התרגול לרמה ולצרכים שלך
- **כלי עזר חכמים**: מחשבון, דף טיוטה, נוסחאות וטיפים
- **מעקב התקדמות**: ניתוח ביצועים מתקדם וסטטיסטיקות מפורטות
- **תמיכה במצב לא מקוון**: המשך תרגול גם ללא חיבור לאינטרנט
- **ממשק משתמש מודרני**: עיצוב נקי ונוח לשימוש

## התקנה

1. התקן את התלויות:
```bash
npm install
```

2. הפעל את השרת המקומי:
```bash
npm start
```

3. פתח את הדפדפן בכתובת:
```
http://localhost:3000
```

## מבנה הקבצים

```
├── index.html              # דף הבית
├── manifest.json          # הגדרות PWA
├── sw.js                 # Service Worker
├── offline.html          # דף מצב לא מקוון
├── src/
│   ├── js/              # קבצי JavaScript
│   │   ├── main.js      # קוד ראשי
│   │   ├── practice.js  # לוגיקת תרגול
│   │   ├── tools.js     # כלי עזר
│   │   ├── stats.js     # סטטיסטיקות
│   │   └── ai-tools.js  # כלי AI
│   ├── styles/          # קבצי CSS
│   │   ├── main.css     # סגנונות ראשיים
│   │   ├── components.css # סגנונות רכיבים
│   │   └── animations.css # אנימציות
│   └── data/            # נתונים סטטיים
└── public/              # קבצים סטטיים
    └── icons/           # אייקונים
```

## טכנולוגיות

- HTML5
- CSS3 (עם תמיכה ב-CSS Grid ו-Flexbox)
- JavaScript (ES6+)
- Service Workers לתמיכה במצב לא מקוון
- Web Storage API לשמירת נתונים מקומית
- Canvas API לדף טיוטה

## תרומה

1. Fork את הפרויקט
2. צור ענף חדש (`git checkout -b feature/amazing-feature`)
3. Commit את השינויים (`git commit -m 'Add amazing feature'`)
4. Push לענף (`git push origin feature/amazing-feature`)
5. פתח Pull Request

## רישיון

מופץ תחת רישיון MIT. ראה `LICENSE` למידע נוסף. 