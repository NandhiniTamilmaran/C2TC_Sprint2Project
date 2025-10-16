import React, { useState, useEffect } from 'react';
import './App.css';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      console.log("Fetching users...");
      const response = await fetch('http://localhost:8080/api/users');
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Fetched Users:", data);
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className="App">
      <h1>User Management System</h1>
      <UserForm
        fetchUsers={fetchUsers}
        editingUser={editingUser}
        setEditingUser={setEditingUser}
      />
      <UserList
        users={users}
        fetchUsers={fetchUsers}
        setEditingUser={setEditingUser}
      />
    </div>
  );
};

export default App;

