// Get All Babies Component
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBabies } from '../hooks/useBabies';
import './BabiesGetAll.css';

const BabiesGetAll: React.FC = () => {
  const { babies, loading, error, fetchAllBabies } = useBabies();

  useEffect(() => {
    fetchAllBabies();
  }, []);

  if (loading && babies.length === 0) {
    return <div className="loading">Loading babies...</div>;
  }

  return (
    <div className="babies-container">
      <h1>👶 All Babies</h1>

      {error && <div className="error-message">{error}</div>}

      {babies.length === 0 ? (
        <div className="no-data">
          <p>No babies found.</p>
          <Link to="/babies/create" className="btn btn-primary">
            Add First Baby
          </Link>
        </div>
      ) : (
        <div className="babies-table-wrapper">
          <table className="babies-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Family</th>
                <th>Age</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {babies.map((baby) => (
                <tr key={baby.id}>
                  <td>{baby.id}</td>
                  <td>{baby.name}</td>
                  <td>{baby.family}</td>
                  <td>{baby.age}</td>
                  <td className="actions">
                    <Link
                      to={`/babies/view/${baby.id}`}
                      className="btn btn-info"
                    >
                      View
                    </Link>
                    <Link
                      to={`/babies/edit/${baby.id}`}
                      className="btn btn-warning"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/babies/delete/${baby.id}`}
                      className="btn btn-danger"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Link to="/babies/create" className="btn btn-primary add-btn">
        ➕ Add New Baby
      </Link>
    </div>
  );
};

export default BabiesGetAll;
