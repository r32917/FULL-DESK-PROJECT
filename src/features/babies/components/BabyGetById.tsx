// Get Baby By ID Component
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { babyService } from '../services/babyService';
import type { Baby } from '../types/index';
import './BabyGetById.css';

const BabyGetById: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [baby, setBaby] = useState<Baby | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBaby = async () => {
      try {
        if (id) {
          const data = await babyService.getBabyById(parseInt(id));
          setBaby(data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch baby');
      } finally {
        setLoading(false);
      }
    };
    fetchBaby();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading baby data...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!baby) {
    return (
      <div className="baby-detail-container">
        <div className="no-data">Baby not found.</div>
      </div>
    );
  }

  return (
    <div className="baby-detail-container">
      <h1>👶 Baby Details</h1>

      <div className="baby-details">
        <div className="detail-row">
          <span className="label">ID:</span>
          <span className="value">{baby.id}</span>
        </div>
        <div className="detail-row">
          <span className="label">Name:</span>
          <span className="value">{baby.name}</span>
        </div>
        <div className="detail-row">
          <span className="label">Family:</span>
          <span className="value">{baby.family}</span>
        </div>
        <div className="detail-row">
          <span className="label">Age:</span>
          <span className="value">{baby.age} months</span>
        </div>
      </div>

      <div className="actions">
        <button
          onClick={() => navigate(`/babies/edit/${baby.id}`)}
          className="btn btn-warning"
        >
          Edit
        </button>
        <button
          onClick={() => navigate('/babies/getall')}
          className="btn btn-secondary"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default BabyGetById;
