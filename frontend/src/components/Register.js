import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.scss';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email.includes('@')) {
      alert('Email düzgün deyil!');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Şifrələr uyğun gəlmir!');
      return;
    }
    localStorage.setItem('user', JSON.stringify({
      username: formData.username,
      email: formData.email,
      password: formData.password
    }));

    alert('Qeydiyyat uğurludur!');
    navigate('/login');
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerBox}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;