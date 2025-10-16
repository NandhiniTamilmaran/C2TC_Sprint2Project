import React, { useState, useEffect } from 'react';
import './UserForm.css';

const UserForm = ({ fetchUsers, editingUser, setEditingUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setDepartment(editingUser.department);
      setCgpa(editingUser.cgpa);
      setPhone(editingUser.phone);
    } else {
      setName('');
      setEmail('');
      setDepartment('');
      setCgpa('');
      setPhone('');
    }
  }, [editingUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { name, email, department, cgpa, phone };

    try {
      if (editingUser) {
        await fetch(`http://localhost:8080/api/users/${editingUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });
      } else {
        await fetch('http://localhost:8080/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });
      }

      fetchUsers();
      setEditingUser(null);
      setName('');
      setEmail('');
      setDepartment('');
      setCgpa('');
      setPhone('');
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          placeholder="Department"
          required
        />
        <input
          type="number"
          step="0.01"
          value={cgpa}
          onChange={(e) => setCgpa(e.target.value)}
          placeholder="CGPA"
          required
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
          required
        />
        <button type="submit">{editingUser ? 'Update User' : 'Add User'}</button>
      </form>
    </div>
  );
};

export default UserForm;
