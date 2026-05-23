// Create Baby Component
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBabies } from '../hooks/useBabies';
import type { BabyPostModel } from '../types';
import './BabyCreate.css';

const BabyCreate: React.FC = () => {
  const { createBaby, loading, error } = useBabies();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BabyPostModel>({
    id: 0,
    name: '',
    family: '',
    age: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' || name === 'id' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBaby(formData);
      navigate('/babies/getall');
    } catch (err) {
      console.error('Failed to create baby:', err);
    }
  };

  return (
    <div className="baby-form-container">
      <h1>➕ Add New Baby</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="baby-form">
        <div className="form-group">
          <label htmlFor="name">Baby Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter baby's name"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="family">Family:</label>
          <input
            id="family"
            type="text"
            name="family"
            value={formData.family}
            onChange={handleChange}
            placeholder="Enter family name"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            id="age"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter age in months"
            required
            disabled={loading}
            min="0"
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Creating...' : 'Create Baby'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/babies/getall')}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BabyCreate;
