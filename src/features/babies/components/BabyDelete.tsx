// Delete Baby Component
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { babyService } from '../services/babyService';
import { useBabies } from '../hooks/useBabies';
import type { Baby } from '../types';
import './BabyDelete.css';

const BabyDelete: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { deleteBaby, loading } = useBabies();
  const [baby, setBaby] = useState<Baby | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
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
        setInitialLoading(false);
      }
    };
    fetchBaby();
  }, [id]);

  const handleDelete = async () => {
    try {
      if (id) {
        await deleteBaby(parseInt(id));
        navigate('/babies/getall');
      }
    } catch (err) {
      console.error('Failed to delete baby:', err);
    }
  };

  if (initialLoading) {
    return <div className="loading">Loading baby data...</div>;
  }

  if (error || !baby) {
    return <div className="error-message">Error: {error || 'Baby not found'}</div>;
  }

  return (
    <div className="delete-container">
      <h1>🚮 Delete Baby</h1>

      <div className="warning-box">
        <p className="warning-title">Are you sure you want to delete this baby?</p>
        <p className="baby-info">
          <strong>{baby.name}</strong> | Family: {baby.family} | Age: {baby.age} months (ID: {baby.id})
        </p>
        <p className="warning-message">
          This action cannot be undone. All associated data will be permanently deleted.
        </p>
      </div>

      <div className="actions">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="btn btn-danger"
        >
          {loading ? 'Deleting...' : 'Confirm Delete'}
        </button>
        <button
          onClick={() => navigate('/babies/getall')}
          className="btn btn-secondary"
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BabyDelete;
