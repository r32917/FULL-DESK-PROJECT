import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useNurses } from '../hooks/useNurses'
import { nurseService } from '../services/nurseService'
import type { NursePutModel } from '../types'
import './NurseEdit.css'

const NurseEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { updateNurse, loading, error } = useNurses()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<NursePutModel>({
    name: '',
    phone: '',
    email: '',
    specialization: '',
  })

  useEffect(() => {
    const fetchNurse = async () => {
      try {
        if (id) {
          const data = await nurseService.getNurseById(parseInt(id))
          setFormData({ name: data.name, phone: data.phone, email: data.email, specialization: data.specialization })
        }
      } catch (err) {
        console.error('Failed to fetch nurse:', err)
      }
    }
    fetchNurse()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (id) {
        await updateNurse(parseInt(id), formData)
        navigate('/nurses/getall')
      }
    } catch (err) {
      console.error('Failed to update nurse:', err)
    }
  }

  return (
    <div className="nurse-form-container">
      <h1>✏️ Edit Nurse</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="nurse-form">
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required disabled={loading} />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required disabled={loading} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required disabled={loading} />
        </div>
        <div className="form-group">
          <label>Specialization:</label>
          <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} required disabled={loading} />
        </div>
        <div className="form-actions">
          <button type="submit" disabled={loading} className="btn btn-primary">Update Nurse</button>
          <button type="button" onClick={() => navigate('/nurses/getall')} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default NurseEdit
