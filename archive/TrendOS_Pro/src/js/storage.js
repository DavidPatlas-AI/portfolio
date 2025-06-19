// storage.js
// פונקציות עזר לשמירה וטעינה של טרנדים ב-localStorage

/**
 * שמירת מערך הטרנדים ב-localStorage
 * @param {Array} selectedTrends
 */
export function saveTrends(selectedTrends) {
    try {
        localStorage.setItem('selectedTrends', JSON.stringify(selectedTrends));
    } catch (e) {}
}

/**
 * טעינת מערך הטרנדים מ-localStorage
 * @returns {Array}
 */
export function loadTrends() {
    try {
        const saved = localStorage.getItem('selectedTrends');
        if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
} 