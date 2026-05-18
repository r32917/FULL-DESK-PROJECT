import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { turnService } from '../services/turnService'
import { useTurns } from '../hooks/useTurns'
import type { Turn } from '../types'
import './TurnDelete.css'

const displayValue = (value: string) => value?.trim() || '-'

const TurnDelete: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { deleteTurn, loading } = useTurns()
  const [turn, setTurn] = useState<Turn | null>(null)

  useEffect(() => {
    const fetchTurn = async () => {
      try {
        if (id) setTurn(await turnService.getTurnById(parseInt(id)))
      } catch (err) {
        console.error('Failed to fetch turn:', err)
      }
    }
    fetchTurn()
  }, [id])

  const handleDelete = async () => {
    try {
      if (id) {
        await deleteTurn(parseInt(id))
        navigate('/turns/getall')
      }
    } catch (err) {
      console.error('Failed to delete turn:', err)
    }
  }

  if (!turn) return <div>Loading...</div>

  return (
    <div className="delete-container">
      <h1>🗑️ Delete Turn</h1>
      <div className="warning-box">
        <p className="warning-title">Are you sure you want to delete this turn?</p>
        <p className="info">Turn ID: <strong>{turn.id}</strong> | Baby ID: {turn.babyId} | Nurse ID: {turn.nurseId}</p>
        <p>Date: <strong>{displayValue(turn.date)}</strong> at <strong>{displayValue(turn.time)}</strong></p>
        <p>Notes: <strong>{displayValue(turn.notes)}</strong></p>
        <p>This action cannot be undone.</p>
      </div>
      <div className="actions">
        <button onClick={handleDelete} disabled={loading} className="btn btn-danger">Confirm Delete</button>
        <button onClick={() => navigate('/turns/getall')} className="btn btn-secondary" disabled={loading}>Cancel</button>
      </div>
    </div>
  )
}

export default TurnDelete
