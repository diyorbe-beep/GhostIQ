import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Xatoliklarni tozalash
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Foydalanuvchi nomi kiritilishi shart';
    }
    
    if (!formData.password) {
      newErrors.password = 'Parol kiritilishi shart';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Parol kamida 6 belgidan iborat bo\'lishi kerak';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    
    try {
      // Bu yerda API so'rovini amalga oshirish kerak
      // Mock authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Muvaffaqiyatli kirishdan so'ng bosh sahifaga yo'naltirish
      navigate('/');
    } catch (error) {
      setErrors({
        ...errors,
        auth: 'Foydalanuvchi nomi yoki parol noto\'g\'ri'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wrapper">
            <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Tizimga kirish</h1>
          <p>Davom etish uchun hisobingizga kiring</p>
        </div>
        
        {errors.auth && (
          <div className="auth-error">
            {errors.auth}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Foydalanuvchi nomi</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'error' : ''}
              placeholder="Foydalanuvchi nomingizni kiriting"
            />
            {errors.username && (
              <span className="error-message">{errors.username}</span>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Parol</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="Parolingizni kiriting"
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>
          
          <div className="form-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Eslab qolish</label>
            </div>
            <a href="/forgot-password" className="forgot-password">
              Parolni unutdingizmi?
            </a>
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Kirilmoqda...' : 'Kirish'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Hisobingiz yo'qmi? <Link to="/Signup">Ro'yxatdan o'tish</Link></p>
        </div>
      </div>
      
      <div className="login-background">
        <div className="background-overlay"></div>
      </div>
    </div>
    </div>
  );
};

export default Login;