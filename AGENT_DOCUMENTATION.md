# 🤖 Chatbot Agent - דוקומנטציה

## מה זה Agent?

Agent הוא בוט חכם שיכול:
1. **להבין** בקשות משתמש
2. **לחשוב** איזה פונקציה להשתמש
3. **להפעיל פונקציות** (Tools) אוטומטית
4. **להחזיר תוצאות**

---

## 🛠️ Tools (פונקציות זמינות)

### 1. `get_current_time` ⏰
**תיאור:** מחזיר את השעה הנוכחית
**שימוש:** "מה השעה?"
**דוגמה תגובה:** 🕐 השעה הנוכחית: 14:30:45

---

### 2. `get_current_date` 📅
**תיאור:** מחזיר את התאריך הנוכחי
**שימוש:** "מה התאריך?"
**דוגמה תגובה:** 📅 התאריך הנוכחי: 17.5.2026

---

### 3. `calculate` 🔢
**תיאור:** חישוב פעולות מתמטיות
**שימוש:** "כמה זה 25 כפול 4?" או "חשב 10+15"
**פרמטרים:**
- `expression` (string): ביטוי מתמטי (לדוגמה: "2+2", "10*5", "(50-10)/4")
**דוגמה תגובה:** 🔢 התוצאה: 100

---

### 4. `get_weather` 🌤️
**תיאור:** מזג אוויר בעיר (סימולציה)
**שימוש:** "מה מזג האוויר בתל אביב?"
**פרמטרים:**
- `city` (string): שם העיר
**דוגמה תגובה:** 🌞 בתל אביב: 28°C, צח ויפה

---

### 5. `search_web` 🔍
**תיאור:** חיפוש מידע (סימולציה)
**שימוש:** "חפש לי מידע על React"
**פרמטרים:**
- `query` (string): מה לחפש
**דוגמה תגובה:** ⚛️ React היא ספרייה JavaScript לבניית ממשקי משתמש

---

## 🔄 איך זה עובד?

### זרימת הנתונים:

```
1️⃣ משתמש כותב: "מה השעה?"
   ↓
2️⃣ handleSendMessage() מוסיפה את ההודעה לרשימה
   ↓
3️⃣ generateBotResponse() שולחת את ההודעה ל-OpenAI עם:
   - SYSTEM_PROMPT (הנחיות)
   - רשימת Tools זמינים
   - היסטוריית השיחה
   ↓
4️⃣ ChatGPT מחליטה: "צריך להפעיל get_current_time"
   ↓
5️⃣ ChatGPT מחזירה:
   "בטוח! רגע אחד..."
   <tool_call>
   {"tool": "get_current_time", "params": {}}
   </tool_call>
   ↓
6️⃣ generateBotResponse() מבחינה ב-tool_call
   ↓
7️⃣ executeTool() הופעלת את get_current_time()
   ↓
8️⃣ התוצאה משובצת לתגובה:
   "בטוח! רגע אחד...
   📌 תוצאה: 🕐 השעה הנוכחית: 14:30:45"
   ↓
9️⃣ התגובה מוצגת למשתמש
```

---

## 📝 דוגמאות שימוש

### דוגמה 1: שאלה עם חישוב
```
משתמש: "כמה זה 100+50?"
בוט: "אני אחשב לך...
📌 תוצאה: 🔢 התוצאה: 150"
```

### דוגמה 2: שאלה על השעה
```
משתמש: "אני צריך לדעת מה השעה עכשיו"
בוט: "בטוח! הנה לך...
📌 תוצאה: 🕐 השעה הנוכחית: 14:30:45"
```

### דוגמה 3: חיפוש מידע
```
משתמש: "מה זה TypeScript?"
בוט: "בואו אחפש לך...
📌 תוצאה: 📘 TypeScript היא שפה המורחבת JavaScript עם Type System"
```

---

## 🏗️ ארכיטקטורה

```
Chatbot.tsx (קומפוננטה ראשית)
   ├── generateBotResponse() - קוראת ל-OpenAI עם Tools
   ├── handleSendMessage() - משדרת הודעות
   └── tools.ts (ממשק ה-Tools)
       ├── tools[] - רשימת Tools זמינים
       ├── executeTool() - הופעלת Tool
       └── Tool implementations:
           ├── getCurrentTime()
           ├── getCurrentDate()
           ├── calculate()
           ├── getWeather()
           └── searchWeb()
```

---

## 🔧 איך להוסיף Tool חדש?

### שלב 1: הוסף Tool להרשימה (`tools.ts`)
```typescript
{
  name: 'get_random_joke',
  description: 'קבל בדיחה רנדומלית',
  parameters: {
    type: 'object',
    properties: {},
    required: [],
  },
}
```

### שלב 2: הוסף את ה-case ב-`executeTool()` (`tools.ts`)
```typescript
case 'get_random_joke':
  return getRandomJoke()
```

### שלב 3: כתוב את פונקציית ה-Tool (`tools.ts`)
```typescript
function getRandomJoke(): string {
  const jokes = ['בדיחה 1', 'בדיחה 2', 'בדיחה 3']
  return jokes[Math.floor(Math.random() * jokes.length)]
}
```

### שלב 4: בוא ה-SYSTEM_PROMPT (`Chatbot.tsx`)
```typescript
- כשמשתמש מבקש בדיחה - השתמש ב-tool get_random_joke
```

---

## 🎯 פונקציות עיקריות

### `generateBotResponse(userMessage, conversationHistory)`
**קלט:**
- `userMessage`: הודעת המשתמש הנוכחית
- `conversationHistory`: היסטוריית השיחה

**פלט:**
- תגובה מעובדת עם תוצאות Tools

**מה זה עושה:**
1. בוחנת את ה-API KEY
2. בנה את ה-system prompt עם Tools
3. שולחת בקשה ל-OpenAI
4. מחפשת `<tool_call>` בתגובה
5. הופעלת את ה-Tools וחותכת את התוצאות

---

## ⚠️ הערות חשובות

- 🔒 **API KEY** - שמור אותו סודי! אל תשתף בציבור
- 💰 **עלות** - כל בקשה ל-OpenAI עולה כסף
- 🌐 **אינטרנט** - צריך חיבור פעיל
- 🔄 **Tools סימוליציה** - כרגע Tools רבים הם סימוליציה בלבד (ניתן להוסיף API אמיתי)

---

## 🚀 הפעלה

```bash
npm run dev
```

פתח את הדף ותחל לשוחח עם ה-Agent!

---

**מחבר:** Chatbot Agent 🤖
**גרסה:** 1.0.0
**תאריך:** May 17, 2026
