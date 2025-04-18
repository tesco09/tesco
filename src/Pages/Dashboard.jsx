import React, { useEffect, useState } from "react";
import { BaseUrl } from "../Assets/Data";
import { Dots, Spinner } from "react-activity";
import Modal from "../components/ModalShow";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Dashboard() {

    const id = localStorage.getItem('id');
    const [screenshots, setScreenshots] = useState([]);
    const [withdrawRequests, setWithdrawRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedId, setSelectedId] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [userDetail, setUserDetail] = useState({});
    const [view, setView] = useState('screenshots');

    // Fetch Screenshots
    const fetchScreenshots = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/screenshot`);
            const json = await response.json();
            const pendingData = await json.filter((item) => item.verify === false);
            setScreenshots(pendingData);
        } catch (e) {
            console.log('error fetching screenshots');
        } finally {
            setLoading(false);
        }
    }

    const fetchDetail = async (userId) => {
        try {
            setLoading(true);
            setIsModalOpen(true);
            const response = await fetch(`${BaseUrl}/register/${userId}`);
            const json = await response.json();
            if (response.ok) {
                setUserDetail(json);
            }
        } catch (e) {
            console.log('error fetching user data', e);
        } finally {
            setLoading(false);
        }
    }
    // Fetch Withdraw Requests
    const fetchWithdrawRequests = async () => {
        try {
            const response = await fetch(`${BaseUrl}/withdraw`);
            const json = await response.json();
            const pendingData = await json.filter((item) => item.pending === true);
            setWithdrawRequests(pendingData);
        } catch (e) {
            console.log('error fetching withdraw requests');
        }
    }

    useEffect(() => {
        fetchScreenshots();
        fetchWithdrawRequests();
    }, []);

    const verifyScreenshot = async (amount, screenshotId) => {
        try {
            setLoading(true);
            setSelectedId(screenshotId);
            const response = await fetch(`${BaseUrl}/verifyscreenshot/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    amount,
                    screenshotId
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Success:", data.message);
                fetchScreenshots();
            } else {
                console.error("Failed:", data.message);
            }

        } catch (error) {
            console.error("Error:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const verifyWithdraw = async (withdrawId) => {
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/verifywithdraw/${withdrawId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Withdraw verified:', data.message);
                fetchWithdrawRequests(); // Refresh the withdraw requests list
                // optionally refresh the list or show success toast
            } else {
                console.error('Failed to verify withdraw:', data.message);
            }

        } catch (error) {
            console.error('Error verifying withdraw:', error.message);
        } finally {
            setLoading(false);
        }
    };


    const RenderScreenshots = () => {
        return (
            <>
                {screenshots?.map((item) => (
                    <div onClick={() => { setSelectedImage(item.image1); setIsModalOpen(true); }} className="flex flex-col items-center shadow-m rounded-lg w-[90%] p-2 border">
                        <img src={item.image1} alt="Screenshot" className="w-full h-[150px] rounded-md" />
                        <span className="w-full text-[14px] font-medium mt-[2%]">Name: {item.name}</span>
                        <span className="w-full text-[14px] font-medium">Bank: {item.bank}</span>
                        <span className="w-full text-[14px] font-medium">Amount: {item.amount}</span>
                        {loading && selectedId === item._id ? (
                            <Spinner color="#000" size={32} speed={1} animating={true} />
                        ) : (
                            <button
                                onClick={() => verifyScreenshot(item.amount, item._id)}
                                className="bg-gradient-to-r from-[#5D8736] to-[#809D3C] text-white px-4 py-2 border-none rounded text-[16px] cursor-pointer transition duration-300 ease-in-out w-full mt-[5%]"
                            >
                                Verify
                            </button>
                        )}
                    </div>
                ))}
            </>
        )
    }

    const RenderWithdrawRequests = () => {
        return (
            <>
                {withdrawRequests?.map((request) => (
                    <div key={request._id} className="flex flex-col items-center shadow-m rounded-lg w-[90%] p-2 border">
                        <span className="w-full text-[14px] font-bold">Withdraw Request</span>
                        <span className="w-full text-[14px] font-medium">Amount: {request.amount}</span>
                        <button onClick={() => fetchDetail(request.sender)} className='w-full text-[12px] text-[#5D8736] font-medium w-full text-left underline'>Detail</button>
                        <button
                            onClick={() => verifyWithdraw(request._id)}
                            className="bg-gradient-to-r from-[#5D8736] to-[#809D3C] text-white px-4 py-2 border-none rounded text-[16px] cursor-pointer transition duration-300 ease-in-out w-full mt-[5%]"
                        >
                            Process Withdraw
                        </button>
                    </div>
                ))}
            </>
        )
    }

    return (
        <>
            {loading ? <LoadingSpinner /> : <div className="flex flex-col items-center w-full bg-white">
                {/* Toggle Buttons */}
                <div className="flex justify-center space-x-4 mb-6 mt-[10%]">
                    <button
                        onClick={() => setView('screenshots')}
                        className={`px-4 py-2 rounded text-[12px] ${view === 'screenshots' ? 'bg-[#5D8736] text-white' : 'bg-gray-300'}`}
                    >
                        Screenshots
                    </button>
                    <button
                        onClick={() => setView('withdraw')}
                        className={`px-6 py-2 rounded text-[12px] ${view === 'withdraw' ? 'bg-[#5D8736] text-white' : 'bg-gray-300'}`}
                    >
                        Withdraw Requests
                    </button>
                </div>

                {/* Conditional Rendering Based on View */}
                {view === 'screenshots' ? <RenderScreenshots /> : <RenderWithdrawRequests />}
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    {view === 'screenshots' ? <img src={selectedImage} alt="image" className="h-auto w-full transition-transform duration-300 ease-in-out hover:scale-150" /> : <>
                        <h2 className="text-2xl font-semibold mb-4">Modal Content</h2>
                        <div className="flex flex-col items-center w-full">
                            <span className="w-full text-[14px] font-medium">Name: {userDetail.name}</span>
                            <span className="w-full text-[14px] font-medium">Email: {userDetail.email}</span>
                            <span className="w-full text-[14px] font-medium">Balance: {userDetail.balance}</span>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                        >
                            Close Modal
                        </button>
                    </>}
                </Modal>
            </div>}
        </>
    );
}
