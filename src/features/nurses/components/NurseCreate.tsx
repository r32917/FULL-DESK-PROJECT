import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNurses } from '../hooks/useNurses'
import type { NursePostModel } from '../types'
import './NurseCreate.css'

const NurseCreate: React.FC = () => {
  const { createNurse, loading, error } = useNurses()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<NursePostModel>({
    id: 0,
    name: '',
    phone: '',
    email: '',
    specialization: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createNurse(formData)
      navigate('/nurses/getall')
    } catch (err) {
      console.error('Failed to create nurse:', err)
    }
  }

  return (
    <div className="nurse-form-container">
      <h1>➕ Add New Nurse</h1>
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
          <button type="submit" disabled={loading} className="btn btn-primary">Create Nurse</button>
          <button type="button" onClick={() => navigate('/nurses/getall')} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default NurseCreate
