import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ emailOrUsername: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const registeredUser = JSON.parse(localStorage.getItem('user'));

    if (registeredUser) {
      const { username, email, password } = registeredUser;
      if (
        (formData.emailOrUsername === username || formData.emailOrUsername === email) &&
        formData.password === password
      ) {
        alert('Giriş uğurludur!');
        localStorage.setItem('user', JSON.stringify({ username, email }));  // Username və emaili saxlayırıq
        navigate('/dashboard');
      } else {
        alert('Email/Username və ya şifrə yalnışdır!');
      }
    } else {
      alert('İstifadəçi tapılmadı!');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="emailOrUsername"
            placeholder="Username or Email"
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
          <button type="submit">Login</button>
        </form>
        <button className={styles.registerButton} onClick={() => navigate('/register')}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Login;