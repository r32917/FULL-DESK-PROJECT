// Edit Baby Component
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBabies } from '../hooks/useBabies';
import { babyService } from '../services/babyService';
import type { BabyPutModel } from '../types';
import './BabyEdit.css';

const BabyEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { updateBaby, loading, error } = useBabies();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BabyPutModel>({
    name: '',
    family: '',
    age: 0,
  });
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchBaby = async () => {
      try {
        if (id) {
          const data = await babyService.getBabyById(parseInt(id));
          setFormData({
            name: data.name,
            family: data.family,
            age: data.age,
          });
        }
      } catch (err) {
        console.error('Failed to fetch baby:', err);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchBaby();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateBaby(parseInt(id), formData);
        navigate('/babies/getall');
      }
    } catch (err) {
      console.error('Failed to update baby:', err);
    }
  };

  if (initialLoading) {
    return <div className="loading">Loading baby data...</div>;
  }

  return (
    <div className="baby-form-container">
      <h1>✏️ Edit Baby</h1>

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
            {loading ? 'Updating...' : 'Update Baby'}
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

export default BabyEdit;
