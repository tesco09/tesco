import React, { useEffect, useState } from "react";
import { BaseUrl } from "../Assets/Data";
import Modal from "../components/ModalShow";
import LoadingSpinner from "../components/LoadingSpinner";

export default function PendingDeposits() {
    const [screenshots, setScreenshots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [userDetail, setUserDetail] = useState({});

    const fetchScreenshots = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/screenshot`);
            const json = await response.json();
            const pendingData = json.filter((item) => item.verify === false && item.scam === false);
            setScreenshots(pendingData);
        } catch (e) {
            console.log('Error fetching screenshots:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchScreenshots();
    }, []);

    const handleAccept = async () => {
        try {
            const response = await fetch(`${BaseUrl}/verifyscreenshot/${userDetail.payerId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: userDetail.amount, screenshotId: userDetail._id }),
            });

            if (!response.ok) throw new Error('Failed to accept deposit');

            alert('Deposit accepted successfully!');
            setScreenshots((prev) =>
                prev.filter((item) => item._id !== userDetail._id)
            );
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error accepting deposit:', error);
            alert('Failed to accept deposit.');
        }
    };

    const handleReject = async () => {
        try {
            const response = await fetch(`${BaseUrl}/rejectscreenshot/${userDetail.payerId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: userDetail.amount, screenshotId: userDetail._id }),
            });

            if (!response.ok) throw new Error('Failed to reject deposit');

            alert('Deposit rejected successfully!');
            setScreenshots((prev) =>
                prev.filter((item) => item._id !== userDetail._id)
            );
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error rejecting deposit:', error);
            alert('Failed to reject deposit.');
        }
    };

    const RenderScreenshots = () => {
        return (
            <>
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="dashboard w-[90%] md:w-[80%] md:ml-[20%]">
                        <h2 className="text-2xl font-semibold mb-4">Pending Deposits</h2>

                        {/* Desktop View */}
                        <div className="hidden sm:block">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                                <thead>
                                    <tr className="bg-gray-100 text-left">
                                        <th className="p-3 border-b">Name</th>
                                        <th className="p-3 border-b">Bank</th>
                                        <th className="p-3 border-b">Amount</th>
                                        <th className="p-3 border-b">Status</th>
                                        <th className="p-3 border-b">Date</th>
                                        <th className="p-3 border-b">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {screenshots.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="p-4 text-center text-gray-500">
                                                No users found.
                                            </td>
                                        </tr>
                                    ) : (
                                        screenshots.map((user, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50 transition">
                                                <td className="p-3 border-b">{user.name}</td>
                                                <td className="p-3 border-b">{user.bank}</td>
                                                <td className="p-3 border-b">{user.amount}</td>
                                                <td className="p-3 border-b">
                                                    {user.verify
                                                        ? 'Verified'
                                                        : user.scam
                                                            ? 'Rejected'
                                                            : 'Pending'}
                                                </td>
                                                <td className="p-3 border-b">
                                                    {new Date(user.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="p-3 border-b">
                                                    <button
                                                        onClick={() => {
                                                            setUserDetail(user);
                                                            setSelectedImage(user.image1);
                                                            setIsModalOpen(true);
                                                        }}
                                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition border"
                                                    >
                                                        Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile View */}
                        <div className="block sm:hidden">
                            {screenshots.length === 0 ? (
                                <p className="text-center text-gray-500">
                                    No users found.
                                </p>
                            ) : (
                                screenshots.map((user, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white border border-gray-200 rounded-lg shadow-md p-4 mb-4"
                                    >
                                        <p className="text-sm font-medium">
                                            <strong>Name:</strong> {user.name}
                                        </p>
                                        <p className="text-sm font-medium">
                                            <strong>Bank:</strong> {user.bank}
                                        </p>
                                        <p className="text-sm font-medium">
                                            <strong>Amount:</strong> {user.amount}
                                        </p>
                                        <p className="text-sm font-medium">
                                            <strong>Status:</strong>{" "}
                                            {user.verify
                                                ? 'Verified'
                                                : user.scam
                                                    ? 'Rejected'
                                                    : 'Pending'}
                                        </p>
                                        <p className="text-sm font-medium">
                                            <strong>Date:</strong>{" "}
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </p>
                                        <button
                                            onClick={() => {
                                                setUserDetail(user);
                                                setSelectedImage(user.image1);
                                                setIsModalOpen(true);
                                            }}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition mt-2"
                                        >
                                            Details
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </>
        );
    };

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="flex flex-col items-center w-full md:w-[80%] md:ml-[20%] bg-white">
                    <RenderScreenshots />
                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        <img
                            src={selectedImage}
                            alt="image"
                            className="h-auto w-full transition-transform duration-300 ease-in-out hover:scale-150"
                        />
                        <h2 className="text-2xl font-semibold mb-4">Deposit Details</h2>
                        <div className="flex flex-col items-center w-full">
                            <span className="w-full text-[14px] font-medium">
                                Name: {userDetail.name}
                            </span>
                            <span className="w-full text-[14px] font-medium">
                                Bank: {userDetail.bank}
                            </span>
                            <span className="w-full text-[14px] font-medium">
                                Amount: {userDetail.amount}
                            </span>
                        </div>
                        <div className="flex justify-between mt-4 w-full">
                            <button
                                onClick={handleAccept}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                            >
                                Accept
                            </button>
                            <button
                                onClick={handleReject}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                            >
                                Reject
                            </button>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
                        >
                            Close Modal
                        </button>
                    </Modal>
                </div>
            )}
        </>
    );
}