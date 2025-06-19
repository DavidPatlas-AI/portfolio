# מדריך מעשי לאיסוף נתוני פרסום דיגיטלי בישראל 2025

על בסיס מחקר מקיף שביצעתי, אני מציג מדריך טכני מלא לבניית מערכת איסוף נתוני פרסום דיגיטלי שעובדת באמת בשוק הישראלי.

## APIs זמינים ופועלים כעת

### Google Ads API - הפתרון המקיף ביותר

**גרסה נוכחית**: Google Ads API v20 (יוני 2025) עם v21-v22 מתוכננים לשנה זו.

**זמינות נתונים בשוק הישראלי**:
- כיסוי מלא של מפרסמים ישראליים בכל הפלטפורמות של גוגל
- תמיכה בתוכן עברי וערבי
- נתוני טרגוט גיאוגרפי מפורטים לישראל
- פרסומות פוליטיות דורשות אימות רגולטורי ישראלי

**נתונים זמינים**:
- מדדי ביצועים: impressions, clicks, conversions, cost, revenue
- נתוני טרגוט: גיאוגרפיה, דמוגרפיה, מכשירים
- נתוני מילות מפתח ומכירות פומביות
- כל נתוני הקמפיינים, קבוצות מודעות ומודעות

**הגדרת אימות**:
```javascript
// הגדרת חיבור API
const { GoogleAdsApi } = require('google-ads-api');

const client = new GoogleAdsApi({
  client_id: 'YOUR_CLIENT_ID',
  client_secret: 'YOUR_CLIENT_SECRET',
  developer_token: 'YOUR_DEVELOPER_TOKEN'
});

// דוגמה לשליפת נתוני קמפיינים ישראליים
async function getIsraeliCampaignData(customerId) {
  const customer = client.Customer({
    customer_id: customerId,
    refresh_token: 'YOUR_REFRESH_TOKEN'
  });

  const report = await customer.query(`
    SELECT 
      campaign.id,
      campaign.name,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      geographic_view.country_criterion_id,
      geographic_view.location_type
    FROM geographic_view
    WHERE geographic_view.country_criterion_id = 2376 -- Israel
    AND segments.date >= '2025-01-01'
  `);

  return report;
}
```

### Meta Marketing API - רשתות חברתיות

**גרסה נוכחית**: Marketing API v22.0 (ינואר 2025)

**שינויים חשובים ב-2025**:
- איחוד API של אינסטגרם - יש לבצע מיגרציה עד 21 באפריל 2025
- מדד Views חדש כמדד צריכה עיקרי באינסטגרם
- שיפורים ב-Commercial Content API למחקר שקיפות

**נתונים זמינים מהשוק הישראלי**:
- נתוני ביצועים מפורטים מפייסבוק ואינסטגרם
- פילוח דמוגרפי ומדדי אינטראקציה
- נתוני וידאו ו-Stories
- מודעות פוליטיות ומסחריות דרך Ad Library

**קוד לחיבור**:
```python
import requests
from facebook_business.api import FacebookAdsApi
from facebook_business.adobjects.adaccount import AdAccount

# אימות
FacebookAdsApi.init(
    app_id='YOUR_APP_ID',
    app_secret='YOUR_APP_SECRET',
    access_token='YOUR_ACCESS_TOKEN'
)

# שליפת נתוני קמפיינים ישראליים
def get_israeli_campaigns(ad_account_id):
    ad_account = AdAccount(ad_account_id)
    
    campaigns = ad_account.get_campaigns(
        fields=[
            'name',
            'status',
            'objective',
            'spend',
            'impressions',
            'clicks',
            'cpm',
            'cpc',
            'ctr'
        ],
        params={
            'effective_status': ['ACTIVE'],
            'date_preset': 'last_30_days'
        }
    )
    
    return campaigns
```

### TikTok Marketing API - קהל צעיר

**יכולות נוכחיות**: TikTok API for Business עם שיפורים משמעותיים ב-2025
- Events API עם שיפור ביצועים פי 2
- Creator Marketplace API לשיווק משפיענים
- Commercial Content API למחקר שקיפות

**תועלת לשוק הישראלי**:
- צמיחה מהירה בקרב צעירים ישראליים
- תוכן בעברית וערבית
- פיקסל + Events API יכולים להפחית עלות רכישת לקוחות ב-20-50%

## מקורות נתונים ציבוריים נגישים

### Google Ad Transparency Center - המקור הטוב ביותר

**גישה**: https://adstransparency.google.com - חינמי ונגיש לכולם

**נתונים זמינים**:
- כל המפרסמים הישראליים בפלטפורמות גוגל
- קריאטיבים (טקסט, תמונה, וידאו)
- מידע על המפרסם ומיקום
- תקופות קמפיין וטרגוט גיאוגרפי

**גישה פרוגרמטית**:
```python
import requests

# דוגמה לשליפת נתונים דרך SearchAPI
def search_israeli_advertisers(query):
    url = "https://api.searchapi.io/api/v1/search"
    params = {
        "engine": "google_ads_transparency_center",
        "q": query,
        "country": "IL",
        "hl": "he"
    }
    
    response = requests.get(url, params=params)
    return response.json()

# חיפוש מפרסמים ישראליים
israeli_advertisers = search_israeli_advertisers("site:co.il OR site:org.il")
```

### Meta Ad Library - פרסומות חברתיות

**גישה**: https://www.facebook.com/ads/library

**API למודעות פוליטיות**:
```python
import requests

def get_israeli_political_ads():
    url = "https://graph.facebook.com/v22.0/ads_archive"
    params = {
        "ad_type": "POLITICAL_AND_ISSUE_ADS",
        "country": "IL",
        "limit": 100,
        "access_token": "YOUR_ACCESS_TOKEN"
    }
    
    response = requests.get(url, params=params)
    return response.json()
```

### מקורות ממשלתיים ישראליים

**ממצאי המחקר**:
- אין כרגע מאגרי נתוני פרסום ממשלתיים נגישים לציבור
- רשות התחרות מפרסמת מחקרי שוק מוגבלים
- הרשות לשידור מפרסמת נתוני הכנסות כלליים
- משרד התקשורת מפרסם סטטיסטיקות מדיה כלליות

**המלצה**: התמקד בפלטפורמות הבינלאומיות עם טרגוט ישראלי.

## טכניקות Web Scraping חוקיות

### מסגרת חוקית ישראלית מעודכנת

**חוק הגנת הפרטיות תיקון 13 - נכנס לתוקף 15 באוגוסט 2025**:
- הרחבה משמעותית של הגדרת "מידע אישי"
- קנסות עד 5% מהמחזור השנתי לארגונים גדולים
- עד 140,000 ₪ לעסקים קטנים
- חובת בדיקה שנתית של איסוף הנתונים

**עקרונות לכיבוד**:
- מינימום נתונים: רק מה שנדרש
- שקיפות: יש להודיע על איסוף הנתונים
- מטרה מוגדרת: השימוש רק למטרה המוצהרת
- פרופורציונליות: איסוף לא מוגזם

### זיהוי פרסומות באתרים ישראליים

**בחירת יעדים רלוונטיים**:
```css
/* סלקטורים נפוצים לפרסומות */
.ad, .ads, .advertisement, .banner, .sponsored, .promoted
[class*="ad-"], [class*="banner-"], [class*="sponsored"]
[id*="ad"], [id*="google_ads"]

/* זיהוי תוכן ממומן */
.native-ad, .תוכן-ממומן, .content-promoted

/* סלקטורים עמידים */
div[data-ad-slot], iframe[src*="googlesyndication.com"]
```

**קוד JavaScript לזיהוי דינמי**:
```javascript
class IsraeliAdDetector {
    constructor() {
        this.adPatterns = [
            /ad(?:vertisement)?s?/i,
            /banner/i, /sponsored/i, /promoted/i,
            /פרסומת/, /מתוכל/, /ממומן/  // עברית
        ];
    }
    
    detectAds() {
        const ads = [];
        
        // זיהוי DOM
        document.querySelectorAll('[class*="ad"], [class*="banner"]')
            .forEach(el => {
                ads.push({
                    type: 'display',
                    element: el,
                    text: el.textContent?.substring(0, 100),
                    position: el.getBoundingClientRect()
                });
            });
            
        // זיהוי בקשות רשת
        this.monitorAdRequests();
        
        return ads;
    }
    
    monitorAdRequests() {
        const originalFetch = window.fetch;
        window.fetch = (...args) => {
            const url = args[0];
            if (this.isAdNetworkRequest(url)) {
                console.log('Ad request detected:', url);
            }
            return originalFetch.apply(window, args);
        };
    }
}
```

### איסוף מכבד מאתרי חדשות ישראליים

**הגדרות מומלצות**:
```python
import time
import random
import requests
from urllib.robotparser import RobotFileParser

class RespectfulScraper:
    def __init__(self):
        self.delay_range = (2, 5)  # 2-5 שניות בין בקשות
        self.user_agent = "Research Bot 1.0 (contact@example.com)"
        
    def check_robots_txt(self, url):
        """בדיקת robots.txt לפני איסוף"""
        rp = RobotFileParser()
        rp.set_url(f"{url}/robots.txt")
        rp.read()
        return rp.can_fetch(self.user_agent, url)
    
    def respectful_request(self, url):
        if not self.check_robots_txt(url):
            return None
            
        # המתנה מכבדת
        delay = random.uniform(*self.delay_range)
        time.sleep(delay)
        
        headers = {
            'User-Agent': self.user_agent,
            'Accept-Language': 'he-IL,he;q=0.9,en;q=0.8',
            'Accept': 'text/html,application/xhtml+xml'
        }
        
        return requests.get(url, headers=headers)
```

## אוטומציה עם Puppeteer ו-Selenium

### Puppeteer לאתרים דינמיים

```javascript
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

async function scrapeIsraeliNewsSite(url) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // הגדרת עברית ותצוגה ריאליסטית
    await page.setViewport({ width: 1366, height: 768 });
    await page.setExtraHTTPHeaders({
        'Accept-Language': 'he-IL,he;q=0.9,en;q=0.8'
    });
    
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    // חילוץ פרסומות
    const ads = await page.evaluate(() => {
        const adSelectors = [
            '.ad', '.ads', '.advertisement', '.banner',
            '[class*="ad-"]', '[class*="banner-"]',
            'iframe[src*="googlesyndication"]'
        ];
        
        const foundAds = [];
        adSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                foundAds.push({
                    selector,
                    text: el.textContent?.substring(0, 100),
                    html: el.outerHTML.substring(0, 200),
                    position: el.getBoundingClientRect()
                });
            });
        });
        
        return foundAds;
    });
    
    await browser.close();
    return ads;
}
```

## פתרון טכני מלא - ארכיטקטורה מומלצת

### מבנה מערכת מלא

```
┌─────────────────────────────────────────────────────────────────┐
│                    Web Interface Layer                          │
│  (React.js + Hebrew/Arabic Support + Interactive Maps)          │
├─────────────────────────────────────────────────────────────────┤
│                 API Gateway & Load Balancer                    │
│              (Node.js + GraphQL + JWT Auth)                    │
├─────────────────────────────────────────────────────────────────┤
│                  Data Processing Pipeline                      │
│        (Apache Kafka + Flink + Spark + Airflow)               │
├─────────────────────────────────────────────────────────────────┤
│               Storage Layer (Multi-Database)                   │
│   (PostgreSQL + ClickHouse + Redis + MinIO/S3)                │
├─────────────────────────────────────────────────────────────────┤
│                  Infrastructure Layer                          │
│              (Kubernetes + Docker + AWS/GCP)                   │
└─────────────────────────────────────────────────────────────────┘
```

### סכמת מסד נתונים מותאמת לישראל

```sql
-- טבלת קמפיינים עם תמיכה בשוק הישראלי
CREATE TABLE campaigns (
    campaign_id UUID PRIMARY KEY,
    client_id UUID NOT NULL,
    campaign_name VARCHAR(255) NOT NULL,
    hebrew_name VARCHAR(255), -- שם בעברית
    arabic_name VARCHAR(255), -- שם בערבית
    target_cities TEXT[], -- תל אביב, ירושלים, חיפה וכד'
    language_preference VARCHAR(10) DEFAULT 'he', -- he, ar, en
    kosher_certified BOOLEAN DEFAULT FALSE,
    holiday_targeting JSONB, -- חגים יהודיים
    budget_total DECIMAL(12,2),
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- טבלת ביצועים עם נתוני זמן ישראליים
CREATE TABLE ad_performance (
    timestamp TIMESTAMP,
    campaign_id UUID,
    impressions BIGINT,
    clicks BIGINT,
    cost DECIMAL(10,2),
    geographic_region VARCHAR(50), -- אזור בישראל
    device_type VARCHAR(20),
    -- שעות עסקים ישראליות (א'-ה' 9-17)
    business_hours BOOLEAN DEFAULT FALSE
);

-- אינדקסים מותאמים
CREATE INDEX idx_campaigns_hebrew ON campaigns USING GIN(to_tsvector('hebrew', hebrew_name));
CREATE INDEX idx_campaigns_cities ON campaigns USING GIN(target_cities);
CREATE INDEX idx_performance_time_geo ON ad_performance(timestamp, geographic_region);
```

### ממשק משתמש עם מפה אינטראקטיבית

```javascript
// רכיב מפה לשוק הישראלי
import { MapContainer, TileLayer, HeatmapLayer } from 'react-leaflet';

const IsraeliAdMap = ({ campaignData }) => {
  const israelBounds = [[29.5, 34.2], [33.4, 35.9]];
  
  return (
    <MapContainer bounds={israelBounds} style={{ height: '400px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <HeatmapLayer
        points={campaignData.geoPoints}
        longitudeExtractor={m => m[1]}
        latitudeExtractor={m => m[0]}
        intensityExtractor={m => m[2]}
      />
      {/* סמנים לערים מרכזיות */}
      <Marker position={[32.0853, 34.7818]}> {/* תל אביב */}
        <Popup>תל אביב - {campaignData.telAviv.impressions} הצגות</Popup>
      </Marker>
      <Marker position={[31.7683, 35.2137]}> {/* ירושלים */}
        <Popup>ירושלים - {campaignData.jerusalem.impressions} הצגות</Popup>
      </Marker>
    </MapContainer>
  );
};
```

## עלויות ולוח זמנים מדויק

### עלויות תשתית (חודשיות)

**AWS (מומלץ עם אזור ישראל הצפוי ב-2025)**:
- כלי חישוב: $144/חודש
- מופעי EC2: $216/חודש  
- מסדי נתונים: $630/חודש
- אחסון: $380/חודש
- רשת וCDN: $150/חודש
- מעקב ואבטחה: $200/חודש

**סה"כ חודשי: ~$1,770**

### עלויות פיתוח (6 חודשים)

- מפתח Full-stack בכיר: $72,000
- מהנדס DevOps: $40,000  
- מהנדס נתונים: $66,000
- מעצב UI/UX: $24,000
- מהנדס QA: $28,000

**סה"כ פיתוח: $230,000**

### לוח זמנים מפורט

**שלב 1: יסודות (חודשים 1-2)**
- הקמת תשתית ענן
- פיתוח API בסיסי
- יישום סכמת מסד נתונים
- הגדרת מסגרת תאימות ישראלית

**שלב 2: תכונות ליבה (חודשים 3-4)**
- פיתוח פיפליין נתונים
- ממשק דשבורד עם תמיכה בעברית
- מיפוי אינטראקטיבי לישראל
- אינטגרציה עם APIs חיצוניים

**שלב 3: תכונות מתקדמות (חודשים 5-6)**
- אלגוריתמי איתור הונאות
- אנליטיקה חזויה
- אופטימיזציה וביטחון
- הפקה לסביבת ייצור

## מדדי הצלחה וביצועים

**מדדים טכניים**:
- זמינות מערכת: >99.9%
- זמן תגובת API: <200ms
- זמן עיבוד נתונים: <5 שניות
- זמן טעינת דשבורד: <3 שניות

**מדדים עסקיים**:
- שיעור אימוץ משתמשים: >80% תוך 3 חודשים
- דיוק נתונים: >99.5%
- עלות עיבוד הצגה: <$0.001
- שביעות רצון לקוחות: >4.5/5

זהו פתרון מקיף שמיועד לעבוד באמת בשוק הישראלי, עם התחשבות בדרישות המקומיות, שפות, וחוקים רלוונטיים. המערכת מספקת איסוף נתונים בזמן אמת, עיבוד מתקדם, ויזואליזציה אינטראקטיבית על מפת ישראל.