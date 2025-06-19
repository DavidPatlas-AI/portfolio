const palettes = [
    // Flags
    {
        name: "דגל ישראל 🇮🇱",
        colors: ["#0038b8", "#ffffff", "#0038b8", "#ffffff", "#0038b8"],
        category: "flags",
        description: "כחול ולבן",
        icon: "🇮🇱"
    },
    {
        name: "דגל צרפת 🇫🇷",
        colors: ["#0055a4", "#ffffff", "#ef4135", "#ffffff", "#0055a4"],
        category: "flags",
        description: "כחול, לבן, אדום",
        icon: "🇫🇷"
    },
    {
        name: "דגל איטליה 🇮🇹",
        colors: ["#008c45", "#ffffff", "#f4f5f0", "#ffffff", "#cd212a"],
        category: "flags",
        description: "ירוק, לבן, אדום",
        icon: "🇮🇹"
    },
    {
        name: "דגל גרמניה 🇩🇪",
        colors: ["#000000", "#dd0000", "#ffce00", "#dd0000", "#000000"],
        category: "flags",
        description: "שחור, אדום, צהוב",
        icon: "🇩🇪"
    },
    {
        name: "דגל ארה\"ב 🇺🇸",
        colors: ["#3c3b6e", "#ffffff", "#b22234", "#ffffff", "#b22234"],
        category: "flags",
        description: "כחול, לבן, אדום",
        icon: "🇺🇸"
    },
    {
        name: "דגל בריטניה 🇬🇧",
        colors: ["#012169", "#ffffff", "#c8102e", "#ffffff", "#012169"],
        category: "flags",
        description: "כחול, לבן, אדום",
        icon: "🇬🇧"
    },
    {
        name: "דגל יפן 🇯🇵",
        colors: ["#bc002d", "#ffffff", "#bc002d", "#ffffff", "#bc002d"],
        category: "flags",
        description: "אדום, לבן",
        icon: "🇯🇵"
    },
    {
        name: "דגל קנדה 🇨🇦",
        colors: ["#ff0000", "#ffffff", "#ff0000", "#ffffff", "#ff0000"],
        category: "flags",
        description: "אדום, לבן",
        icon: "🇨🇦"
    },
    {
        name: "דגל אוסטרליה 🇦🇺",
        colors: ["#012169", "#ffffff", "#e4002b", "#ffffff", "#012169"],
        category: "flags",
        description: "כחול, לבן, אדום",
        icon: "🇦🇺"
    },
    {
        name: "דגל הולנד 🇳🇱",
        colors: ["#21468b", "#ffffff", "#ae1c28", "#ffffff", "#21468b"],
        category: "flags",
        description: "כחול, לבן, אדום",
        icon: "🇳🇱"
    },
    {
        name: "דגל ספרד 🇪🇸",
        colors: ["#aa151b", "#f1bf00", "#aa151b", "#f1bf00", "#aa151b"],
        category: "flags",
        description: "אדום, צהוב",
        icon: "🇪🇸"
    },
    {
        name: "דגל ברזיל 🇧🇷",
        colors: ["#009739", "#fedf00", "#002776", "#ffffff", "#009739"],
        category: "flags",
        description: "ירוק, צהוב, כחול, לבן",
        icon: "🇧🇷"
    },
    {
        name: "דגל רוסיה 🇷🇺",
        colors: ["#ffffff", "#0039a6", "#d52b1e", "#ffffff", "#0039a6"],
        category: "flags",
        description: "לבן, כחול, אדום",
        icon: "🇷🇺"
    },
    {
        name: "דגל סין 🇨🇳",
        colors: ["#de2910", "#ffde00", "#de2910", "#ffde00", "#de2910"],
        category: "flags",
        description: "אדום, צהוב",
        icon: "🇨🇳"
    },
    {
        name: "דגל הודו 🇮🇳",
        colors: ["#ff9933", "#ffffff", "#138808", "#000080", "#ff9933"],
        category: "flags",
        description: "כתום, לבן, ירוק, כחול",
        icon: "🇮🇳"
    },
    // Moods
    {
        name: "שמחה ואופטימיות 😊",
        colors: ["#fbbf24", "#f97316", "#ec4899", "#06b6d4", "#22c55e"],
        category: "moods",
        description: "צהוב, כתום, ורוד, תכלת, ירוק",
        icon: "😊"
    },
    {
        name: "רוגע ושלווה 😌",
        colors: ["#93c5fd", "#a7f3d0", "#fde68a", "#e0e7ff", "#c7d2fe"],
        category: "moods",
        description: "כחול בהיר, ירוק בהיר, צהוב בהיר",
        icon: "🧘"
    },
    {
        name: "עוצמה ודרמטיות 💪",
        colors: ["#dc2626", "#000000", "#f97316", "#7f1d1d", "#b91c1c"],
        category: "moods",
        description: "אדום, שחור, כתום",
        icon: "🔥"
    },
    // Sectors
    {
        name: "חרדי מינימליסטי 🎩",
        colors: ["#000000", "#ffffff", "#6b7280", "#000000", "#9ca3af"],
        category: "sectors",
        description: "שחור, לבן, אפור",
        icon: "🕍"
    },
    {
        name: "תל אביבי 🌈",
        colors: ["#ec4899", "#06b6d4", "#eab308", "#f97316", "#8b5cf6"],
        category: "sectors",
        description: "ורוד, תכלת, צהוב, כתום, סגול",
        icon: "🏖️"
    },
    {
        name: "דתי לאומי 🧢",
        colors: ["#3b82f6", "#f97316", "#ffffff", "#3b82f6", "#f97316"],
        category: "sectors",
        description: "כחול, כתום, לבן",
        icon: "🕍"
    },
    {
        name: "טבעוני אקולוגי 🌱",
        colors: ["#22c55e", "#84cc16", "#eab308", "#16a34a", "#65a30d"],
        category: "sectors",
        description: "ירוק, ירוק בהיר, צהוב",
        icon: "🌿"
    },
    {
        name: "חילוני תל אביבי 🏙️",
        colors: ["#00bcd4", "#ff5722", "#ffeb3b", "#e91e63", "#9c27b0"],
        category: "sectors",
        description: "תכלת, כתום, צהוב, ורוד, סגול",
        icon: "🏙️"
    },
    {
        name: "ירושלמי מסורתי 🕍",
        colors: ["#8d6e63", "#ffc107", "#ffffff", "#795548", "#3e2723"],
        category: "sectors",
        description: "חום, זהוב, לבן, חום כהה",
        icon: "🕍"
    },
    {
        name: "קיבוצניק 🚜",
        colors: ["#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ff9800"],
        category: "sectors",
        description: "ירוק, ירוק בהיר, צהוב ירקרק, צהוב, כתום",
        icon: "🚜"
    },
    {
        name: "צה\"ל וביטחון 🎖️",
        colors: ["#2e7d32", "#1b5e20", "#827717", "#f57f17", "#e65100"],
        category: "sectors",
        description: "ירוק צבאי, ירוק כהה, חאקי, צהוב, כתום",
        icon: "🎖️"
    },
    {
        name: "אקדמיה ומחקר 🎓",
        colors: ["#1976d2", "#303f9f", "#512da8", "#7b1fa2", "#c2185b"],
        category: "sectors",
        description: "כחול, כחול כהה, סגול, סגול כהה, ורוד",
        icon: "🎓"
    },
    {
        name: "אמנות ותרבות 🎭",
        colors: ["#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3"],
        category: "sectors",
        description: "ורוד, סגול, סגול כהה, כחול, תכלת",
        icon: "🎭"
    },
    {
        name: "עסקים ופיננסים 💼",
        colors: ["#263238", "#37474f", "#455a64", "#546e7a", "#607d8b"],
        category: "sectors",
        description: "אפור כהה, אפור כחלחל, אפור בינוני",
        icon: "💼"
    },
    {
        name: "יזמות וסטארט-אפ 🚀",
        colors: ["#ff5722", "#ff9800", "#ffc107", "#ffeb3b", "#cddc39"],
        category: "sectors",
        description: "כתום, כתום בהיר, צהוב זהוב, צהוב, ירוק צהוב",
        icon: "🚀"
    },
    {
        name: "מזרחי מסורתי 🪘",
        colors: ["#d32f2f", "#f57c00", "#fbc02d", "#689f38", "#1976d2"],
        category: "sectors",
        description: "אדום, כתום, צהוב, ירוק, כחול",
        icon: "🪘"
    },
    {
        name: "אשכנזי קלאסי 🎻",
        colors: ["#424242", "#616161", "#757575", "#9e9e9e", "#bdbdbd"],
        category: "sectors",
        description: "אפור כהה, אפור, אפור בהיר",
        icon: "🎻"
    },
    // Nature
    {
        name: "יער קסום 🌲",
        colors: ["#14532d", "#22c55e", "#a3e635", "#fef9c3", "#fbbf24"],
        category: "nature",
        description: "ירוק כהה, ירוק, צהוב, זהב",
        icon: "🌲"
    },
    {
        name: "שקיעה במדבר 🏜️",
        colors: ["#fbbf24", "#f59e42", "#f97316", "#be185d", "#7c3aed"],
        category: "nature",
        description: "צהוב, כתום, ורוד, סגול",
        icon: "🏜️"
    },
    // Food
    {
        name: "גלידה פיסטוק 🍦",
        colors: ["#a7f3d0", "#fef9c3", "#fbbf24", "#fca5a5", "#a3e635"],
        category: "food",
        description: "פיסטוק, וניל, מנגו, תות, ליים",
        icon: "🍦"
    },
    {
        name: "פירות יער 🍓",
        colors: ["#be185d", "#f43f5e", "#fbbf24", "#a3e635", "#22d3ee"],
        category: "food",
        description: "פטל, תות, מנגו, ליים, תכלת",
        icon: "🍓"
    },
    // Tech - Expanded
    {
        name: "הייטק מודרני 💻",
        colors: ["#0ea5e9", "#64748b", "#f1f5f9", "#3b82f6", "#a21caf"],
        category: "tech",
        description: "כחול, אפור, לבן, סגול",
        icon: "💻"
    },
    {
        name: "גוגל קלאסי 🔍",
        colors: ["#4285f4", "#ea4335", "#fbbc04", "#34a853", "#4285f4"],
        category: "tech",
        description: "כחול גוגל, אדום, צהוב, ירוק",
        icon: "🔍"
    },
    {
        name: "מטא פייסבוק 📘",
        colors: ["#1877f2", "#42a5f5", "#ffffff", "#e3f2fd", "#1565c0"],
        category: "tech",
        description: "כחול פייסבוק, תכלת, לבן",
        icon: "📘"
    },
    {
        name: "מיקרוסופט אופיס 📊",
        colors: ["#0078d4", "#107c10", "#ff8c00", "#e81123", "#5c2d91"],
        category: "tech",
        description: "כחול, ירוק, כתום, אדום, סגול",
        icon: "📊"
    },
    {
        name: "אפל מינימל 🍎",
        colors: ["#007aff", "#ff3b30", "#ff9500", "#ffcc02", "#34c759"],
        category: "tech",
        description: "כחול iOS, אדום, כתום, צהוב, ירוק",
        icon: "🍎"
    },
    {
        name: "גיטהאב דארק 🐙",
        colors: ["#21262d", "#30363d", "#f0f6fc", "#238636", "#da3633"],
        category: "tech",
        description: "אפור כהה, לבן, ירוק, אדום",
        icon: "🐙"
    },
    {
        name: "ספוטיפיי 🎵",
        colors: ["#1db954", "#191414", "#ffffff", "#1ed760", "#000000"],
        category: "tech",
        description: "ירוק ספוטיפיי, שחור, לבן",
        icon: "🎵"
    },
    {
        name: "טוויטר X 🐦",
        colors: ["#1da1f2", "#14171a", "#ffffff", "#657786", "#aab8c2"],
        category: "tech",
        description: "כחול טוויטר, שחור, אפור",
        icon: "🐦"
    },
    {
        name: "אמזון 📦",
        colors: ["#ff9900", "#232f3e", "#ffffff", "#febd69", "#146eb4"],
        category: "tech",
        description: "כתום אמזון, כחול כהה, לבן",
        icon: "📦"
    },
    {
        name: "נטפליקס 🎬",
        colors: ["#e50914", "#221f1f", "#f5f5f1", "#564d4d", "#831010"],
        category: "tech",
        description: "אדום נטפליקס, שחור, אפור",
        icon: "🎬"
    },
    {
        name: "אינסטגרם 📸",
        colors: ["#e4405f", "#833ab4", "#fccc63", "#fd1d1d", "#405de6"],
        category: "tech",
        description: "ורוד, סגול, צהוב, כחול",
        icon: "📸"
    },
    {
        name: "יוטיוב 📺",
        colors: ["#ff0000", "#282828", "#ffffff", "#cc0000", "#606060"],
        category: "tech",
        description: "אדום יוטיוב, אפור כהה, לבן",
        icon: "📺"
    },
    {
        name: "סלאק 💬",
        colors: ["#4a154b", "#36c5f0", "#2eb67d", "#ecb22e", "#e01e5a"],
        category: "tech",
        description: "סגול, תכלת, ירוק, צהוב, ורוד",
        icon: "💬"
    },
    {
        name: "זום 💻",
        colors: ["#2d8cff", "#ffffff", "#747487", "#00d4ff", "#1e1e1e"],
        category: "tech",
        description: "כחול זום, לבן, אפור, תכלת",
        icon: "💻"
    },
    {
        name: "דיסקורד 🎮",
        colors: ["#5865f2", "#36393f", "#ffffff", "#7289da", "#2c2f33"],
        category: "tech",
        description: "סגול דיסקורד, אפור כהה, לבן",
        icon: "🎮"
    },
    // Pastel
    {
        name: "פסטל אביב 🌸",
        colors: ["#fbcfe8", "#a7f3d0", "#fef9c3", "#bae6fd", "#f5d0fe"],
        category: "pastel",
        description: "ורוד, ירוק, צהוב, תכלת, לילך",
        icon: "🌸"
    },
    // Neon
    {
        name: "ניאון לילה 🌃",
        colors: ["#f43f5e", "#fbbf24", "#22d3ee", "#a21caf", "#22c55e"],
        category: "neon",
        description: "ורוד, צהוב, תכלת, סגול, ירוק",
        icon: "🌃"
    },
    // Retro
    {
        name: "רטרו 80׳ס 🕹️",
        colors: ["#f59e42", "#f43f5e", "#3b82f6", "#fbbf24", "#a21caf"],
        category: "retro",
        description: "כתום, ורוד, כחול, צהוב, סגול",
        icon: "🕹️"
    },
    // New Palettes - Elegant & Sophisticated
    {
        name: "חמימות קלאסית 🍷",
        colors: ["#BF3F57", "#023059", "#8C4F04", "#D95829", "#730202"],
        category: "elegant",
        description: "אדום לבנים, כחול פרוסי, חום, כתום להבה",
        icon: "🍷"
    },
    {
        name: "כתום עשיר 🍊",
        colors: ["#F2B680", "#F2884B", "#D9320D", "#400101", "#BF3434"],
        category: "warm",
        description: "אפרסק, כתום מלכותי, שוקולד כהה",
        icon: "🍊"
    },
    {
        name: "פסטל חלומי 🌸",
        colors: ["#D9A0AF", "#8A7ED9", "#63CAF2", "#06BFBF", "#F2B28D"],
        category: "pastel",
        description: "ורוד פסטל, סגול, תכלת מאיה, טיפאני",
        icon: "🌸"
    },
    {
        name: "סגולים מתוחכמים 💜",
        colors: ["#8A3BD9", "#AC79F2", "#3A175B", "#62679F", "#57568C"],
        category: "elegant",
        description: "סגול כחלחל, לבנדר, סגול אמריקאי",
        icon: "💜"
    },
    {
        name: "ניגוד קר וחם 🔷",
        colors: ["#0A3B59", "#0F8DBF", "#1DDDF2", "#F2490C", "#730C02"],
        category: "contrast",
        description: "כחול פרוסי, תכלת, כחול פלואורסנט, כתום",
        icon: "🔷"
    },
    {
        name: "רגוע ונועז 🌅",
        colors: ["#2F3273", "#6581A6", "#8EACBF", "#F29877", "#F21F0C"],
        category: "balanced",
        description: "כחול עמוק, תכלת אפור, סלמון, אדום",
        icon: "🌅"
    },
    {
        name: "עוצמה דיגיטלית 📱",
        colors: ["#BF3952", "#30588C", "#011526", "#6093BF", "#254559"],
        category: "digital",
        description: "ורוד אדום, כחול, שחור עשיר, אינדיגו יפני",
        icon: "📱"
    },
    // Gaming
    {
        name: "גיימינג RGB 🎮",
        colors: ["#ff0080", "#00ff80", "#8000ff", "#ff8000", "#0080ff"],
        category: "gaming",
        description: "ורוד ניאון, ירוק ניאון, סגול, כתום, כחול",
        icon: "🎮"
    },
    {
        name: "סטים 🎮",
        colors: ["#ff6b35", "#004225", "#6b5b95", "#88d8b0", "#ffeaa7"],
        category: "gaming",
        description: "כתום, ירוק כהה, סגול, מנטה, צהוב בהיר",
        icon: "🎮"
    },
    // Sports
    {
        name: "כדורגל ברזיל ⚽",
        colors: ["#009739", "#fedf00", "#002776", "#ffffff", "#009739"],
        category: "sports",
        description: "ירוק, צהוב, כחול, לבן",
        icon: "⚽"
    },
    {
        name: "NBA לייקרס 🏀",
        colors: ["#552583", "#fdb927", "#000000", "#ffffff", "#552583"],
        category: "sports",
        description: "סגול, זהוב, שחור, לבן",
        icon: "🏀"
    },
    
    // Israeli Football Teams
    {
        name: "ביתר ירושלים 💛🖤",
        colors: ["#ffff00", "#000000", "#ffffff", "#ffff00", "#000000"],
        category: "sports",
        description: "צהוב, שחור, לבן",
        icon: "⚽"
    },
    {
        name: "הפועל באר שבע 🔴⚽",
        colors: ["#dc143c", "#ffffff", "#000000", "#dc143c", "#ffffff"],
        category: "sports",
        description: "אדום, לבן, שחור",
        icon: "⚽"
    },
    {
        name: "מכבי תל אביב 💙💛",
        colors: ["#0066cc", "#ffff00", "#ffffff", "#0066cc", "#ffff00"],
        category: "sports",
        description: "כחול, צהוב, לבן",
        icon: "⚽"
    },
    {
        name: "הפועל תל אביב 🔴⚽",
        colors: ["#e60026", "#ffffff", "#000000", "#e60026", "#ffffff"],
        category: "sports",
        description: "אדום, לבן, שחור",
        icon: "⚽"
    },
    {
        name: "מכבי חיפה 💚⚽",
        colors: ["#228b22", "#ffffff", "#000000", "#228b22", "#ffffff"],
        category: "sports",
        description: "ירוק, לבן, שחור",
        icon: "⚽"
    },
    {
        name: "הפועל חיפה 🔴💚",
        colors: ["#dc143c", "#228b22", "#ffffff", "#dc143c", "#228b22"],
        category: "sports",
        description: "אדום, ירוק, לבן",
        icon: "⚽"
    },
    {
        name: "בני סכנין 💚🖤",
        colors: ["#228b22", "#000000", "#ffffff", "#228b22", "#000000"],
        category: "sports",
        description: "ירוק, שחור, לבן",
        icon: "⚽"
    },
    {
        name: "מכבי נתניה 💛🔵",
        colors: ["#ffff00", "#0066cc", "#ffffff", "#ffff00", "#0066cc"],
        category: "sports",
        description: "צהוב, כחול, לבן",
        icon: "⚽"
    },
    
    // European Football Giants
    {
        name: "ברצלונה 🔵🔴",
        colors: ["#004d98", "#a50044", "#ffcb05", "#004d98", "#a50044"],
        category: "sports",
        description: "כחול, אדום, זהוב",
        icon: "⚽"
    },
    {
        name: "ריאל מדריד ⚪👑",
        colors: ["#ffffff", "#ffd700", "#000080", "#ffffff", "#ffd700"],
        category: "sports",
        description: "לבן, זהוב, כחול כהה",
        icon: "⚽"
    },
    {
        name: "מנצ'סטר יונייטד 🔴👹",
        colors: ["#da020e", "#ffffff", "#000000", "#da020e", "#ffffff"],
        category: "sports",
        description: "אדום, לבן, שחור",
        icon: "⚽"
    },
    {
        name: "מנצ'סטר סיטי 🔵⚪",
        colors: ["#6cabdd", "#ffffff", "#1c2c5b", "#6cabdd", "#ffffff"],
        category: "sports",
        description: "תכלת, לבן, כחול כהה",
        icon: "⚽"
    },
    {
        name: "ליברפול 🔴⚽",
        colors: ["#c8102e", "#ffffff", "#00b2a9", "#c8102e", "#ffffff"],
        category: "sports",
        description: "אדום, לבן, תכלת",
        icon: "⚽"
    },
    {
        name: "צ'לסי 🔵⚪",
        colors: ["#034694", "#ffffff", "#dba111", "#034694", "#ffffff"],
        category: "sports",
        description: "כחול, לבן, זהוב",
        icon: "⚽"
    },
    {
        name: "ארסנל 🔴⚪",
        colors: ["#ef0107", "#ffffff", "#9c824a", "#ef0107", "#ffffff"],
        category: "sports",
        description: "אדום, לבן, זהוב",
        icon: "⚽"
    },
    {
        name: "יובנטוס ⚫⚪",
        colors: ["#000000", "#ffffff", "#b7b7b7", "#000000", "#ffffff"],
        category: "sports",
        description: "שחור, לבן, אפור",
        icon: "⚽"
    },
    {
        name: "מילאן 🔴🖤",
        colors: ["#fb090b", "#000000", "#ffffff", "#fb090b", "#000000"],
        category: "sports",
        description: "אדום, שחור, לבן",
        icon: "⚽"
    },
    {
        name: "אינטר מילאן 🔵🖤",
        colors: ["#0068a8", "#000000", "#ffffff", "#0068a8", "#000000"],
        category: "sports",
        description: "כחול, שחור, לבן",
        icon: "⚽"
    },
    {
        name: "בייארן מינכן 🔴⚪",
        colors: ["#dc052d", "#ffffff", "#0066b2", "#dc052d", "#ffffff"],
        category: "sports",
        description: "אדום, לבן, כחול",
        icon: "⚽"
    },
    {
        name: "דורטמונד 💛🖤",
        colors: ["#fde100", "#000000", "#ffffff", "#fde100", "#000000"],
        category: "sports",
        description: "צהוב, שחור, לבן",
        icon: "⚽"
    },
    {
        name: "פריז סן ז'רמן 🔵🔴",
        colors: ["#004170", "#da020e", "#ffffff", "#004170", "#da020e"],
        category: "sports",
        description: "כחול כהה, אדום, לבן",
        icon: "⚽"
    },
    
    // Basketball Teams
    {
        name: "מכבי תל אביב כדורסל 💛🔵",
        colors: ["#ffff00", "#0066cc", "#ffffff", "#ffff00", "#0066cc"],
        category: "sports",
        description: "צהוב, כחול, לבן",
        icon: "🏀"
    },
    {
        name: "הפועל ירושלים כדורסל 🔴🔵",
        colors: ["#dc143c", "#0066cc", "#ffffff", "#dc143c", "#0066cc"],
        category: "sports",
        description: "אדום, כחול, לבן",
        icon: "🏀"
    },
    {
        name: "מכבי חיפה כדורסל 💚⚪",
        colors: ["#228b22", "#ffffff", "#000000", "#228b22", "#ffffff"],
        category: "sports",
        description: "ירוק, לבן, שחור",
        icon: "🏀"
    },
    {
        name: "גולדן סטייט ווריירס 🔵💛",
        colors: ["#1d428a", "#ffc72c", "#ffffff", "#1d428a", "#ffc72c"],
        category: "sports",
        description: "כחול, זהוב, לבן",
        icon: "🏀"
    },
    {
        name: "שיקגו בולס 🔴⚫",
        colors: ["#ce1141", "#000000", "#ffffff", "#ce1141", "#000000"],
        category: "sports",
        description: "אדום, שחור, לבן",
        icon: "🏀"
    },
    {
        name: "בוסטון סלטיקס 💚⚪",
        colors: ["#007a33", "#ffffff", "#000000", "#007a33", "#ffffff"],
        category: "sports",
        description: "ירוק, לבן, שחור",
        icon: "🏀"
    },
    
    // Tennis & Other Sports
    {
        name: "ווימבלדון טניס 💚⚪",
        colors: ["#006a4e", "#ffffff", "#d4af37", "#006a4e", "#ffffff"],
        category: "sports",
        description: "ירוק, לבן, זהוב",
        icon: "🎾"
    },
    {
        name: "אולימפיאדה 🏅",
        colors: ["#0085c3", "#f4c430", "#000000", "#ee334e", "#00a651"],
        category: "sports",
        description: "כחול, צהוב, שחור, אדום, ירוק",
        icon: "🏅"
    },
    {
        name: "פורמולה 1 🏎️",
        colors: ["#e10600", "#000000", "#ffffff", "#c0c0c0", "#ffd700"],
        category: "sports",
        description: "אדום, שחור, לבן, כסף, זהוב",
        icon: "🏎️"
    },
    // Space
    {
        name: "גלקסיה רחוקה 🌌",
        colors: ["#2d1b69", "#11001c", "#6b46c1", "#a855f7", "#c084fc"],
        category: "space",
        description: "סגול כהה, שחור, סגול בהיר",
        icon: "🌌"
    },
    {
        name: "נאסא 🚀",
        colors: ["#fc3d21", "#ffffff", "#0b3d91", "#000000", "#fc3d21"],
        category: "space",
        description: "אדום נאסא, לבן, כחול, שחור",
        icon: "🚀"
    },
    // Fashion
    {
        name: "שאנל קלאסי 👗",
        colors: ["#000000", "#ffffff", "#c9b037", "#000000", "#ffffff"],
        category: "fashion",
        description: "שחור, לבן, זהוב",
        icon: "👗"
    },
    {
        name: "ורסאצ'ה זהוב ✨",
        colors: ["#d4af37", "#000000", "#ffffff", "#ffd700", "#1a1a1a"],
        category: "fashion",
        description: "זהוב, שחור, לבן",
        icon: "✨"
    },
    // Music
    {
        name: "ג'אז קלאסי 🎷",
        colors: ["#8b4513", "#daa520", "#2f4f4f", "#f5deb3", "#cd853f"],
        category: "music",
        description: "חום, זהוב, אפור כהה, בז'",
        icon: "🎷"
    },
    {
        name: "רוק אנד רול 🎸",
        colors: ["#000000", "#ff0000", "#ffffff", "#800000", "#404040"],
        category: "music",
        description: "שחור, אדום, לבן, בורדו",
        icon: "🎸"
    },
    // Automotive
    {
        name: "פרארי אדום 🏎️",
        colors: ["#dc143c", "#000000", "#ffffff", "#8b0000", "#ff6347"],
        category: "automotive",
        description: "אדום פרארי, שחור, לבן",
        icon: "🏎️"
    },
    {
        name: "למבורגיני 🚗",
        colors: ["#ffb347", "#000000", "#ffffff", "#ff8c00", "#2f2f2f"],
        category: "automotive",
        description: "כתום, שחור, לבן",
        icon: "🚗"
    },
    // Finance
    {
        name: "וול סטריט 💰",
        colors: ["#2e8b57", "#000000", "#ffd700", "#ffffff", "#006400"],
        category: "finance",
        description: "ירוק, שחור, זהוב, לבן",
        icon: "💰"
    },
    {
        name: "ביטקוין 🪙",
        colors: ["#f7931a", "#000000", "#ffffff", "#ffb347", "#333333"],
        category: "finance",
        description: "כתום ביטקוין, שחור, לבן",
        icon: "🪙"
    },
    {
        name: "ימי אלגנטי ⚓",
        colors: ["#012340", "#0477BF", "#048ABF", "#07B2D9", "#D98032"],
        category: "marine",
        description: "כחול אוקספורד, כחול ים, ציאן, ברונזה סינית",
        icon: "⚓"
    },
    {
        name: "סוכריות וכיף 🍬",
        colors: ["#F2B6CC", "#F263A6", "#04738C", "#29DEF2", "#F2E7C4"],
        category: "sweet",
        description: "ורוד קמיאו, ציקלמן, ירוק ים, לימון מרנג",
        icon: "🍬"
    },
    {
        name: "כחול מלכותי 👔",
        colors: ["#021373", "#020F59", "#010B40", "#010626", "#8491D9"],
        category: "royal",
        description: "כחול אימפריאלי, אוקספורד, שחור עשיר, ויסטה",
        icon: "👔"
    },
    
    // Vintage & Retro Styles
    {
        name: "ישראל שנות ה-90 📼",
        colors: ["#ff6b35", "#f7931e", "#ffcc02", "#39b54a", "#1e88e5"],
        category: "vintage",
        description: "כתום זוהר, צהוב, ירוק, כחול תוסס",
        icon: "📼"
    },
    {
        name: "ברית המועצות ☭",
        colors: ["#cc0000", "#ffcc00", "#333333", "#666666", "#999999"],
        category: "vintage",
        description: "אדום סובייטי, צהוב, אפור כהה",
        icon: "☭"
    },
    {
        name: "ישראל שנות ה-80 📻",
        colors: ["#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#00bcd4"],
        category: "vintage",
        description: "ורוד, סגול, כחול ניאון",
        icon: "📻"
    },
    {
        name: "גרמניה המזרחית 🏭",
        colors: ["#1976d2", "#ffc107", "#d32f2f", "#388e3c", "#616161"],
        category: "vintage",
        description: "כחול, צהוב, אדום, ירוק, אפור",
        icon: "🏭"
    },
    {
        name: "יוגוסלביה הישנה 🏛️",
        colors: ["#1565c0", "#ffffff", "#d32f2f", "#1976d2", "#424242"],
        category: "vintage",
        description: "כחול, לבן, אדום, אפור",
        icon: "🏛️"
    },
    {
        name: "צ'כוסלובקיה 🏰",
        colors: ["#1976d2", "#ffffff", "#d32f2f", "#1565c0", "#0d47a1"],
        category: "vintage",
        description: "כחול, לבן, אדום",
        icon: "🏰"
    },
    {
        name: "מצרים נאצר 🏺",
        colors: ["#d32f2f", "#ffffff", "#424242", "#f57c00", "#8bc34a"],
        category: "vintage",
        description: "אדום, לבן, שחור, כתום, ירוק",
        icon: "🏺"
    },
    {
        name: "ישראל ימי בן גוריון 🇮🇱",
        colors: ["#1976d2", "#ffffff", "#2196f3", "#e3f2fd", "#0d47a1"],
        category: "vintage",
        description: "כחול, לבן, תכלת בהיר",
        icon: "🇮🇱"
    },
    {
        name: "אמריקה שנות ה-50 🚗",
        colors: ["#ff5722", "#4caf50", "#2196f3", "#ffeb3b", "#e91e63"],
        category: "vintage",
        description: "כתום, ירוק, כחול, צהוב, ורוד",
        icon: "🚗"
    },
    {
        name: "ברזיל שנות ה-70 ⚽",
        colors: ["#ffeb3b", "#4caf50", "#2196f3", "#ff9800", "#795548"],
        category: "vintage",
        description: "צהוב, ירוק, כחול, כתום, חום",
        icon: "⚽"
    },
    {
        name: "יפן שנות ה-80 🏮",
        colors: ["#e91e63", "#9c27b0", "#3f51b5", "#00bcd4", "#4caf50"],
        category: "vintage",
        description: "ורוד, סגול, כחול, תכלת, ירוק",
        icon: "🏮"
    },
    {
        name: "בריטניה ויקטוריאנית 👑",
        colors: ["#8d6e63", "#5d4037", "#3e2723", "#a1887f", "#d7ccc8"],
        category: "vintage",
        description: "חום, חום כהה, בז'",
        icon: "👑"
    },
    {
        name: "צרפת בל אפוק 🗼",
        colors: ["#1976d2", "#ffffff", "#d32f2f", "#ffc107", "#4caf50"],
        category: "vintage",
        description: "כחול, לבן, אדום, צהוב, ירוק",
        icon: "🗼"
    },
    {
        name: "איטליה רנסנס 🎨",
        colors: ["#8d6e63", "#ff8f00", "#d32f2f", "#1976d2", "#4caf50"],
        category: "vintage",
        description: "חום, זהוב, אדום, כחול, ירוק",
        icon: "🎨"
    },
    {
        name: "תל אביב הלבנה 🏖️",
        colors: ["#ffffff", "#e3f2fd", "#bbdefb", "#90caf9", "#64b5f6"],
        category: "vintage",
        description: "לבן, תכלת בהיר, כחול בהיר",
        icon: "🏖️"
    },
    {
        name: "ארה\"ב שנות ה-60 ☮️",
        colors: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24", "#f0932b"],
        category: "vintage",
        description: "אדום, תכלת, כחול, צהוב, כתום",
        icon: "☮️"
    },
    {
        name: "סין תקופת מאו 🏮",
        colors: ["#dc143c", "#ffd700", "#000000", "#8b0000", "#ff6347"],
        category: "vintage",
        description: "אדום, זהוב, שחור",
        icon: "🏮"
    },
    {
        name: "קובה קסטרו 🇨🇺",
        colors: ["#006400", "#ffffff", "#dc143c", "#228b22", "#800000"],
        category: "vintage",
        description: "ירוק, לבן, אדום",
        icon: "🇨🇺"
    },
    {
        name: "וייטנאם שנות ה-70 🌾",
        colors: ["#228b22", "#8fbc8f", "#daa520", "#cd853f", "#a0522d"],
        category: "vintage",
        description: "ירוק, ירוק בהיר, זהוב, חום",
        icon: "🌾"
    },
    
    // עולם התורה והלימוד
    {
        name: "בית מדרש וולוז'ין 📚",
        colors: ["#2c1810", "#5d4037", "#8d6e63", "#d7ccc8", "#f5f5dc"],
        category: "sectors",
        description: "חום עמוק, בז' חם, קרם עתיק",
        icon: "📚"
    },
    {
        name: "ישיבת פוניבז' 🕯️",
        colors: ["#1a237e", "#303f9f", "#3f51b5", "#9fa8da", "#e8eaf6"],
        category: "sectors",
        description: "כחול כהה, תכלת, לבן טהור",
        icon: "🕯️"
    },
    {
        name: "מיר ירושלים ⛪",
        colors: ["#4a148c", "#7b1fa2", "#9c27b0", "#ce93d8", "#f3e5f5"],
        category: "sectors",
        description: "סגול מלכותי, ורוד עדין",
        icon: "⛪"
    },
    {
        name: "חבד לובביץ' 👨‍🦳",
        colors: ["#ffd700", "#1e40af", "#000000", "#ffffff", "#ffd700"],
        category: "sectors",
        description: "זהוב, כחול, שחור - צבעי חב\"ד",
        icon: "👨‍🦳"
    },
    {
        name: "ברסלב נחמן 🌊",
        colors: ["#0d47a1", "#1976d2", "#2196f3", "#81d4fa", "#e1f5fe"],
        category: "sectors",
        description: "כחול עמוק, תכלת זוהר",
        icon: "🌊"
    },
    
    // חגים ומועדים
    {
        name: "שבת קודש 🕯️",
        colors: ["#ffd700", "#fff8dc", "#f5f5dc", "#daa520", "#b8860b"],
        category: "holidays",
        description: "זהב, קרם חם, בז' נעים",
        icon: "🕯️"
    },
    {
        name: "ראש השנה 🍯",
        colors: ["#ff8c00", "#ffd700", "#daa520", "#f4a460", "#ffe4b5"],
        category: "holidays",
        description: "זהוב דבש, כתום חם",
        icon: "🍯"
    },
    {
        name: "יום כיפור 🤲",
        colors: ["#ffffff", "#f8f8ff", "#e6e6fa", "#d8bfd8", "#dda0dd"],
        category: "holidays",
        description: "לבן טהור, סגול עדין",
        icon: "🤲"
    },
    {
        name: "סוכות ולולב 🌿",
        colors: ["#228b22", "#32cd32", "#90ee90", "#f0e68c", "#daa520"],
        category: "holidays",
        description: "ירוק טבעי, צהוב זהוב",
        icon: "🌿"
    },
    {
        name: "חנוכה ונרות 🕎",
        colors: ["#1e3a8a", "#3b82f6", "#fbbf24", "#f59e0b", "#ffffff"],
        category: "holidays",
        description: "כחול חנוכה, זהוב נרות",
        icon: "🕎"
    },
    {
        name: "פורים ושמחה 🎭",
        colors: ["#dc2626", "#7c3aed", "#059669", "#f59e0b", "#ec4899"],
        category: "holidays",
        description: "אדום, סגול, ירוק, זהוב, ורוד",
        icon: "🎭"
    },
    {
        name: "פסח וחירות 🍷",
        colors: ["#7f1d1d", "#dc2626", "#fbbf24", "#f3f4f6", "#6b7280"],
        category: "holidays",
        description: "אדום יין, זהוב מצה",
        icon: "🍷"
    },
    {
        name: "ספירת העומר 🌾",
        colors: ["#a16207", "#ca8a04", "#eab308", "#fde047", "#fef3c7"],
        category: "holidays",
        description: "חום שעורים, צהוב חיטה",
        icon: "🌾"
    },
    {
        name: "לג בעומר מדורה 🔥",
        colors: ["#dc2626", "#ea580c", "#f97316", "#fbbf24", "#292524"],
        category: "holidays",
        description: "אדום אש, כתום להבה",
        icon: "🔥"
    },
    {
        name: "שבועות וחלב 🥛",
        colors: ["#ffffff", "#f8fafc", "#e2e8f0", "#94a3b8", "#475569"],
        category: "holidays",
        description: "לבן חלב, כחול-אפור עדין",
        icon: "🥛"
    },
    
    // עדות ומסורות
    {
        name: "ספרדים ועדות המזרח 🏺",
        colors: ["#b91c1c", "#dc2626", "#fbbf24", "#059669", "#1e40af"],
        category: "sectors",
        description: "אדום, זהוב, ירוק, כחול",
        icon: "🏺"
    },
    {
        name: "אשכנזים ליטא 🏛️",
        colors: ["#1f2937", "#374151", "#6b7280", "#d1d5db", "#f9fafb"],
        category: "sectors",
        description: "אפור כהה, אפור בהיר, לבן",
        icon: "🏛️"
    },
    {
        name: "יהודי תימן 🐪",
        colors: ["#92400e", "#d97706", "#f59e0b", "#fbbf24", "#fef3c7"],
        category: "sectors",
        description: "חום תימני, זהוב מדבר",
        icon: "🐪"
    },
    {
        name: "יהודי מרוקו 🕌",
        colors: ["#dc2626", "#059669", "#1d4ed8", "#fbbf24", "#ffffff"],
        category: "sectors",
        description: "אדום, ירוק, כחול, זהוב",
        icon: "🕌"
    },
    {
        name: "יהודי עיראק בבל 🏛️",
        colors: ["#1e40af", "#3b82f6", "#fbbf24", "#f59e0b", "#f3f4f6"],
        category: "sectors",
        description: "כחול עמוק, זהוב בבלי",
        icon: "🏛️"
    },
    {
        name: "יהודי הודו קוצ'ין 🏮",
        colors: ["#dc2626", "#ca8a04", "#059669", "#7c3aed", "#f97316"],
        category: "sectors",
        description: "אדום, זהוב, ירוק, סגול, כתום",
        icon: "🏮"
    },
    {
        name: "יהודי אתיופיה 🦁",
        colors: ["#dc2626", "#eab308", "#059669", "#1f2937", "#d97706"],
        category: "sectors",
        description: "אדום, צהוב, ירוק, שחור, כתום",
        icon: "🦁"
    },
    
    // חסידות ומנהגים
    {
        name: "גור פולין 👨‍🦱",
        colors: ["#000000", "#1f2937", "#4b5563", "#9ca3af", "#ffffff"],
        category: "sectors",
        description: "שחור חסידי, אפור כהה",
        icon: "👨‍🦱"
    },
    {
        name: "סאטמר אנטי-ציוני 🏴",
        colors: ["#000000", "#7f1d1d", "#ffffff", "#6b7280", "#374151"],
        category: "sectors",
        description: "שחור, אדום כהה, לבן",
        icon: "🏴"
    },
    {
        name: "בעלזא גליציה 🎩",
        colors: ["#1e40af", "#3730a3", "#1e1b4b", "#cbd5e1", "#f1f5f9"],
        category: "sectors",
        description: "כחול כהה, כחול מלכותי",
        icon: "🎩"
    },
    {
        name: "וויז'ניץ רומניה 👴",
        colors: ["#7c2d12", "#dc2626", "#fbbf24", "#f3f4f6", "#6b7280"],
        category: "sectors",
        description: "חום כהה, אדום, זהוב",
        icon: "👴"
    },
    {
        name: "בוב סילזיה 🕴️",
        colors: ["#000000", "#374151", "#64748b", "#cbd5e1", "#ffffff"],
        category: "sectors",
        description: "שחור, אפור מתון",
        icon: "🕴️"
    },
    {
        name: "קרלין סטולין 🔵",
        colors: ["#1e3a8a", "#2563eb", "#60a5fa", "#dbeafe", "#f8fafc"],
        category: "sectors",
        description: "כחול עמוק, תכלת בהיר",
        icon: "🔵"
    },
    
    // ליטאי ומתנגדים
    {
        name: "ליטאי קלאסי 📖",
        colors: ["#1f2937", "#374151", "#6b7280", "#9ca3af", "#f3f4f6"],
        category: "sectors",
        description: "אפור כהה, אפור מתון",
        icon: "📖"
    },
    {
        name: "סלבודקה מוסר 🤔",
        colors: ["#4c1d95", "#6d28d9", "#8b5cf6", "#c4b5fd", "#f3f4f6"],
        category: "sectors",
        description: "סגול עמוק, סגול בהיר",
        icon: "🤔"
    },
    {
        name: "נובהרדוק יסוד 💎",
        colors: ["#0f172a", "#1e293b", "#475569", "#cbd5e1", "#ffffff"],
        category: "sectors",
        description: "כחול-אפור כהה, אפור בהיר",
        icon: "💎"
    },
    
    // דתי לאומי וחרד\"ל
    {
        name: "דתי לאומי כיפה סרוגה 🇮🇱",
        colors: ["#1e40af", "#ffffff", "#2563eb", "#93c5fd", "#dbeafe"],
        category: "sectors",
        description: "כחול לבן ישראלי",
        icon: "🇮🇱"
    },
    {
        name: "חרד\"ל ישיבות הסדר ⚔️",
        colors: ["#059669", "#10b981", "#6ee7b7", "#1f2937", "#ffffff"],
        category: "sectors",
        description: "ירוק צבאי, שחור, לבן",
        icon: "⚔️"
    },
    {
        name: "בני עקיבא נוער 🏕️",
        colors: ["#2563eb", "#ffffff", "#fbbf24", "#059669", "#dc2626"],
        category: "sectors",
        description: "כחול, לבן, צהוב, ירוק, אדום",
        icon: "🏕️"
    },
    
    // נשים ומשפחה
    {
        name: "נשים חרדיות צנועות 👗",
        colors: ["#1f2937", "#6b21a8", "#1e40af", "#f3f4f6", "#e5e7eb"],
        category: "sectors",
        description: "כהה צנוע, סגול, כחול",
        icon: "👗"
    },
    {
        name: "שבת מלכה נרות 🕯️👸",
        colors: ["#fbbf24", "#f59e0b", "#ffffff", "#f3f4f6", "#d1d5db"],
        category: "sectors",
        description: "זהוב נרות, לבן טהור",
        icon: "🕯️👸"
    },
    {
        name: "כלה חרדית שמחה 👰",
        colors: ["#ffffff", "#f8fafc", "#e2e8f0", "#fbbf24", "#ec4899"],
        category: "sectors",
        description: "לבן טהור, זהוב, ורוד עדין",
        icon: "👰"
    },
    
    // ילדים וחינוך
    {
        name: "חדר תלמוד תורה 👦",
        colors: ["#2563eb", "#ffffff", "#1e40af", "#93c5fd", "#fbbf24"],
        category: "sectors",
        description: "כחול, לבן, זהוב לימוד",
        icon: "👦"
    },
    {
        name: "בית יעקב בנות 👧",
        colors: ["#ec4899", "#f472b6", "#fbcfe8", "#ffffff", "#6b21a8"],
        category: "sectors",
        description: "ורוד, לבן, סגול עדין",
        icon: "👧"
    },
    {
        name: "פלג ירושלמי קיצוני ⚫",
        colors: ["#000000", "#1f2937", "#7f1d1d", "#ffffff", "#6b7280"],
        category: "extreme",
        description: "שחור, אדום כהה, לבן",
        icon: "⚫"
    },
    
    // ארץ ישראל ומקומות קדושים
    {
        name: "ירושלים העתיקה 🏛️",
        colors: ["#d4af37", "#cd7f32", "#8b4513", "#f5deb3", "#ffffff"],
        category: "sectors",
        description: "זהוב ירושלים, חום אבן",
        icon: "🏛️"
    },
    {
        name: "כותל המערבי 🧱",
        colors: ["#8b7355", "#a0522d", "#daa520", "#f5f5dc", "#696969"],
        category: "sectors",
        description: "חום אבן, זהוב, בז' עתיק",
        icon: "🧱"
    },
    {
        name: "מירון רשב\"י 🔥",
        colors: ["#ff4500", "#ff6347", "#ffd700", "#2e8b57", "#1e1e1e"],
        category: "sectors",
        description: "כתום אש, זהוב, ירוק הר",
        icon: "🔥"
    },
    {
        name: "צפת קבלה 🔮",
        colors: ["#4b0082", "#8a2be2", "#9370db", "#e6e6fa", "#ffffff"],
        category: "sectors",
        description: "סגול מיסטי, לבן רוחני",
        icon: "🔮"
    },
    {
        name: "חברון אבות 🕌",
        colors: ["#8b4513", "#a0522d", "#daa520", "#f5deb3", "#2f4f4f"],
        category: "sectors",
        description: "חום אדמה, זהוב עתיק",
        icon: "🕌"
    },
    
    // זמנים ועונות
    {
        name: "זמן סליחות אלול 🌙",
        colors: ["#191970", "#483d8b", "#6a5acd", "#e6e6fa", "#f8f8ff"],
        category: "sectors",
        description: "כחול לילה, סגול רפאים",
        icon: "🌙"
    },
    {
        name: "תשרי חגים 🍂",
        colors: ["#ff8c00", "#ffa500", "#ffd700", "#8b4513", "#2e8b57"],
        category: "sectors",
        description: "כתום סתיו, זהוב, חום",
        icon: "🍂"
    },
    {
        name: "חורף בית מדרש ❄️",
        colors: ["#2f4f4f", "#708090", "#b0c4de", "#f0f8ff", "#ffffff"],
        category: "sectors",
        description: "אפור חורף, לבן שלג",
        icon: "❄️"
    },
    {
        name: "אביב ניסן 🌸",
        colors: ["#ffb6c1", "#ffc0cb", "#98fb98", "#90ee90", "#f0fff0"],
        category: "sectors",
        description: "ורוד אביב, ירוק רענן",
        icon: "🌸"
    },
    {
        name: "קיץ ותמוז 🌞",
        colors: ["#ffd700", "#ffff00", "#ffa500", "#ff7f50", "#87ceeb"],
        category: "sectors",
        description: "צהוב שמש, כתום חם",
        icon: "🌞"
    }
];

// Get custom palettes from localStorage
let customPalettes = JSON.parse(localStorage.getItem('customPalettes')) || [];
console.log('Palettes.js loaded with', palettes.length, 'palettes and', customPalettes.length, 'custom palettes');

// Generate palette grid
function generatePaletteGrid() {
    const grid = document.getElementById('paletteGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    const allPalettes = [...palettes, ...customPalettes];
    
    allPalettes.forEach((palette, index) => {
        const card = document.createElement('div');
        card.className = 'palette-card';
        card.setAttribute('data-palette-index', index);
        
        card.innerHTML = `
            <div class="palette-preview">
                ${palette.colors.map((color, colorIndex) => `
                    <div class="color-swatch" 
                         style="background-color: ${color}" 
                         data-color="${color}"
                         title="${color}"></div>
                `).join('')}
            </div>
            <div class="palette-info">
                <h3>${palette.icon || '🎨'} ${palette.name}</h3>
                <p>${palette.description}</p>
                <span class="palette-category">${getCategoryName(palette.category)}</span>
            </div>
        `;
        
        // Enhanced click handler with animations
        card.addEventListener('click', () => {
            // Remove previous selections
            document.querySelectorAll('.palette-card').forEach(c => {
                c.classList.remove('selected', 'pulse');
            });
            
            // Add selection and pulse effect
            card.classList.add('selected', 'pulse');
            
            // Remove pulse after animation
            setTimeout(() => card.classList.remove('pulse'), 600);
            
            selectPalette(palette);
        });
        
        // Add entrance animation with delay
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
        
        grid.appendChild(card);
    });
}

// Get category name in Hebrew
function getCategoryName(category) {
    const categoryNames = {
        'flags': 'דגלים',
        'moods': 'רגשות',
        'sectors': 'מגזרים',
        'nature': 'טבע',
        'food': 'אוכל',
        'tech': 'טכנולוגיה',
        'pastel': 'פסטל',
        'neon': 'ניאון',
        'retro': 'רטרו',
        'vintage': 'וינטאג\'',
        'holidays': 'חגים יהודיים',
        'gaming': 'גיימינג',
        'sports': 'ספורט',
        'space': 'חלל',
        'fashion': 'אופנה',
        'music': 'מוזיקה',
        'finance': 'פיננסים',
        'automotive': 'רכב',
        'marine': 'ימי',
        'sweet': 'מתוק',
        'royal': 'מלכותי',
        'custom': 'מותאם אישית'
    };
    return categoryNames[category] || category;
}

// Select a palette
function selectPalette(palette) {
    currentPalette = palette;
    
    if (typeof updateTeethColors === 'function') {
        updateTeethColors(palette);
    }
    updatePaletteInfo(palette);
    
    // Dispatch custom event
    document.dispatchEvent(new CustomEvent('paletteChanged', { detail: palette }));
    
    // Show message
    setTimeout(() => {
        if (typeof showRandomDentistMessage === 'function') {
            showRandomDentistMessage();
        } else if (typeof showDentistMessage === 'function') {
            showDentistMessage(`נבחרה פלטה: ${palette.name} 🎨`);
        }
    }, 500);
}

// Update palette info display
function updatePaletteInfo(palette) {
    const infoElement = document.getElementById('currentPaletteInfo');
    if (infoElement) {
        const h3 = infoElement.querySelector('h3');
        const p = infoElement.querySelector('p');
        if (h3) h3.textContent = palette.name;
        if (p) p.textContent = palette.description;
    }
}

// Filter palettes by category
function filterPalettes(category) {
    const grid = document.getElementById('paletteGrid');
    const cards = grid.querySelectorAll('.palette-card');
    const allPalettes = [...palettes, ...customPalettes];
    
    cards.forEach((card, index) => {
        const palette = allPalettes[index];
        if (category === 'all' || palette.category === category) {
            card.style.display = 'block';
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
        }
    });
}

// Note: Initialization is handled by main.js 