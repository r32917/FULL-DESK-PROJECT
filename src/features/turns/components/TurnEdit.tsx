import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTurns } from '../hooks/useTurns'
import { turnService } from '../services/turnService'
import type { TurnPutModel } from '../types'
import './TurnEdit.css'

const TurnEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { updateTurn, loading, error } = useTurns()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<TurnPutModel>({
    babyId: 0,
    nurseId: 0,
    date: '',
    time: '',
    notes: '',
  })

  useEffect(() => {
    const fetchTurn = async () => {
      try {
        if (id) {
          const data = await turnService.getTurnById(parseInt(id))
          setFormData({ babyId: data.babyId, nurseId: data.nurseId, date: data.date, time: data.time, notes: data.notes })
        }
      } catch (err) {
        console.error('Failed to fetch turn:', err)
      }
    }
    fetchTurn()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: ['babyId', 'nurseId'].includes(name) ? parseInt(value) : value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (id) {
        await updateTurn(parseInt(id), formData)
        navigate('/turns/getall')
      }
    } catch (err) {
      console.error('Failed to update turn:', err)
    }
  }

  return (
    <div className="turn-form-container">
      <h1>✏️ Edit Turn</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="turn-form">
        <div className="form-group">
          <label>Baby ID:</label>
          <input type="number" name="babyId" value={formData.babyId} onChange={handleChange} required disabled={loading} />
        </div>
        <div className="form-group">
          <label>Nurse ID:</label>
          <input type="number" name="nurseId" value={formData.nurseId} onChange={handleChange} required disabled={loading} />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required disabled={loading} />
        </div>
        <div className="form-group">
          <label>Time:</label>
          <input type="time" name="time" value={formData.time} onChange={handleChange} required disabled={loading} />
        </div>
        <div className="form-group">
          <label>Notes:</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange} disabled={loading} />
        </div>
        <div className="form-actions">
          <button type="submit" disabled={loading} className="btn btn-primary">Update Turn</button>
          <button type="button" onClick={() => navigate('/turns/getall')} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default TurnEdit
