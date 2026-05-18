import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { nurseService } from '../services/nurseService'
import { useNurses } from '../hooks/useNurses'
import type { Nurse } from '../types'
import './NurseDelete.css'

const displayValue = (value: string) => value?.trim() || '-'

const NurseDelete: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { deleteNurse, loading } = useNurses()
  const [nurse, setNurse] = useState<Nurse | null>(null)

  useEffect(() => {
    const fetchNurse = async () => {
      try {
        if (id) setNurse(await nurseService.getNurseById(parseInt(id)))
      } catch (err) {
        console.error('Failed to fetch nurse:', err)
      }
    }
    fetchNurse()
  }, [id])

  const handleDelete = async () => {
    try {
      if (id) {
        await deleteNurse(parseInt(id))
        navigate('/nurses/getall')
      }
    } catch (err) {
      console.error('Failed to delete nurse:', err)
    }
  }

  if (!nurse) return <div>Loading...</div>

  return (
    <div className="delete-container">
      <h1>🚮 Delete Nurse</h1>
      <div className="warning-box">
        <p className="warning-title">Are you sure you want to delete this nurse?</p>
        <p className="info"><strong>{displayValue(nurse.name)}</strong> (ID: {nurse.id})</p>
        <p>This action cannot be undone.</p>
      </div>
      <div className="actions">
        <button onClick={handleDelete} disabled={loading} className="btn btn-danger">Confirm Delete</button>
        <button onClick={() => navigate('/nurses/getall')} className="btn btn-secondary" disabled={loading}>Cancel</button>
      </div>
    </div>
  )
}

export default NurseDelete
