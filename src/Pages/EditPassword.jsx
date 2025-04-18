import React, { useState } from 'react';
import '../styles/SignUp.css';
import { BaseUrl } from '../Assets/Data';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function EditPassword() {
    const navigate = useNavigate();
    const {email} = useParams();

    const [showPasswords, setShowPasswords] = useState({
        oldPassword: false,
        newPassword: false,
        retypePassword: false,
    });

    const [formData, setFormData] = useState({
        email: email,
        oldPassword: '',
        password: '',
        retypepassword: '',
    });

    const togglePasswordVisibility = (field) => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.retypepassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await fetch(`${BaseUrl}/edit-password/${email}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    oldPassword: formData.oldPassword,
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

    const renderPasswordInput = (name, placeholder, fieldKey) => (
        <div className="form-group">
            <label htmlFor={name}>{placeholder}</label>
            <div className="flex flex-row items-center w-full border rounded-md bg-white">
                <input
                    type={showPasswords[fieldKey] ? 'text' : 'password'}
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
                    onClick={() => togglePasswordVisibility(fieldKey)}
                    className="w-[10%] flex items-center justify-center"
                >
                    <FontAwesomeIcon
                        icon={showPasswords[fieldKey] ? faEye : faEyeSlash}
                        className="text-black text-[14px]"
                    />
                </button>
            </div>
        </div>
    );

    return (
        <div className="signin-container mt-4">
            <h2>
                Edit <span style={{ color: '#5D8736' }}>Tesco Password</span>
            </h2>
            {/* Reset Password */}
            <form className="signup-form" onSubmit={handleSubmit}>
                {renderPasswordInput('oldPassword', 'Old Password', 'oldPassword')}
                {renderPasswordInput('password', 'New Password', 'newPassword')}
                {renderPasswordInput('retypepassword', 'Retype Password', 'retypePassword')}
                <button type="submit" className="signup-button">
                    Reset Password
                </button>
            </form>
        </div>
    );
}

export default EditPassword;