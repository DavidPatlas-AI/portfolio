let extractedFiles = {};

function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = 'message ' + type;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 4000);
}

function extractFiles(htmlContent) {
    const files = {};
    
    // חילוץ CSS
    const cssPattern = /<style[^>]*>([\s\S]*?)<\/style>/gi;
    let cssMatches = htmlContent.match(cssPattern);
    let cssContent = '';
    
    if (cssMatches) {
        cssMatches.forEach(match => {
            const css = match.replace(/<\/?style[^>]*>/gi, '');
            cssContent += css + '\n\n';
        });
    }

    // חילוץ JavaScript - תיקון הביטוי הרגולרי
    const jsPattern = /<script(?![^>]*src\s*=)[^>]*>([\s\S]*?)<\/script>/gi;
    let jsMatches = htmlContent.match(jsPattern);
    let jsContent = '';
    
    if (jsMatches) {
        jsMatches.forEach(match => {
            const js = match.replace(/<\/?script[^>]*>/gi, '');
            jsContent += js + '\n\n';
        });
    }

    // יצירת HTML נקי
    let cleanHtml = htmlContent;
    cleanHtml = cleanHtml.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    cleanHtml = cleanHtml.replace(/<script(?![^>]*src\s*=)[^>]*>[\s\S]*?<\/script>/gi, '');
    
    // הוספת קישורים לקבצים חיצוניים
    if (cssContent.trim()) {
        // תיקון - בדיקה אם כבר קיים link לCSS
        if (!cleanHtml.includes('href="style.css"')) {
            cleanHtml = cleanHtml.replace('</head>', '    <link rel="stylesheet" href="style.css">\n</head>');
        }
    }
    if (jsContent.trim()) {
        // תיקון - בדיקה אם כבר קיים script tag
        if (!cleanHtml.includes('src="script.js"')) {
            cleanHtml = cleanHtml.replace('</body>', '    <script src="script.js"></script>\n</body>');
        }
    }

    files['index.html'] = cleanHtml;
    
    if (cssContent.trim()) {
        files['style.css'] = cssContent.trim();
    }
    
    if (jsContent.trim()) {
        files['script.js'] = jsContent.trim();
    }

    return files;
}

function downloadFile(filename, content) {
    try {
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('שגיאה בהורדת הקובץ:', error);
        showMessage('שגיאה בהורדת הקובץ ' + filename, 'error');
    }
}

function getFileIcon(filename) {
    if (filename.includes('.html')) return '🌐';
    if (filename.includes('.css')) return '🎨';
    if (filename.includes('.js')) return '⚡';
    return '📄';
}

function createFileCard(filename, content) {
    const card = document.createElement('div');
    card.className = 'file-card';
    
    const safeContent = content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    card.innerHTML = `
        <div class="file-header">
            <span class="file-name">${getFileIcon(filename)} ${filename}</span>
            <button class="download-btn" data-filename="${filename}">
                💾 הורד
            </button>
        </div>
        <div class="file-content">${safeContent}</div>
    `;

    // הוספת event listener לכפתור ההורדה
    const downloadBtn = card.querySelector('.download-btn');
    downloadBtn.addEventListener('click', () => {
        downloadFile(filename, extractedFiles[filename]);
    });

    return card;
}

function displayResults(files) {
    const fileGrid = document.getElementById('fileGrid');
    fileGrid.innerHTML = '';

    Object.entries(files).forEach(([filename, content]) => {
        const fileCard = createFileCard(filename, content);
        fileGrid.appendChild(fileCard);
    });

    document.getElementById('results').classList.add('show');
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('splitBtn').addEventListener('click', () => {
        const htmlContent = document.getElementById('htmlInput').value.trim();
        
        if (!htmlContent) {
            showMessage('אנא הדבק קוד HTML תחילה', 'error');
            return;
        }

        try {
            extractedFiles = extractFiles(htmlContent);
            if (Object.keys(extractedFiles).length === 0) {
                showMessage('לא נמצאו קבצים לפיצול', 'error');
                return;
            }
            displayResults(extractedFiles);
            showMessage('הקבצים פוצלו בהצלחה!', 'success');
        } catch (error) {
            showMessage('שגיאה בפיצול הקבצים', 'error');
            console.error(error);
        }
    });

    document.getElementById('downloadAllBtn').addEventListener('click', () => {
        if (Object.keys(extractedFiles).length === 0) {
            showMessage('אין קבצים להורדה', 'error');
            return;
        }

        // תיקון הבאג בהורדה של כל הקבצים
        let downloadCount = 0;
        Object.entries(extractedFiles).forEach(([filename, content], index) => {
            setTimeout(() => {
                downloadFile(filename, content);
                downloadCount++;
                if (downloadCount === Object.keys(extractedFiles).length) {
                    showMessage('כל הקבצים הורדו בהצלחה!', 'success');
                }
            }, index * 200); // השהיה של 200ms בין כל הורדה
        });
    });
}); 