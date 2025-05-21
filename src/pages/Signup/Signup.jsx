import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.scss';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'student'
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);
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

    const validateStep1 = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'Ism kiritilishi shart';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Familiya kiritilishi shart';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email kiritilishi shart';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Noto\'g\'ri email formati';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};

        if (!formData.password) {
            newErrors.password = 'Parol kiritilishi shart';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Parol kamida 8 belgidan iborat bo\'lishi kerak';
        } else if (!/(?=.*[A-Z])(?=.*[0-9])/.test(formData.password)) {
            newErrors.password = 'Parol kamida 1 ta katta harf va 1 ta raqamdan iborat bo\'lishi kerak';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Parollar mos kelmadi';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (validateStep1()) {
            setStep(2);
        }
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep2()) return;

        setIsLoading(true);

        try {
            // Bu yerda API so'rovini amalga oshirish kerak
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Muvaffaqiyatli ro'yxatdan o'tishdan so'ng kirish sahifasiga yo'naltirish
            navigate('/login', { state: { registrationSuccess: true } });
        } catch (error) {
            setErrors({
                ...errors,
                submit: 'Ro\'yxatdan o\'tishda xatolik yuz berdi. Iltimos, keyinroq urinib ko\'ring.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="wrapper">
            <div className="signup-container">
                <div className="signup-card">
                    <div className="signup-header">
                        <h1>Ro'yxatdan o'tish</h1>
                        <p>{step === 1 ? 'Asosiy ma\'lumotlar' : 'Hisob sozlamalari'}</p>

                        <div className="progress-steps">
                            <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
                            <div className={`step-connector ${step >= 2 ? 'active' : ''}`}></div>
                            <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
                        </div>
                    </div>

                    {errors.submit && (
                        <div className="submit-error">
                            {errors.submit}
                        </div>
                    )}

                    <form onSubmit={step === 1 ? handleNext : handleSubmit} className="signup-form">
                        {step === 1 ? (
                            <>
                                <div className="form-group">
                                    <label htmlFor="firstName">Ism</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className={errors.firstName ? 'error' : ''}
                                        placeholder="Ismingizni kiriting"
                                    />
                                    {errors.firstName && (
                                        <span className="error-message">{errors.firstName}</span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lastName">Familiya</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className={errors.lastName ? 'error' : ''}
                                        placeholder="Familiyangizni kiriting"
                                    />
                                    {errors.lastName && (
                                        <span className="error-message">{errors.lastName}</span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={errors.email ? 'error' : ''}
                                        placeholder="Email manzilingizni kiriting"
                                    />
                                    {errors.email && (
                                        <span className="error-message">{errors.email}</span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="role">Hisob turi</label>
                                    <select
                                        id="role"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className="role-select"
                                    >
                                        <option value="student">O'quvchi</option>
                                        <option value="teacher">O'qituvchi</option>
                                        <option value="parent">Ota-ona</option>
                                    </select>
                                </div>

                                <button type="submit" className="signup-button next">
                                    Keyingisi
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="form-group">
                                    <label htmlFor="password">Parol</label>
                                    <div className="password-input">
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className={errors.password ? 'error' : ''}
                                            placeholder="Kamida 8 belgi"
                                        />
                                        {errors.password && (
                                            <span className="error-message">{errors.password}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Parolni tasdiqlang</label>
                                    <div className="password-input">
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className={errors.confirmPassword ? 'error' : ''}
                                            placeholder="Parolingizni qayta kiriting"
                                        />
                                        {errors.confirmPassword && (
                                            <span className="error-message">{errors.confirmPassword}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="password-requirements">
                                    <p>Parol talablari:</p>
                                    <ul>
                                        <li className={formData.password.length >= 8 ? 'valid' : ''}>Kamida 8 belgi</li>
                                        <li className={/(?=.*[A-Z])/.test(formData.password) ? 'valid' : ''}>Kamida 1 ta katta harf</li>
                                        <li className={/(?=.*[0-9])/.test(formData.password) ? 'valid' : ''}>Kamida 1 ta raqam</li>
                                    </ul>
                                </div>

                                <div className="form-actions">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="signup-button back"
                                    >
                                        Orqaga
                                    </button>
                                    <button
                                        type="submit"
                                        className="signup-button submit"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Yuklanmoqda...' : 'Ro\'yxatdan o\'tish'}
                                    </button>
                                </div>
                            </>
                        )}
                    </form>

                    <div className="signup-footer">
                        <p>Allaqachon hisobingiz bormi? <Link to="/login">Tizimga kirish</Link></p>
                    </div>
                </div>

                <div className="signup-background">
                    <div className="background-overlay"></div>
                </div>
            </div>
        </div>
    );
};

export default Signup;