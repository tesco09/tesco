import {
    faAdd,
    faBank,
    faEdit,
    faEye,
    faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import './Deposit.css';
// import Modal from "../components/ModalShow";
import Modal from "../components/ModalChart";
import { useNavigate } from "react-router-dom";
import { BaseUrl, maskString, sendEmail } from "../Assets/Data";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Withdraw() {
    const navigate = useNavigate();

    const [showBalance, setShowBalance] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [haveBank, setHaveBank] = useState(false);
    const [loading, setLoading] = useState(false);
    const [availableBalance, setAvailableBalance] = useState(0);
    const [openModal, setOpenModal] = useState(true);
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [formData, setFormData] = useState({
        id: '',
        userId: '',
        bankName: '',
        accountHolderName: '',
        accountNumber: ''
    });

    const banks = ['Alfalah', 'Easypaisa', 'Jazzcash', 'HBL', 'Meezan Bank', 'MCB', 'NIB Bank', 'Standard Chartered Bank', 'UBL'];

    const userId = localStorage.getItem('id');

    // Toggle balance visibility
    const toggleBalanceVisibility = () => {
        setShowBalance(!showBalance);
    };

    // Handle changes for input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle amount input
    const handleAmountChange = (e) => {
        setWithdrawAmount(e.target.value);
    };

    const fetchLastWithdrawal = async () => {
        const id = localStorage.getItem('id');
        const endpoint = `${BaseUrl}/last-withdraw/${id}`;
        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                console.error('Error fetching last withdrawal:', data.message);
            }
        } catch (error) {
            console.error('Error fetching last withdrawal:', error);
        } finally {
            setLoading(false);
        }
    }

    // Fetch bank & balance data
    const fetchData = async () => {
        setLoading(true);
        try {
            const [bankRes, userRes] = await Promise.all([
                fetch(`${BaseUrl}/bank/${userId}`),
                fetch(`${BaseUrl}/register/${userId}`)
            ]);

            const bankData = await bankRes.json();
            const userData = await userRes.json();

            setAvailableBalance(userData?.balance || 0);

            if (bankRes.ok && bankData) {
                setHaveBank(true);
                setFormData({
                    id: bankData._id,
                    userId: bankData.userId,
                    bankName: bankData.bankName,
                    accountHolderName: bankData.accountName,
                    accountNumber: bankData.accountNumber
                });
            } else {
                setHaveBank(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Upload or update bank details
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data1 = {
            userId: userId,
            bankName: formData.bankName,
            accountName: formData.accountHolderName,
            accountNumber: formData.accountNumber
        }
        const method = haveBank ? 'PATCH' : 'POST';
        const end = haveBank ? `bank/${formData.id}` : 'bank';
        const endpoint = `${BaseUrl}/${end}`;

        try {
            const res = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data1)
            });

            if (res.ok) {
                alert(`Bank details ${haveBank ? "updated" : "uploaded"} successfully`);
                fetchData();
            } else {
                const error = await res.json();
                alert(error.message || 'Something went wrong');
            }
        } catch (err) {
            console.error("Bank submission error:", err);
            alert('Failed to submit bank details');
        } finally {
            setLoading(false);
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    const handleWithdraw = async () => {
        const id = localStorage.getItem('id');
        const endpoint = `${BaseUrl}/withdraw`;
        setLoading(true);
        const lastWithdrawal = await fetchLastWithdrawal();
        const lastWithdrawDate = new Date(lastWithdrawal?.timestamp);
        const currentDate = new Date();
        const timeDifference = currentDate - lastWithdrawDate;
        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
        if (lastWithdrawal && hoursDifference < 24) {
            alert(`You can only withdraw once every 24 hours. Please try again later.`);
            return;
        }

        if (withdrawAmount > availableBalance) {
            alert('Withdraw amount exceeds available balance');
            setLoading(false);
            return;
        }
        if (withdrawAmount < 100) {
            alert('Withdraw amount must be minimum 100');
            setLoading(false);
            return;
        }
        if (withdrawAmount === '') {
            alert('Withdraw amount cannot be empty');
            setLoading(false);
            return;
        }

        const currentHour = new Date().getHours();

        if (currentHour < 10 || currentHour >= 17) {
            alert('Withdraw opens at 10 AM and closes at 5 PM');
            setLoading(false);
            return;
        }


        const data = {
            sender: id,
            receiver: 'admin',
            name: formData.accountHolderName,
            bank: formData.bankName,
            accountNumber: formData.accountNumber,
            amount: withdrawAmount - (withdrawAmount * 2 / 100),
            charges: (withdrawAmount * 2 / 100)
        };

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                const responseData = await res.json();
                await sendEmail('sajimayo786@gmail.com', 'Withdraw Request', `You have new Withdraw request of amount ${withdrawAmount} Rs.`)
                // console.log('Withdrawal created successfully:', responseData);
                alert('Withdrawal successful!');
                navigate('/transactions/Withdraw');
            } else {
                const error = await res.text();
                console.error('Error creating withdrawal:', error);
                alert('Failed to create withdrawal', error);
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to create withdrawal');
        } finally {
            setLoading(false);
        }
    };


    return loading ? (
        <LoadingSpinner />
    ) : (
        <div className="flex flex-col items-center mt-4 w-full">
            <h2 className="text-[28px] font-bold">Total Balance</h2>
            <div className="flex flex-row items-center justify-between">
                <h3 className="text-[#347928] font-bold text-[28px] mt-2">
                    PKR: {showBalance ? availableBalance : '****'}
                </h3>
                <button onClick={toggleBalanceVisibility} className="ml-2">
                    <FontAwesomeIcon
                        icon={showBalance ? faEyeSlash : faEye}
                        className="text-[#347928] text-[16px]"
                    />
                </button>
            </div>

            <h3 className="text-[#347928] font-bold text-[38px] mt-2">PKR {withdrawAmount}</h3>

            <label className="text-[16px] text-gray-500 font-bold mt-4">Enter Amount</label>
            <input
                className="p-2 w-[120px] border rounded-md bg-white mt-1 text-[24px] font-bold"
                type="text"
                name="withdrawAmount"
                value={withdrawAmount}
                onChange={handleAmountChange}
                required
            />
            {withdrawAmount && <span className="text-[#347928] font-bold text-[12px] mt-2">Tax Amount: {withdrawAmount * 2 / 100}</span>}

            <span className="text-[18px] text-black w-[90%] font-medium mt-4">Withdraw Money To</span>

            {haveBank ? (
                <div className="flex flex-row items-center justify-between p-2 pl-4 pr-4 rounded-lg shadow-sm w-[90%] mt-4">
                    <FontAwesomeIcon icon={faBank} className="text-[#347928] text-[24px]" />
                    <div className="flex flex-col items-start w-[70%]">
                        <span className="text-[12px] text-black font-medium">{formData.bankName}</span>
                        <span className="text-[12px] text-black font-medium">{formData.accountNumber && maskString(formData.accountNumber)}</span>
                    </div>
                    <button onClick={() => setIsModalOpen(true)}>
                        <FontAwesomeIcon icon={faEdit} className="text-[#347928] text-[16px]" />
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex flex-col items-center justify-center p-2 pl-4 pr-4 rounded-full shadow-sm w-[50px] h-[50px] mt-4 border-[1.5px]"
                >
                    <span className="text-[14px] text-[#347928] font-bold">Add</span>
                </button>
            )}

            <p className="text-[14px] text-red-500 w-[90%] mt-4 font-medium">
                Note: According to the policy, service charges will be applicable on every withdrawal.
            </p>
            <h2 className="text-[14px] font-bold mt-2 text-black">Instructions</h2>
            <ol className="text-[12px] text-black w-[90%] mt-2 font-medium list-decimal list-inside">
                <li>Withdrawal time: 10 AM to 5:00 PM.</li>
                <li>The minimum withdrawal amount is 100 PKR.</li>
                <li>
                    Withdrawal will be sent to your attached accounts. We will not be responsible
                    if your attached account is invalid.
                </li>
                <li>1 withdrawal is allowed daily.</li>
                <li>The service fee for each withdrawal is 2%.</li>
            </ol>
            <button
                onClick={handleWithdraw}
                className="submit-button w-[90%] mt-4"
            >
                Withdraw
            </button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-xl font-semibold mb-4">Bank Details:</h2>
                <form className="deposit-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="bankName">Select Bank Name</label>
                        <select
                            id="bankName"
                            name="bankName"
                            value={formData.bankName}
                            onChange={handleChange}
                            required
                        >
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

                    <button type="submit" className="submit-button">
                        {haveBank ? "Update" : "Submit"}
                    </button>
                </form>
            </Modal>
            <Modal isOpen={openModal} onClose={() => { setOpenModal(false); }}>
                <div className="max-w-xl flex flex-col items-center mx-auto p-2">
                    <h2 className="text-xl font-bold text-center mb-4 text-[#347928]">WITHDRAWAL INSTRUCTION🚨</h2>
                    <ol dir="rtl" className="list-decimal space-y-2 text-right text-black text-sm font-[JameelNoori] ps-2 rtl:ps-0 rtl:pe-5">
                        <li>واپسی حاصل کرنے کے لیے، ڈپازٹ کی رقم کا 100 فیصد سرمایہ کاری کرنا ضروری ہے۔</li>
                        <li>اگر رقم نکلوانے کے دوران بینک اکاؤنٹ نمبر یا اکاؤنٹ ہولڈر کا نام غلط لکھا گیا ہے، تو واپسی منسوخ کر دی جائے گی۔</li>
                        <li>رقم نکالنے کے لیے U PAISA یا حبیب میٹرو بینک اکاؤنٹ استعمال نہ کریں۔</li>
                        <li>کسی بھی بینک کا IBAN نمبر نہ لکھیں، صرف اس کا اکاؤنٹ نمبر لکھیں ورنہ آپ کی رقم نکلوائی جائے گی۔</li>
                        <li>واپسی آپ تک پہنچنے کا وقت 12 گھنٹے سے 24 گھنٹے ہے اگر واپسی 24 گھنٹوں کے اندر آپ تک نہیں پہنچتی ہے تو ایڈمنز سے رابطہ کریں، لیکن اس وقت سے پہلے رابطہ نہ کریں۔</li>
                    </ol>
                    <p className="mt-4 text-center text-black font-semibold">Thank you Tesco Community</p>
                </div>
            </Modal>
        </div>
    );
}
