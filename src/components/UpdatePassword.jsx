import React, { useState } from 'react';
import { BaseUrl } from '../Assets/Data';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

function UpdatePassword() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        previous: '',
        newPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

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
        setMessage('');
        setError('');

        try {
            const response = await fetch(`${BaseUrl}/admin-password`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                navigate('/admin-login');
            }
            if (!response.ok) {
                throw new Error(data.message || 'Password update failed!');
            }

            setMessage(data.message || 'Password updated successfully!');
        } catch (err) {
            setError(err.message || 'An error occurred while updating the password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="update-password-container mt-4 w-full">
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="flex flex-col items-center w-full ">
                    <h2>Update Password</h2>
                    <form className="w-[90%]" onSubmit={handleSubmit}>
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
                            <label htmlFor="previous">Previous Password</label>
                            <input
                                type="password"
                                id="previous"
                                name="previous"
                                placeholder="Enter your previous password"
                                value={formData.previous}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPassword">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                placeholder="Enter your new password"
                                value={formData.newPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full border text-white bg-green-500 rounded-md h-[40px]">
                            Update Password
                        </button>
                    </form>
                    {message && <p className="success-message">{message}</p>}
                    {error && <p className="error-message">{error}</p>}
                </div>
            )}
        </div>
    );
}

export default UpdatePassword;