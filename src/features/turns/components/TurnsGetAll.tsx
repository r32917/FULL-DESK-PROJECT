import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTurns } from '../hooks/useTurns'
import './TurnsGetAll.css'

const displayValue = (value: string) => value?.trim() || '-'

const TurnsGetAll: React.FC = () => {
  const { turns, loading, error, fetchAllTurns } = useTurns()

  useEffect(() => {
    fetchAllTurns()
  }, [fetchAllTurns])

  if (loading && turns.length === 0) return <div className="loading">Loading turns...</div>

  return (
    <div className="turns-container">
      <h1>📅 All Turns</h1>
      {error && <div className="error-message">{error}</div>}
      {turns.length === 0 ? (
        <div className="no-data"><p>No turns found.</p></div>
      ) : (
        <table className="turns-table">
          <thead><tr><th>ID</th><th>Baby ID</th><th>Nurse ID</th><th>Date</th><th>Time</th><th>Notes</th><th></th></tr></thead>
          <tbody>{turns.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td><td>{t.babyId}</td><td>{t.nurseId}</td><td>{displayValue(t.date)}</td><td>{displayValue(t.time)}</td><td>{displayValue(t.notes)}</td>
              <td className="actions">
                <Link to={`/turns/view/${t.id}`} className="btn btn-info">View</Link>
                <Link to={`/turns/edit/${t.id}`} className="btn btn-warning">Edit</Link>
                <Link to={`/turns/delete/${t.id}`} className="btn btn-danger">Delete</Link>
              </td>
            </tr>
          ))}</tbody>
        </table>
      )}
      <Link to="/turns/create" className="btn btn-primary add-btn">➕ Add New Turn</Link>
    </div>
  )
}

export default TurnsGetAll
