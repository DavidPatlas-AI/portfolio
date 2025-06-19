// יצירת מפת זיהוי הפוכה
const reverseMap = {};
Object.keys(homoglyphs).forEach(original => {
    homoglyphs[original].forEach(fake => {
        reverseMap[fake] = original;
    });
});

let currentTemplate = '';

// פונקציות ניווט
function showTab(tabName) {
    // הסתר כל הטאבים
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    // הסר active מכל הכפתורים
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // הצג הטאב הנבחר
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
    
    // אתחל טבלה אם נדרש
    if (tabName === 'table' && document.getElementById('tableBody').children.length === 0) {
        populateTable();
    }
}

// מילוי דוגמאות
function setExample(text) {
    document.getElementById('detectInput').value = text;
}

// ניתוח טקסט לזיהוי הומוגליפים
function analyzeText() {
    const input = document.getElementById('detectInput').value;
    if (!input.trim()) {
        alert('אנא הזן טקסט לבדיקה');
        return;
    }

    let suspicious = [];
    let highlightedText = '';
    let cleanText = '';

    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        if (reverseMap[char]) {
            const original = reverseMap[char];
            suspicious.push({
                char: char,
                original: original,
                position: i
            });
            highlightedText += `<span class="highlight" title="תו חשוד: ${char} (${char.charCodeAt(0).toString(16)}) במקום ${original}">${char}</span>`;
            cleanText += original;
        } else {
            highlightedText += char;
            cleanText += char;
        }
    }

    // הצגת התוצאות
    document.getElementById('originalText').innerHTML = highlightedText;
    document.getElementById('cleanText').textContent = cleanText;
    document.getElementById('detectResults').style.display = 'block';

    // עדכון סטטיסטיקות
    const suspiciousCount = suspicious.length;
    const totalChars = input.length;
    const cleanPercentage = Math.round(((totalChars - suspiciousCount) / totalChars) * 100);
    
    let riskLevel = 'נמוך';
    if (suspiciousCount > 0) {
        if (suspiciousCount >= totalChars * 0.5) riskLevel = 'גבוה';
        else if (suspiciousCount >= totalChars * 0.2) riskLevel = 'בינוני';
        else riskLevel = 'נמוך-בינוני';
    }

    document.getElementById('suspiciousCount').textContent = suspiciousCount;
    document.getElementById('riskLevel').textContent = riskLevel;
    document.getElementById('cleanPercentage').textContent = cleanPercentage + '%';
    
    if (suspiciousCount > 0) {
        document.getElementById('statsContainer').style.display = 'grid';
    }

    // ניתוח מפורט
    let analysisHtml = '';
    if (suspicious.length > 0) {
        analysisHtml = `
            <div class="analysis analysis-danger">
                <h3>⚠️ נמצאו ${suspicious.length} תווים חשודים מתוך ${totalChars} תווים סה"כ:</h3>
                <ul style="text-align: right; margin: 15px 0;">
        `;
        suspicious.forEach(item => {
            const unicodeOrig = item.original.charCodeAt(0).toString(16).toUpperCase();
            const unicodeFake = item.char.charCodeAt(0).toString(16).toUpperCase();
            analysisHtml += `<li style="margin: 8px 0;"><strong>"${item.char}"</strong> (U+${unicodeFake}) במקום <strong>"${item.original}"</strong> (U+${unicodeOrig}) במיקום ${item.position + 1}</li>`;
        });
        analysisHtml += `
                </ul>
                <p style="margin-top: 20px;"><strong>רמת סיכון:</strong> ${riskLevel}</p>
                <p><strong>המלצה:</strong> ${getRiskAdvice(riskLevel)}</p>
            </div>
        `;
    } else {
        analysisHtml = `
            <div class="analysis analysis-success">
                <h3>✅ הטקסט נקי ובטוח!</h3>
                <p>לא נמצאו תווים חשודים או הומוגליפים בטקסט זה.</p>
                <p>הטקסט משתמש בתווים סטנדרטיים בלבד.</p>
            </div>
        `;
    }
    
    document.getElementById('analysisResult').innerHTML = analysisHtml;
}

function getRiskAdvice(riskLevel) {
    switch(riskLevel) {
        case 'גבוה': return 'זהירות גבוהה! ייתכן מדובר בניסיון פישינג או הונאה. אל תלחץ על קישורים.';
        case 'בינוני': return 'היזהר! בדוק את מקור הטקסט ואמת לפני פעולה כלשהי.';
        case 'נמוך-בינוני': return 'שים לב! יש תווים חשודים בודדים. בדוק את המקור.';
        default: return 'רמת סיכון נמוכה, אך תמיד כדאי להיות זהיר.';
    }
}

// יצירת טקסט מתחפש
function generateText() {
    const input = document.getElementById('generateInput').value;
    if (!input.trim()) {
        alert('אנא הזן טקסט ליצירה');
        return;
    }

    const level = parseFloat(document.querySelector('input[name="level"]:checked').value);
    let result = '';
    let changes = [];

    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        if (homoglyphs[char] && Math.random() < level) {
            const alternatives = homoglyphs[char];
            const chosen = alternatives[Math.floor(Math.random() * alternatives.length)];
            result += chosen;
            changes.push({
                original: char,
                replacement: chosen,
                position: i,
                originalUnicode: char.charCodeAt(0).toString(16).toUpperCase(),
                replacementUnicode: chosen.charCodeAt(0).toString(16).toUpperCase()
            });
        } else {
            result += char;
        }
    }

    // הצגת התוצאות
    document.getElementById('generatedText').textContent = result;
    document.getElementById('generateResults').style.display = 'block';

    // ניתוח השינויים
    let analysisHtml = '';
    if (changes.length > 0) {
        const percentage = Math.round((changes.length / input.length) * 100);
        analysisHtml = `
            <div class="analysis">
                <h3>🔬 ניתוח ההתחפשות:</h3>
                <p><strong>בוצעו ${changes.length} שינויים מתוך ${input.length} תווים (${percentage}%)</strong></p>
                <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
                    <h4>📝 השינויים שבוצעו:</h4>
                    <ul style="text-align: right; margin: 10px 0;">
        `;
        changes.forEach(change => {
            analysisHtml += `<li style="margin: 5px 0;">"${change.original}" (U+${change.originalUnicode}) → "${change.replacement}" (U+${change.replacementUnicode}) במיקום ${change.position + 1}</li>`;
        });
        analysisHtml += `
                    </ul>
                </div>
                <p><strong>רמת הצלחה:</strong> ${getSuccessLevel(percentage)}</p>
            </div>
        `;
    } else {
        analysisHtml = '<div class="analysis"><p>לא בוצעו שינויים ברמת הערבוב שנבחרה. נסה רמה גבוהה יותר.</p></div>';
    }
    
    document.getElementById('generateAnalysis').innerHTML = analysisHtml;
}

function getSuccessLevel(percentage) {
    if (percentage >= 70) return 'גבוהה מאוד - טקסט מאוד מתחפש';
    if (percentage >= 50) return 'גבוהה - טקסט מתחפש היטב';
    if (percentage >= 30) return 'בינונית - טקסט מתחפש חלקית';
    if (percentage >= 10) return 'נמוכה - שינויים מועטים';
    return 'מינימלית - כמעט ללא שינויים';
}

// העתקה ללוח
function copyText(elementId) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert('הועתק ללוח!');
    }).catch(() => {
        // fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('הועתק ללוח!');
    });
}

// מילוי טבלת הומוגליפים
function populateTable() {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
    
    Object.keys(homoglyphs).forEach(original => {
        homoglyphs[original].forEach(fake => {
            const row = tbody.insertRow();
            
            const cell1 = row.insertCell(0);
            cell1.innerHTML = `<span class="char-display">${original}</span>`;
            
            const cell2 = row.insertCell(1);
            cell2.innerHTML = `<span class="char-display">${fake}</span>`;
            
            const cell3 = row.insertCell(2);
            cell3.textContent = getCharacterSystem(fake);
            
            const cell4 = row.insertCell(3);
            cell4.textContent = 'U+' + fake.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0');
            
            const cell5 = row.insertCell(4);
            cell5.textContent = getCommonUsage(original, fake);
        });
    });
}

// זיהוי מערכת התו
function getCharacterSystem(char) {
    const code = char.charCodeAt(0);
    if (code >= 0x0400 && code <= 0x04FF) return 'קיריליקה (רוסית)';
    if (code >= 0x0370 && code <= 0x03FF) return 'יוונית';
    if (code >= 0x2100 && code <= 0x214F) return 'מספרים רומיים';
    if (code >= 0x1D400 && code <= 0x1D7FF) return 'סמלים מתמטיים';
    if (code >= 0x0600 && code <= 0x06FF) return 'ערבית';
    return 'לטינית מורחבת';
}

// שימוש נפוץ
function getCommonUsage(original, fake) {
    const commonTargets = {
        'a': 'Google, PayPal',
        'e': 'Facebook, Netflix',
        'o': 'Microsoft, Amazon',
        'p': 'PayPal, Apple',
        'c': 'Microsoft',
        '0': 'כתובות אתרים',
        '1': 'מספרי טלפון'
    };
    return commonTargets[original] || 'כללי';
}

// סינון טבלה
function filterTable() {
    const searchTerm = document.getElementById('tableSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#tableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// פונקציות תבניות פישינג
function showTemplate(templateId) {
    currentTemplate = templateId;
    const template = templates[templateId];
    
    document.getElementById('templateTitle').textContent = template.title;
    document.getElementById('templatePreview').innerHTML = template.html;
    document.getElementById('templateCode').textContent = template.html;
    document.getElementById('templateTips').textContent = template.tips;
    document.getElementById('templateViewer').style.display = 'block';
    
    document.getElementById('templateViewer').scrollIntoView({ behavior: 'smooth' });
}

function closeTemplate() {
    document.getElementById('templateViewer').style.display = 'none';
}

function copyTemplateCode() {
    const code = document.getElementById('templateCode').textContent;
    navigator.clipboard.writeText(code).then(() => {
        alert('קוד התבנית הועתק ללוח!');
    }).catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('קוד התבנית הועתק ללוח!');
    });
}

function downloadTemplate() {
    const template = templates[currentTemplate];
    const fullHtml = `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${template.title} - תבנית לחינוך</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .warning { background: #fff3cd; padding: 20px; border: 2px solid #ffc107; border-radius: 10px; margin-bottom: 20px; text-align: center; }
    </style>
</head>
<body>
    <div class="warning">
        <h2>⚠️ זוהי תבנית לחינוך בלבד</h2>
        <p>תבנית זו מיועדת למטרות חינוכיות ולימוד זיהוי פישינג בלבד</p>
        <p><strong>אסור להשתמש בה למטרות הונאה או פעילות בלתי חוקית</strong></p>
    </div>
    ${template.html}
    <div class="warning">
        <h3>איך לזהות שזה פישינג:</h3>
        <p style="white-space: pre-line;">${template.tips}</p>
    </div>
</body>
</html>`;
    
    const blob = new Blob([fullHtml], { type: 'text/html; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentTemplate}_phishing_template.html`;
    a.click();
    URL.revokeObjectURL(url);
}

// אתחול
document.addEventListener('DOMContentLoaded', function() {
    // הוסף event listeners לרדיו buttons
    const radioInputs = document.querySelectorAll('input[name="level"]');
    radioInputs.forEach(input => {
        input.addEventListener('change', function() {
            // עדכן עיצוב כאשר נבחר
            radioInputs.forEach(r => r.parentElement.style.background = 'white');
            if (this.checked) {
                this.parentElement.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                this.parentElement.style.color = 'white';
            }
        });
    });
}); 