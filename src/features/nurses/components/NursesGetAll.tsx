import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNurses } from '../hooks/useNurses'
import './NursesGetAll.css'

const displayValue = (value: string) => value?.trim() || '-'

const NursesGetAll: React.FC = () => {
  const { nurses, loading, error, fetchAllNurses } = useNurses()

  useEffect(() => {
    fetchAllNurses()
  }, [fetchAllNurses])

  if (loading && nurses.length === 0) return <div className="loading">Loading nurses...</div>

  return (
    <div className="nurses-container">
      <h1>👩‍⚕️ All Nurses</h1>
      {error && <div className="error-message">{error}</div>}
      {nurses.length === 0 ? (
        <div className="no-data"><p>No nurses found.</p></div>
      ) : (
        <table className="nurses-table">
          <thead><tr><th>ID</th><th>Name</th><th>Phone</th><th>Email</th><th>Specialization</th><th></th></tr></thead>
          <tbody>{nurses.map((n) => (
            <tr key={n.id}>
              <td>{n.id}</td><td>{displayValue(n.name)}</td><td>{displayValue(n.phone)}</td><td>{displayValue(n.email)}</td><td>{displayValue(n.specialization)}</td>
              <td className="actions">
                <Link to={`/nurses/view/${n.id}`} className="btn btn-info">View</Link>
                <Link to={`/nurses/edit/${n.id}`} className="btn btn-warning">Edit</Link>
                <Link to={`/nurses/delete/${n.id}`} className="btn btn-danger">Delete</Link>
              </td>
            </tr>
          ))}</tbody>
        </table>
      )}
      <Link to="/nurses/create" className="btn btn-primary add-btn">➕ Add New Nurse</Link>
    </div>
  )
}

export default NursesGetAll
