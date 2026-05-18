import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTurns } from '../hooks/useTurns'
import type { TurnPostModel } from '../types'
import './TurnCreate.css'

const TurnCreate: React.FC = () => {
  const { createTurn, loading, error } = useTurns()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<TurnPostModel>({
    id: 0,
    babyId: 0,
    nurseId: 0,
    date: '',
    time: '',
    notes: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: ['id', 'babyId', 'nurseId'].includes(name) ? parseInt(value) : value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createTurn(formData)
      navigate('/turns/getall')
    } catch (err) {
      console.error('Failed to create turn:', err)
    }
  }

  return (
    <div className="turn-form-container">
      <h1>➕ Add New Turn</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="turn-form">
        <div className="form-group">
          <label>Baby ID:</label>
          <input type="number" name="babyId" value={formData.babyId} onChange={handleChange} required disabled={loading} min="1" />
        </div>
        <div className="form-group">
          <label>Nurse ID:</label>
          <input type="number" name="nurseId" value={formData.nurseId} onChange={handleChange} required disabled={loading} min="1" />
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
          <textarea name="notes" value={formData.notes} onChange={handleChange} disabled={loading} placeholder="Add any notes..." />
        </div>
        <div className="form-actions">
          <button type="submit" disabled={loading} className="btn btn-primary">Create Turn</button>
          <button type="button" onClick={() => navigate('/turns/getall')} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default TurnCreate
