import React, { useState } from 'react';
import './Deposit.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { BaseUrl, CLOUDINARY_URL, sendEmail } from '../Assets/Data';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

function Deposit() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        bankName: '',
        accountHolderName: '',
        accountNumber: '',
        amount: null,
        paymentProof: null,
    });
    const [uploading, setUploading] = useState(false);
    const banks = ['Alfalah', 'Easypaisa', 'Jazzcash', 'HBL', 'Meezan Bank', 'MCB', 'NIB Bank', 'Standard Chartered Bank', 'UBL'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            paymentProof: e.target.files[0],
        });
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        alert(`${text} copied to clipboard!`);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setUploading(true);
        const id = localStorage.getItem('id');


        let form = new FormData();
        form.append('file', formData.paymentProof);
        form.append('upload_preset', 'tesco_app');
        form.append('cloud_name', 'da9jxjnlv');

        const cloudinaryResponse = await fetch(CLOUDINARY_URL, {
            method: 'POST',
            body: form,
        });

        const cloudinaryData = await cloudinaryResponse.json();
        console.log('Cloudinary Response:', cloudinaryData.secure_url);

        if (!cloudinaryData.secure_url) {
            alert('Image upload failed. Please try again.');
            return;
        }
        let url1 = cloudinaryData.secure_url;

        console.log('images:', url1);

        if (!formData.paymentProof || !formData.amount) {
            alert('all fields are madatory');
            setUploading(false);
            return;
        }

        const data = {
            image1: url1,
            payerId: id,
            bank: formData.bankName,
            name: formData.accountHolderName,
            amount: formData.amount,
        };

        try {
            const response = await fetch(`${BaseUrl}/screenshot`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),

            });

            const result = await response.json();
            console.log('Category added:', result);
            if (response.ok) {
                await sendEmail('sajimayo786@gmail.com', 'Deposit Request', `You have new Deposit request of amount ${formData.amount} Rs.`)
                navigate('/home');
                alert('Request Sent');
            }
        } catch (error) {
            console.error('Error submitting category:', error);
            alert('Failed to submit category');
        } finally {
            setUploading(false);
        }
    };


    return (
        <>
            {uploading ? <LoadingSpinner /> : <div className="deposit-container">
                <h2>Deposit Funds</h2>
                <div className="bank-details">
                    <h3 className='w-full font-bold'>Bank Details:</h3>
                    <div className="detail">
                        <span>Bank Name:</span>
                    </div>
                    <div className="border rounded-md p-2 flex flex-row items-center justify-between">
                        <span className='text-[14px] text-black font-bold'>Easypaisa</span>
                        <button onClick={() => handleCopy('Easypaisa')}>
                            <FontAwesomeIcon icon={faCopy} className='text-gray-500 text-[20px]' />
                        </button>
                    </div>
                    <div className="detail mt-4">
                        <span>Account Holder Name:</span>
                    </div>
                    <div className="border rounded-md p-2 flex flex-row items-center justify-between">
                        <span className='text-[14px] text-black font-bold'>Mohammed Kashif</span>
                        <button onClick={() => handleCopy('Mohammed Kashif')}>
                            <FontAwesomeIcon icon={faCopy} className='text-gray-500 text-[20px]' />
                        </button>
                    </div>
                    <div className="detail mt-4">
                        <span>Account Number:</span>
                    </div>
                    <div className="border rounded-md p-2 flex flex-row items-center justify-between">
                        <span className='text-[14px] text-black font-bold'>03248008331</span>
                        <button onClick={() => handleCopy('03248008331')}>
                            <FontAwesomeIcon icon={faCopy} className='text-gray-500 text-[20px]' />
                        </button>
                    </div>
                </div>
                <p className="note">
                    Send the amount you want to deposit to the above-mentioned account and upload the payment proof below. The amount will be added to your wallet once the transaction is verified.
                </p>
                <form className="deposit-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="bankName">Select Bank Name</label>
                        <select
                            id="bankName"
                            name="bankName"
                            value={formData.bankName}
                            onChange={handleChange}
                            required>
                            <option value="">Select Bank</option>
                            {banks.map((item) => (<option value={item}>{item}</option>))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="accountHolderName">Account Holder Name</label>
                        <input
                            type="text"
                            id="accountHolderName"
                            name="accountHolderName"
                            placeholder="Enter account holder name"
                            value={formData.accountHolderName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="accountNumber">Account Number</label>
                        <input
                            type="text"
                            id="accountNumber"
                            name="accountNumber"
                            placeholder="Enter account number"
                            value={formData.accountNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="accountNumber">Amount</label>
                        <input
                            type="text"
                            placeholder='Enter amount'
                            pattern="\d*"
                            inputMode="numeric"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                        />
                    </div>
                    {formData.paymentProof && <img src={URL.createObjectURL(formData.paymentProof)} alt="Preview" className='w-full h-[150px] rounded-md' />}
                    <div >
                        <label htmlFor="paymentProof">Upload Payment Proof</label>
                        <div className="w-full mt-4">
                            <input
                                type="file"
                                id="paymentProof"
                                name="paymentProof"
                                onChange={handleFileChange}
                                // required
                                className="hidden" // hide the native input
                            />
                            <label
                                htmlFor="paymentProof"
                                className="flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded-xl p-4 h-[200px] cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-10 w-10 text-gray-500 mb-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 16V4m0 0L3 8m4-4l4 4m5 4v8m0 0l-4-4m4 4l4-4"
                                    />
                                </svg>
                                <span className="text-gray-500">Click to upload file</span>
                                <span className="text-sm text-gray-400">(Max size: 5MB)</span>
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="submit-button">Deposit</button>
                </form>
            </div>}
        </>
    );
}

export default Deposit;