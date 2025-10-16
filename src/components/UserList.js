import React from 'react';
import './UserList.css';

const UserList = ({ users, fetchUsers, setEditingUser }) => {
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/users/${id}`, { method: 'DELETE' });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="user-list-container">
      <h2>User Records</h2>
      {users.length === 0 ? (
        <p className="no-data">No users available.</p>
      ) : (
        <div className="user-grid">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <div className="user-details">
                <h3>{user.name}</h3>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Department:</strong> {user.department}</p>
                <p><strong>CGPA:</strong> {user.cgpa}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
              </div>
              <div className="card-buttons">
                <button className="edit-btn" onClick={() => setEditingUser(user)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
