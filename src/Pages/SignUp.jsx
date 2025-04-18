import React, { useEffect, useState } from 'react';
import '../styles/SignUp.css';
import { BaseUrl } from '../Assets/Data';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '../components/LoadingSpinner';

function SignUp() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [loading, setLoading] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    }
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        retypePassword: '',
        referralCode: '',
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
        if (formData.password !== formData.retypePassword) {
            alert('Passwords do not match!');
            setLoading(false);
            return;
        }

        if (!formData.referralCode) {
            alert('Referral code is required!');
            setLoading(false);
            return;
        }

        const registerData = {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            password: formData.password,
            referalCode: formData.referralCode,
        };
        try {
            const response = await fetch(`${BaseUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Registration successful!');
                navigate('/login');
            } else {
                alert(data.message || 'Registration failed!');
                throw new Error(data.message || 'Registration failed!');
            }
            console.log('Server Response:', data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            setFormData((prevState) => ({
                ...prevState,
                referralCode: id,
            }));
        }
    }, [id]);


    return (
        <>
            {loading ? <LoadingSpinner /> : <div className="signup-container">
                <h2>Create a <span className='text-[#5D8736] text-bold'>Tesco</span> Account</h2>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="Enter your first name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Enter your last name"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
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
                            <button type="button" onClick={togglePasswordVisibility} className='w-[10%] flex flex-col items-center'>
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className='text-black text-[14px]' />
                            </button>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="retypePassword">Re-type Password</label>
                        <div className='flex flex-row items-center w-full border rounded-md bg-white'>
                            <input
                                type={showPassword2 ? 'text' : 'password'}
                                id="retypePassword"
                                name="retypePassword"
                                placeholder="Re-type your password"
                                value={formData.retypePassword}
                                onChange={handleChange}
                                required
                                className='p-[8px] w-[90%] border-none rounded-md bg-white outline-none bg-transparent'
                            />
                            <button type="button" onClick={togglePasswordVisibility2} className='w-[10%] flex flex-col items-center'>
                                <FontAwesomeIcon icon={showPassword2 ? faEyeSlash : faEye} className='text-black text-[14px]' />
                            </button>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="referralCode">Referral Code</label>
                        <input
                            type="text"
                            id="referralCode"
                            name="referralCode"
                            placeholder="Enter referral code (optional)"
                            value={formData.referralCode}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="signup-button">Sign Up</button>
                    <p className="signup-link mt-2 text-gray-500 text-lg">
                        Already have account? <a href="/login" className='text-[#5D8736] no-underline font-bold'>Login</a>
                    </p>
                </form>
            </div>}
        </>
    );
}

export default SignUp;