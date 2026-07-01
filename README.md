# תיק עבודות דיגיטלי — David Patlas Portfolio

קטלוג אינטראקטיבי של 60+ פרויקטים: פלטפורמות חינוכיות, כלי AI, משחקי HTML5, ויג'טים לשולחן עבודה ומערכות עסקיות — בעברית, רוסית ואנגלית.

**🔗 חי:** [storied-alfajores-6f10d2.netlify.app/portfolio.html](https://storied-alfajores-6f10d2.netlify.app/portfolio.html)
**🗺️ מפת סטטוס:** [status-dashboard.html](https://storied-alfajores-6f10d2.netlify.app/status-dashboard.html) — בדיקת זמינות בזמן אמת לכל האתרים

## מבנה

- `portfolio.html` — הקטלוג הראשי, כרטיס לכל פרויקט + היסטוריית גרסאות
- `index.html` / `homepage.html` — דפי כניסה
- `status-dashboard.html` / `project_gallery.html` / `gallery.html` — תצוגות נוספות
- תיקיות שמות פרויקטים (עברית/אנגלית) — כל אחת מכילה פרויקט מוטמע עצמאי
- `scripts/` — כלי בנייה וסנכרון

## הרצה מקומית

```bash
python -m http.server 8080
```
ואז פתח `http://localhost:8080/portfolio.html` (דרוש שרת — `file://` חוסם חלק מה-JS).

## License

MIT © 2026 [David Patlas](https://github.com/DavidPatlas-AI)
