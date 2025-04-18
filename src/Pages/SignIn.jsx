import React, { useState } from 'react';
import '../styles/SignUp.css';
import { BaseUrl } from '../Assets/Data';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '../components/LoadingSpinner';

function SignIn() {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${BaseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Registration failed!');
            }
            await localStorage.setItem('id', data.data.id);
            await localStorage.setItem('showChart', true);
            // console.log('data:', data, data.data.id);
            await navigate('/');
            console.log('Server Response:', data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? <LoadingSpinner /> : <div className="signin-container mt-4 ">
                <h2>Sign In to <span style={{ color: '#5D8736' }}>Tesco</span></h2>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className='flex flex-row items-center w-full border rounded-md bg-white'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className='p-[8px] w-[90%] border-none rounded-md bg-white outline-none bg-transparent'
                            />
                            <button type='button' onClick={togglePasswordVisibility} className='w-[10%] flex flex-col items-center'>
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className='text-black text-[14px]' />
                            </button>
                        </div>
                    </div>
                    <p className="forgot-password">
                        <a href="/forgotpassword">Forgot Password?</a>
                    </p>
                    <button type="submit" className="signup-button">Sign In</button>
                </form>
                <p className="signup-link mt-2 text-gray-500 text-lg">
                    Don't have an account? <a href="/signup" className='text-[#5D8736] no-underline font-bold'>Sign Up</a>
                </p>
            </div>}
        </>
    );
}

export default SignIn;