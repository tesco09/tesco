import React, { useEffect, useState } from "react";
import { BaseUrl } from "../Assets/Data";
import Modal from "../components/ModalShow";
import LoadingSpinner from "../components/LoadingSpinner";

export default function PromoCode() {
    const [promoCodes, setPromoCodes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPromo, setSelectedPromo] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newPromo, setNewPromo] = useState({ amount: "", limit: "" });
    const [error, setError] = useState("");

    const fetchPromoCodes = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/promo`);
            const json = await response.json();
            setPromoCodes(json);
        } catch (e) {
            console.log("Error fetching promo codes:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPromoCodes();
    }, []);

    const handleCreatePromo = async () => {
        if (newPromo.amount <= 0) {
            setError("Amount must be greater than zero.");
            return;
        }

        if (!newPromo.limit || isNaN(newPromo.limit) || newPromo.limit <= 0) {
            setError("Limit must be a valid number greater than zero.");
            return;
        }

        try {
            const response = await fetch(`${BaseUrl}/promo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: parseFloat(newPromo.amount),
                    limit: parseInt(newPromo.limit),
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                // console.log("Response error:", response);
                console.log("Error body:", errorData);
                throw new Error("Failed to create promo code");
            }

            const createdPromo = await response.json();
            setPromoCodes((prev) => [...prev, createdPromo]);
            alert("Promo code created successfully!");
            setIsCreateModalOpen(false);
            setNewPromo({ amount: "", limit: "" });
            setError("");
        } catch (error) {
            console.error("Error creating promo code:", error);
            alert("Failed to create promo code.");
        }
    };

    const RenderPromoCodes = () => {
        return (
            <>
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="w-full md:w-[80%] md:ml-[20%]">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                            <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-0">
                                Promo Codes
                            </h2>
                            <button
                                onClick={() => setIsCreateModalOpen(true)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full sm:w-auto"
                            >
                                Create Promo Code
                            </button>
                        </div>
                        <div className="hidden sm:block overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                                <thead>
                                    <tr className="bg-gray-100 text-left">
                                        <th className="p-3 border-b">Code</th>
                                        <th className="p-3 border-b">Amount</th>
                                        <th className="p-3 border-b">Claimed By</th>
                                        <th className="p-3 border-b">Limit</th>
                                        <th className="p-3 border-b">Created At</th>
                                        <th className="p-3 border-b">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {promoCodes.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="p-4 text-center text-gray-500"
                                            >
                                                No promo codes found.
                                            </td>
                                        </tr>
                                    ) : (
                                        promoCodes.map((promo, idx) => (
                                            <tr
                                                key={idx}
                                                className="hover:bg-gray-50 transition"
                                            >
                                                <td className="p-3 border-b">
                                                    {promo.code}
                                                </td>
                                                <td className="p-3 border-b">
                                                    Pkr {promo.amount}
                                                </td>
                                                <td className="p-3 border-b">
                                                    {promo.claimBy.length} users
                                                </td>
                                                <td className="p-3 border-b">
                                                    {promo.limit} users
                                                </td>
                                                <td className="p-3 border-b">
                                                    {new Date(
                                                        promo.createdAt
                                                    ).toLocaleDateString()}
                                                </td>
                                                <td className="p-3 border-b">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedPromo(
                                                                promo
                                                            );
                                                            setIsModalOpen(
                                                                true
                                                            );
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
                            {promoCodes.length === 0 ? (
                                <p className="text-center text-gray-500">
                                    No promo codes found.
                                </p>
                            ) : (
                                promoCodes.map((promo, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white border border-gray-200 rounded-lg shadow-md p-4 mb-4"
                                    >
                                        <p className="text-sm font-medium">
                                            <strong>Code:</strong> {promo.code}
                                        </p>
                                        <p className="text-sm font-medium">
                                            <strong>Amount:</strong> Pkr &nbsp; 
                                            {promo.amount}
                                        </p>
                                        <p className="text-sm font-medium">
                                            <strong>Claimed By:</strong>{" "}
                                            {promo.claimBy.length} users
                                        </p>
                                        <p className="text-sm font-medium">
                                            <strong>Limit:</strong>{" "}
                                            {promo.limit} users
                                        </p>
                                        <p className="text-sm font-medium">
                                            <strong>Created At:</strong>{" "}
                                            {new Date(
                                                promo.createdAt
                                            ).toLocaleDateString()}
                                        </p>
                                        <button
                                            onClick={() => {
                                                setSelectedPromo(promo);
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
                    <RenderPromoCodes />
                    {/* Promo Details Modal */}
                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                    >
                        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                            Promo Code Details
                        </h2>
                        {selectedPromo && (
                            <div className="flex flex-col items-center w-full">
                                <span className="w-full text-sm sm:text-[14px] font-medium">
                                    Code: {selectedPromo.code}
                                </span>
                                <span className="w-full text-sm sm:text-[14px] font-medium">
                                    Amount: Pkr{selectedPromo.amount}
                                </span>
                                <span className="w-full text-sm sm:text-[14px] font-medium">
                                    Claimed By:
                                </span>
                                <ul className="list-disc pl-6">
                                    {selectedPromo.claimBy.map((claim) => (
                                        <li key={claim._id}>
                                            {claim.name} -{" "}
                                            {new Date(
                                                claim.claimedAt
                                            ).toLocaleDateString()}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded mt-4 w-full sm:w-auto"
                        >
                            Close
                        </button>
                    </Modal>

                    {/* Create Promo Code Modal */}
                    <Modal
                        isOpen={isCreateModalOpen}
                        onClose={() => setIsCreateModalOpen(false)}
                    >
                        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                            Create Promo Code
                        </h2>
                        <div className="flex flex-col items-center w-full">
                            {error && (
                                <div className="text-red-500 text-sm mb-2">
                                    {error}
                                </div>
                            )}
                            <label className="w-full text-sm sm:text-[14px] font-medium mb-2">
                                Limit of Users:
                                <input
                                    type="number"
                                    value={newPromo.limit}
                                    onChange={(e) =>
                                        setNewPromo({
                                            ...newPromo,
                                            limit: e.target.value,
                                        })
                                    }
                                    className="border border-gray-300 p-2 w-full rounded-md"
                                />
                            </label>
                            <label className="w-full text-sm sm:text-[14px] font-medium mb-2">
                                Amount:
                                <input
                                    type="number"
                                    value={newPromo.amount}
                                    onChange={(e) =>
                                        setNewPromo({
                                            ...newPromo,
                                            amount: e.target.value,
                                        })
                                    }
                                    className="border border-gray-300 p-2 w-full rounded-md"
                                />
                            </label>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-end mt-4 w-full">
                            <button
                                onClick={handleCreatePromo}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition w-full sm:w-auto"
                            >
                                Create
                            </button>
                            <button
                                onClick={() => setIsCreateModalOpen(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded mt-2 sm:mt-0 sm:ml-2 w-full sm:w-auto"
                            >
                                Cancel
                            </button>
                        </div>
                    </Modal>
                </div>
            )}
        </>
    );
}