import React, { useEffect, useState } from "react";
import Modal from "../components/ModalShow";
import { BaseUrl } from "../Assets/Data";
import LoadingSpinner from "./LoadingSpinner";

function AddAccount() {
    const [accounts, setAccounts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newAccount, setNewAccount] = useState({ bankName: "", userName: "", accountNumber: "" });

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setNewAccount({ bankName: "", userName: "", accountNumber: "" });
    };

    const fetchAccounts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/admin-account`);
            const json = await response.json();
            setAccounts(json);
        } catch (e) {
            console.log('error fetching accounts', e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAccounts();
    }, []);

    const handleAddAccount = async () => {
        if (!newAccount.bankName || !newAccount.userName || !newAccount.accountNumber) {
            alert("Please fill all fields.");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${BaseUrl}/admin-account`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newAccount.userName, bank: newAccount.bankName, accountNumber: newAccount.accountNumber }),
            });

            if (!response.ok) {
                throw new Error('Failed to add account');
            }
            const data = await response.json();
            alert('account added successfully');
            console.log('Account added successfully:', data);
            return data;
        } catch (error) {
            console.error('Error adding account:', error);
            alert('Failed to add account. Please try again.');
        } finally {
            setLoading(false);
            fetchAccounts();
            closeModal();
        }
        closeModal();
    };

    const handleDeleteAccount = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this account?");
        if (confirmed) {
            setAccounts(accounts.filter((account) => account._id !== id));
        }
        setLoading(true);
        try {
            const response = await fetch(`${BaseUrl}/admin-account/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete account');
            }

            const data = await response.json();
            console.log('Account deleted successfully:', data);
            return data;
        } catch (error) {
            console.error('Error deleting account:', error);
            alert('Failed to delete account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? <LoadingSpinner /> : <div className="flex flex-col items-center w-[80%] ml-[20%] p-6">
                <h1 className="text-2xl font-bold mb-4">Account Management</h1>
                <button
                    onClick={openModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mb-4"
                >
                    Add Account
                </button>
                <div className="w-full max-w-4xl">
    {accounts.length > 0 ? (
        <div className="hidden md:block">
            {/* Table for larger screens */}
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">Bank Name</th>
                        <th className="border border-gray-300 p-2">User Name</th>
                        <th className="border border-gray-300 p-2">Account Number</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map((account) => (
                        <tr key={account.id}>
                            <td className="border border-gray-300 p-2">{account.bank}</td>
                            <td className="border border-gray-300 p-2">{account.name}</td>
                            <td className="border border-gray-300 p-2">{account.accountNumber}</td>
                            <td className="border border-gray-300 p-2 text-center">
                                <button
                                    onClick={() => handleDeleteAccount(account._id)}
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    ) : (
        <p className="text-gray-600 text-center">No accounts available.</p>
    )}

    {/* Cards for mobile view */}
    <div className="block md:hidden">
        {accounts.map((account) => (
            <div
                key={account.id}
                className="border border-gray-300 rounded-md p-4 mb-4 flex flex-col"
            >
                <div className="mb-2">
                    <span className="font-bold">Bank Name:</span> {account.bank}
                </div>
                <div className="mb-2">
                    <span className="font-bold">User Name:</span> {account.name}
                </div>
                <div className="mb-2">
                    <span className="font-bold">Account Number:</span> {account.accountNumber}
                </div>
                <div className="text-center">
                    <button
                        onClick={() => handleDeleteAccount(account._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                    >
                        Delete
                    </button>
                </div>
            </div>
        ))}
    </div>
</div>

                {/* Modal for Adding Account */}
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <div className="p-4">
                        <h2 className="text-xl font-bold mb-4">Add Account</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Bank Name</label>
                            <input
                                type="text"
                                value={newAccount.bankName}
                                onChange={(e) => setNewAccount({ ...newAccount, bankName: e.target.value })}
                                placeholder="Enter bank name"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">User Name</label>
                            <input
                                type="text"
                                value={newAccount.userName}
                                onChange={(e) => setNewAccount({ ...newAccount, userName: e.target.value })}
                                placeholder="Enter user name"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Account Number</label>
                            <input
                                type="text"
                                value={newAccount.accountNumber}
                                onChange={(e) => setNewAccount({ ...newAccount, accountNumber: e.target.value })}
                                placeholder="Enter account number"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleAddAccount}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mr-2"
                            >
                                Add
                            </button>
                            <button
                                onClick={closeModal}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>}
        </>
    );
}

export default AddAccount;