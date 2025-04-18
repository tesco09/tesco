import React, { useState } from 'react';
import '../styles/SignUp.css';
import { BaseUrl } from '../Assets/Data';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function ForgotPassword() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [verified, setVerified] = useState(false);
    const [sentOtp, setSentOtp] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        otp: '',
        password: '',
        retypepassword: '',
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const sendOtp = async () => {
        if (!formData.email) {
            alert('Please enter your email');
            return;
        }

        try {
            const response = await fetch(`${BaseUrl}/send-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email }),
            });

            const json = await response.json();
            console.log('otp:', json.otp);
            setSentOtp(json.otp);
            if (!response.ok) throw new Error(json.message);
            alert('OTP sent to your email');
        } catch (error) {
            console.error('Send OTP Error:', error);
            alert('Failed to send OTP');
        }
    };

    const verifyOtp = async () => {
        if (!formData.otp) {
            alert('Please enter OTP');
            return;
        }

        try {
            if (parseInt(formData.otp) === sentOtp) {
                setVerified(true);
                alert('OTP verified successfully!');
            }
        } catch (error) {
            console.error('Verify OTP Error:', error);
            alert('OTP verification failed');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.retypepassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await fetch(`${BaseUrl}/register/${formData.email}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: formData.password,
                }),
            });

            const json = await response.json();
            if (!response.ok) throw new Error(json.message);

            alert('Password updated successfully!');
            localStorage.clear();
            navigate('/');
        } catch (error) {
            console.error('Reset Password Error:', error);
            alert('Failed to reset password');
        }
    };

    const renderPasswordInput = (name, placeholder) => (
        <div className="form-group">
            <label htmlFor={name}>{placeholder}</label>
            <div className="flex flex-row items-center w-full border rounded-md bg-white">
                <input
                    type={showPassword ? 'text' : 'password'}
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    className="p-[8px] w-[90%] border-none rounded-md bg-white outline-none"
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="w-[10%] flex items-center justify-center"
                >
                    <FontAwesomeIcon
                        icon={showPassword ? faEye : faEyeSlash}
                        className="text-black text-[14px]"
                    />
                </button>
            </div>
        </div>
    );

    return (
        <div className="signin-container mt-4">
            <h2>
                Forgot <span style={{ color: '#5D8736' }}>Tesco Account</span>
            </h2>
            {!verified && <>
                {/* Email + Send OTP */}
                <form className="signup-form">
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
                    <button
                        type="button"
                        onClick={sendOtp}
                        className="text-xs text-[#347928] underline text-left w-[100px] mb-2"
                    >
                        Send OTP
                    </button>
                </form>

                {/* OTP Verification */}
                <form className="signup-form">
                    <div className="form-group">
                        <label htmlFor="otp">Enter OTP</label>
                        <input
                            type="text"
                            id="otp"
                            name="otp"
                            placeholder="Enter the OTP"
                            value={formData.otp}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="button" onClick={verifyOtp} className="signup-button">
                        Verify
                    </button>
                </form>
            </>}

            {/* Reset Password */}
            {verified && (
                <form className="signup-form" onSubmit={handleSubmit}>
                    {renderPasswordInput('password', 'New Password')}
                    {renderPasswordInput('retypepassword', 'Retype Password')}
                    <button type="submit" className="signup-button">
                        Reset Password
                    </button>
                </form>
            )}
        </div>
    );
}

export default ForgotPassword;
