import React, { useCallback, useEffect, useState } from 'react';
import '../Pages/Home.css';
import { useNavigate } from 'react-router-dom';
import { BaseUrl, fetchData } from '../Assets/Data';
import LoadingSpinner from '../components/LoadingSpinner';

function Plans() {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);
    const [investmentOffers, setInvestmentOffers] = useState([]);
    const [peopleInvested, setPeopleInvested] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);

    const fetchUserData = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchData();
            await fetchPlans();
            setUserData(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchPlans = useCallback(async () => {
        try {
            const id = localStorage.getItem('id');
            const [detailsResponse] = await Promise.all([
                fetch(`${BaseUrl}/myplan/${id}`),
            ]);
            const inPlan = await fetch(`${BaseUrl}/plan`);
            const details = await detailsResponse.json();
            const investPlan = await inPlan.json();

            setPeopleInvested(details);
            setInvestmentOffers(investPlan);
        } catch (error) {
            console.error('Error fetching plans:', error);
        }
    }, []);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    const openEditModal = (plan) => {
        setSelectedPlan(plan);
        setIsModalOpen(true);
    };

    const closeEditModal = () => {
        setSelectedPlan(null);
        setIsModalOpen(false);
    };

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch(`${BaseUrl}/upload-image`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Failed to upload image");

            const data = await response.json();
            return data.imageUrl; // Assuming the server returns the uploaded image URL
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image.");
            return null;
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            let updatedImageUrl = selectedPlan.image;

            // If a new image is selected, upload it
            if (selectedPlan.newImage) {
                const uploadedImageUrl = await handleImageUpload(selectedPlan.newImage);
                if (uploadedImageUrl) {
                    updatedImageUrl = uploadedImageUrl;
                }
            }

            const response = await fetch(`${BaseUrl}/plan/${selectedPlan._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...selectedPlan, image: updatedImageUrl }),
            });

            if (!response.ok) throw new Error("Failed to update plan");

            const updatedPlan = await response.json();
            setInvestmentOffers((prev) =>
                prev.map((plan) => (plan._id === updatedPlan._id ? updatedPlan : plan))
            );
            alert("Plan updated successfully!");
            closeEditModal();
        } catch (error) {
            console.error("Error updating plan:", error);
            alert("Failed to update plan.");
        }
    };

    const toggleLockStatus = async () => {
        try {
            const response = await fetch(`${BaseUrl}/plan/${selectedPlan._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ lock: !selectedPlan.lock }),
            });

            if (!response.ok) throw new Error('Failed to update lock status');

            const updatedPlan = await response.json();
            setSelectedPlan((prev) => ({ ...prev, lock: updatedPlan.lock }));
            setInvestmentOffers((prev) =>
                prev.map((plan) => (plan._id === updatedPlan._id ? updatedPlan : plan))
            );
            alert('Lock status updated successfully!');
        } catch (error) {
            console.error('Error updating lock status:', error);
            alert('Failed to update lock status.');
        }
    };



    const renderInvestmentOffer = (offer) => {
        const peopleCount = peopleInvested[`plan${offer.id}`] || '0';

        return (
            <div
                key={offer.id}
                className={`offer-card ${offer.lock ? '' : 'shadow-md'} relative`}
            >
                <img src={offer.image} alt={offer.name} className="offer-image" />
                <div className="w-[50%] flex flex-col items-left">
                    <h2>Investment: {offer.amount}</h2>
                    <p className="pb-0 mb-0">Expire Plan: {offer.days}D</p>
                    <span className="text-[10px] font-semibold text-red-500 text-left ml-2 w-full">
                        {peopleCount} people invested
                    </span>
                </div>
                <div className="w-[30%] flex flex-col items-center justify-end h-full">
                    <span className="text-[#347928] font-bold text-[11px]">{offer.name}</span>
                    <span className="text-[#347928] font-bold text-[10px]">
                        Daily Profit: {offer.profit}
                    </span>
                    <button
                        onClick={() => openEditModal(offer)}
                        className="bg-blue-500 text-white text-[10px] px-2 py-1 rounded-md mt-2"
                    >
                        Edit
                    </button>
                </div>
            </div>
        );
    };

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="flex flex-col items-center mt-4 w-[90%] md:w-[80%] md:ml-[20%] pb-[20%] ml-[5%]">
                    <div className="investment-offers">
                        <div className="flex flex-row items-center justify-between mb-4">
                            <span className="text-[14px] font-medium text-black">
                                Investment Offers
                            </span>
                            <span className="text-[14px] font-bold text-[#347928]">
                                All Offers
                            </span>
                        </div>
                        <div className="offers-grid">
                            {investmentOffers.map(renderInvestmentOffer)}
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {/* Edit Modal */}
            {isModalOpen && selectedPlan && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[50%]">
                        <h2 className="text-2xl font-bold mb-4">Edit Plan</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                                <label className="block text-lg font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    value={selectedPlan.name}
                                    onChange={(e) =>
                                        setSelectedPlan({ ...selectedPlan, name: e.target.value })
                                    }
                                    className="border border-gray-300 p-2 w-full rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium mb-2">Amount</label>
                                <input
                                    type="number"
                                    value={selectedPlan.amount}
                                    onChange={(e) =>
                                        setSelectedPlan({ ...selectedPlan, amount: e.target.value })
                                    }
                                    className="border border-gray-300 p-2 w-full rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium mb-2">Days</label>
                                <input
                                    type="number"
                                    value={selectedPlan.days}
                                    onChange={(e) =>
                                        setSelectedPlan({ ...selectedPlan, days: e.target.value })
                                    }
                                    className="border border-gray-300 p-2 w-full rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium mb-2">Profit</label>
                                <input
                                    type="number"
                                    value={selectedPlan.profit}
                                    onChange={(e) =>
                                        setSelectedPlan({ ...selectedPlan, profit: e.target.value })
                                    }
                                    className="border border-gray-300 p-2 w-full rounded-md"
                                />
                            </div>
                            {/* <div className="mb-4">
                                <label className="block text-lg font-medium mb-2">Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setSelectedPlan({ ...selectedPlan, newImage: e.target.files[0] })
                                    }
                                    className="border border-gray-300 p-2 w-full rounded-md"
                                />
                                {selectedPlan.image && (
                                    <img
                                        src={selectedPlan.image}
                                        alt="Current Plan"
                                        className="mt-2 w-32 h-32 object-cover rounded-md"
                                    />
                                )}
                            </div> */}
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-lg font-medium">
                                    Status: {selectedPlan.lock ? "Locked" : "Open"}
                                </span>
                                <button
                                    type="button"
                                    onClick={toggleLockStatus}
                                    className={`${selectedPlan.lock ? "bg-red-500" : "bg-green-500"
                                        } text-white px-4 py-2 rounded-md`}
                                >
                                    {selectedPlan.lock ? "Unlock" : "Lock"}
                                </button>
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Plans;