import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { turnService } from '../services/turnService'
import type { Turn } from '../types'
import './TurnGetById.css'

const displayValue = (value: string) => value?.trim() || '-'

const TurnGetById: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [turn, setTurn] = useState<Turn | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTurn = async () => {
      try {
        if (id) setTurn(await turnService.getTurnById(parseInt(id)))
      } catch (err) {
        console.error('Failed to fetch turn:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchTurn()
  }, [id])

  if (loading) return <div className="loading">Loading...</div>
  if (!turn) return <div>Turn not found</div>

  return (
    <div className="detail-container">
      <h1>📅 Turn Details</h1>
      <div className="details">
        <div><span className="label">ID:</span><span>{turn.id}</span></div>
        <div><span className="label">Baby ID:</span><span>{turn.babyId}</span></div>
        <div><span className="label">Nurse ID:</span><span>{turn.nurseId}</span></div>
        <div><span className="label">Date:</span><span>{displayValue(turn.date)}</span></div>
        <div><span className="label">Time:</span><span>{displayValue(turn.time)}</span></div>
        <div><span className="label">Notes:</span><span>{displayValue(turn.notes)}</span></div>
      </div>
      <div className="actions">
        <button onClick={() => navigate(`/turns/edit/${turn.id}`)} className="btn btn-warning">Edit</button>
        <button onClick={() => navigate('/turns/getall')} className="btn btn-secondary">Back</button>
      </div>
    </div>
  )
}

export default TurnGetById
