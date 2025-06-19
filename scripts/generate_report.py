from datetime import datetime
import os
from jinja2 import Template

color = 'צהוב'
bg_color = '#fffacd'

try:
    with open("stories/story_of_the_day.txt", encoding="utf-8") as f:
        story = f.read()
except:
    story = "אין סיפור להיום."

try:
    with open("tips/tip_of_the_day.txt", encoding="utf-8") as f:
        tip = f.read()
except:
    tip = "אין טיפ להיום."

with open("templates/daily_report_template.html", encoding="utf-8") as f:
    template = Template(f.read())

data = {
    'date': datetime.now().strftime('%Y-%m-%d'),
    'color': color,
    'bg_color': bg_color,
    'emotion': 'שמחה',
    'animal': 'חתול',
    'strength': '92%',
    'keywords': ['אביב', 'שמש', 'פריחה'],
    'story': story,
    'tip': tip
}

output = template.render(data)

OUTPUT_DIR = "reports"
os.makedirs(OUTPUT_DIR, exist_ok=True)
filename = f"report_{datetime.now().strftime('%Y%m%d')}.html"
with open(os.path.join(OUTPUT_DIR, filename), 'w', encoding="utf-8") as f:
    f.write(output)

print("הדוח נוצר בהצלחה:", filename)