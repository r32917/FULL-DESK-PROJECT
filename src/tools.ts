// Tools - פונקציות שהבוט יכול להשתמש בהן
import api from './shared/utils/api'

export interface Tool {
  name: string
  description: string
  parameters: {
    type: string
    properties: Record<string, { type: string; description: string }>
    required: string[]
  }
}

// רשימת כל ה-Tools הזמינים
export const tools: Tool[] = [
  {
    name: 'get_all_babies',
    description: 'קבל רשימה של כל התינוקות במערכת',
    parameters: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
  {
    name: 'get_baby_by_id',
    description: 'קבל פרטי תינוק לפי מספר מזהה',
    parameters: {
      type: 'object',
      properties: {
        baby_id: {
          type: 'string',
          description: 'מספר המזהה של התינוק',
        },
      },
      required: ['baby_id'],
    },
  },
  {
    name: 'get_all_nurses',
    description: 'קבל רשימה של כל האחיות במערכת',
    parameters: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
  {
    name: 'get_nurse_by_id',
    description: 'קבל פרטי אחות לפי מספר מזהה',
    parameters: {
      type: 'object',
      properties: {
        nurse_id: {
          type: 'string',
          description: 'מספר המזהה של האחות',
        },
      },
      required: ['nurse_id'],
    },
  },
  {
    name: 'get_all_turns',
    description: 'קבל רשימה של כל התורנויות במערכת',
    parameters: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
  {
    name: 'get_turn_by_id',
    description: 'קבל פרטי תור לפי מספר מזהה',
    parameters: {
      type: 'object',
      properties: {
        turn_id: {
          type: 'string',
          description: 'מספר המזהה של התור',
        },
      },
      required: ['turn_id'],
    },
  },
]


// הפעלת Tool
export async function executeTool(
  toolName: string,
  toolInput: Record<string, string>
): Promise<string> {
  try {
    switch (toolName) {
      case 'get_all_babies':
        return await getAllBabies()

      case 'get_baby_by_id':
        return await getBabyById(toolInput.baby_id)

      case 'get_all_nurses':
        return await getAllNurses()

      case 'get_nurse_by_id':
        return await getNurseById(toolInput.nurse_id)

      case 'get_all_turns':
        return await getAllTurns()

      case 'get_turn_by_id':
        return await getTurnById(toolInput.turn_id)

      default:
        return `❌ Tool לא קיים: ${toolName}`
    }
  } catch (error) {
    return `❌ שגיאה בהפעלת Tool: ${error}`
  }
}

// ==================== Tools Implementation ====================

async function getAllBabies(): Promise<string> {
  try {
    const response = await api.get('/Babies')
    const babies = response.data
    if (!babies || babies.length === 0) {
      return '📋 אין תינוקות במערכת כרגע'
    }
    const babyList = babies
      .map((baby: any) => `• ${baby.name} (מזהה: ${baby.id})`)
      .join('\n')
    return `👶 רשימת כל התינוקות:\n${babyList}`
  } catch (error) {
    return `❌ שגיאה בשליפת תינוקות: ${error}`
  }
}

async function getBabyById(babyId: string): Promise<string> {
  try {
    const response = await api.get(`/Babies/${babyId}`)
    const baby = response.data
    return `👶 פרטי התינוק:\nשם: ${baby.name}\nמזהה: ${baby.id}\nגיל: ${baby.age || 'לא צוין'}\nהערות: ${baby.notes || 'אין'}`
  } catch (error) {
    return `❌ לא הצלחתי למצוא תינוק עם מזהה ${babyId}`
  }
}

async function getAllNurses(): Promise<string> {
  try {
    const response = await api.get('/Nures')
    const nurses = response.data
    if (!nurses || nurses.length === 0) {
      return '📋 אין אחיות במערכת כרגע'
    }
    const nurseList = nurses
      .map((nurse: any) => `• ${nurse.name} (מזהה: ${nurse.id})`)
      .join('\n')
    return `👩‍⚕️ רשימת כל האחיות:\n${nurseList}`
  } catch (error) {
    return `❌ שגיאה בשליפת אחיות: ${error}`
  }
}

async function getNurseById(nurseId: string): Promise<string> {
  try {
    const response = await api.get(`/Nures/${nurseId}`)
    const nurse = response.data
    return `👩‍⚕️ פרטי האחות:\nשם: ${nurse.name}\nמזהה: ${nurse.id}\nטלפון: ${nurse.phone || 'לא צוין'}\nמימון: ${nurse.experience || 'לא צוין'}`
  } catch (error) {
    return `❌ לא הצלחתי למצוא אחות עם מזהה ${nurseId}`
  }
}

async function getAllTurns(): Promise<string> {
  try {
    const response = await api.get('/Turns')
    const turns = response.data
    if (!turns || turns.length === 0) {
      return '📋 אין תורנויות במערכת כרגע'
    }
    const turnList = turns
      .map((turn: any) => `• תור מזהה: ${turn.id} - תאריך: ${turn.date || 'לא צוין'}`)
      .join('\n')
    return `📅 רשימת כל התורנויות:\n${turnList}`
  } catch (error) {
    return `❌ שגיאה בשליפת תורנויות: ${error}`
  }
}

async function getTurnById(turnId: string): Promise<string> {
  try {
    const response = await api.get(`/Turns/${turnId}`)
    const turn = response.data
    return `📅 פרטי התור:\nמזהה: ${turn.id}\nתאריך: ${turn.date || 'לא צוין'}\nשעה: ${turn.time || 'לא צוין'}\nתינוק: ${turn.babyId || 'לא צוין'}\nאחות: ${turn.nurseId || 'לא צוין'}`
  } catch (error) {
    return `❌ לא הצלחתי למצוא תור עם מזהה ${turnId}`
  }
}
