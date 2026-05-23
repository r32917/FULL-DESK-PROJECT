import { useState, useRef, useEffect } from 'react'
import './Chatbot.css'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const SYSTEM_PROMPT = `אתה עוזר דיגיטלי חכם וידידותי לאתר ניהול תינוקות, אחיות ותורנויות.

**מערכת המידע:**
- **תינוקות (Babies)**: רשומות של תינוקות שבהשגחה
- **אחיות (Nurses)**: רשומות של אחיות המטפלות בתינוקות
- **תורנויות (Turns)**: לוח תורנויות המקשר בין אחיות לתינוקות

**הנחיות השימוש בכלים:**
- כשמשתמש שואל "הצג כל התינוקות" - השתמש ב-tool get_all_babies
- כשמשתמש שואל "מי הוא התינוק מספר 5?" או "פרטי תינוק" - השתמש ב-tool get_baby_by_id
- כשמשתמש שואל "הצג כל האחיות" - השתמש ב-tool get_all_nurses
- כשמשתמש שואל "מי היא אחות מספר 3?" או "פרטי אחות" - השתמש ב-tool get_nurse_by_id
- כשמשתמש שואל "הצג את התורנויות" - השתמש ב-tool get_all_turns
- כשמשתמש שואל על תור מסוים - השתמש ב-tool get_turn_by_id

**התנהגות:**
- עונה בעברית בלבד
- אם משתמש מבקש מידע - חפש בכלים המתאימים בהחלט
- אם המידע לא נמצא - הסבר בנימוס שאין מידע
- תמיד עוזר בנימוס וחיוך
- קצר, ברור ותכליתי
- אם יש שגיאה בקריאה ל-API - הודע למשתמש בצורה ברורה`

// API Configuration - עכשיו כל הלוגיקה של OpenAI היא בשרת
const CHAT_API_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? '/api' : 'https://localhost:7232/api')

function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'שלום! 👋 אני כאן כדי לעזור לך. איך אני יכול לשמש אותך?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = async (
    userMessage: string,
    conversationHistory: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>
  ): Promise<string> => {
    try {
      // שלח את הבקשה לשרת - השרת יטפל בקריאה ל-OpenAI ובביצוע ה-tools
      const token = localStorage.getItem('token')
      
      const response = await fetch(`${CHAT_API_URL}/Chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: conversationHistory,
          systemPrompt: SYSTEM_PROMPT,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        console.error('Chat API Error:', error)
        return '❌ שגיאה בקבלת תגובה. נסה שוב בעוד רגע.'
      }

      const data = await response.json()
      const botResponse = data.response || 'לא הצלחתי לקבל תגובה'

      return botResponse
    } catch (error) {
      console.error('Error:', error)
      return '❌ שגיאה בחיבור לשרת. בדוק את החיבור לאינטרנט.'
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // בנה את ההיסטוריה של השיחה
      const conversationHistory = messages.map((msg) => ({
        role: (msg.sender === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
        content: msg.text,
      }))

      const botResponseText = await generateBotResponse(input, conversationHistory)
      const botResponse: Message = {
        id: messages.length + 2,
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: messages.length + 2,
        text: '❌ שגיאה בקבלת תגובה',
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* כפתור צף קטן כשה-chatbot סגור */}
      {!isOpen && (
        <button
          className="chatbot-toggle-button"
          onClick={() => setIsOpen(true)}
          title="פתח צ'אטבוט"
        >
          💬
        </button>
      )}

      {/* החלון הראשי של ה-chatbot */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h2>💬 צ'אטבוט</h2>
            <button
              className="chatbot-close-button"
              onClick={() => {
                setIsOpen(false)
                // נקה הודעות כשסוגרים
                setMessages([
                  {
                    id: 1,
                    text: 'שלום! 👋 אני כאן כדי לעזור לך. איך אני יכול לשמש אותך?',
                    sender: 'bot',
                    timestamp: new Date(),
                  },
                ])
              }}
              title="סגור צ'אטבוט"
            >
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message message-${msg.sender}`}>
                <div className="message-content">
                  <p>{msg.text}</p>
                  <span className="message-time">
                    {msg.timestamp.toLocaleTimeString('he-IL', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message message-bot">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="כתוב הודעה..."
              disabled={isLoading}
              className="chatbot-input"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="chatbot-send-btn"
            >
              שלח
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbot
