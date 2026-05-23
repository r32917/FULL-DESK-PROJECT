import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { nurseService } from '../services/nurseService'
import type { Nurse } from '../types'
import './NurseGetById.css'

const displayValue = (value: string) => value?.trim() || '-'

const NurseGetById: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [nurse, setNurse] = useState<Nurse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNurse = async () => {
      try {
        if (id) setNurse(await nurseService.getNurseById(parseInt(id)))
      } catch (err) {
        console.error('Failed to fetch nurse:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchNurse()
  }, [id])

  if (loading) return <div className="loading">Loading...</div>
  if (!nurse) return <div>Nurse not found</div>

  return (
    <div className="detail-container">
      <h1>👩‍⚕️ Nurse Details</h1>
      <div className="details">
        <div><span className="label">ID:</span><span>{nurse.id}</span></div>
        <div><span className="label">Name:</span><span>{displayValue(nurse.name)}</span></div>
        <div><span className="label">Phone:</span><span>{displayValue(nurse.phone)}</span></div>
        <div><span className="label">Email:</span><span>{displayValue(nurse.email)}</span></div>
        <div><span className="label">Specialization:</span><span>{displayValue(nurse.specialization)}</span></div>
      </div>
      <div className="actions">
        <button onClick={() => navigate(`/nurses/edit/${nurse.id}`)} className="btn btn-warning">Edit</button>
        <button onClick={() => navigate('/nurses/getall')} className="btn btn-secondary">Back</button>
      </div>
    </div>
  )
}

export default NurseGetById
