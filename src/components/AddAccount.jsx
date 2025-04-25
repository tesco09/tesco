import React, { useState } from "react";
import Modal from "../components/ModalShow";

function AddAccount() {
    const [accounts, setAccounts] = useState([
        { id: 1, bankName: "Jazzcash", userName: "Mohammed Abbas", accountNumber: "03254703579" },
        { id: 2, bankName: "Easypaisa", userName: "Kashif Ali", accountNumber: "03248008331" },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAccount, setNewAccount] = useState({ bankName: "", userName: "", accountNumber: "" });

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setNewAccount({ bankName: "", userName: "", accountNumber: "" });
    };

    const handleAddAccount = () => {
        if (!newAccount.bankName || !newAccount.userName || !newAccount.accountNumber) {
            alert("Please fill all fields.");
            return;
        }
        setAccounts([...accounts, { ...newAccount, id: Date.now() }]);
        closeModal();
    };

    const handleDeleteAccount = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this account?");
        if (confirmed) {
            setAccounts(accounts.filter((account) => account.id !== id));
        }
    };

    return (
        <div className="flex flex-col items-center w-full p-6">
            <h1 className="text-2xl font-bold mb-4">Account Management</h1>
            <button
                onClick={openModal}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mb-4"
            >
                Add Account
            </button>
            <div className="w-full max-w-4xl">
                {accounts.length > 0 ? (
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
                                    <td className="border border-gray-300 p-2">{account.bankName}</td>
                                    <td className="border border-gray-300 p-2">{account.userName}</td>
                                    <td className="border border-gray-300 p-2">{account.accountNumber}</td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        <button
                                            onClick={() => handleDeleteAccount(account.id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-600 text-center">No accounts available.</p>
                )}
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
        </div>
    );
}

export default AddAccount;