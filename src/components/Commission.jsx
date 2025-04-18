import React, { useEffect, useState } from "react";
import { BaseUrl } from "../Assets/Data";
import LoadingSpinner from "./LoadingSpinner";
import { faL } from "@fortawesome/free-solid-svg-icons";

function Commission() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(false);
    const commissionId = '6801eaa0dd70baf6256dd3ce';
    const [commissions, setCommissions] = useState({
        level1: 0,
        level2: 0,
        level3: 0,
    });

    const handleToggle = () => {
        setStatus((prevStatus) => !prevStatus);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCommissions((prevCommissions) => ({
            ...prevCommissions,
            [name]: value,
        }));
    };

    const fetchCommission = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/commission/${commissionId}`);
            const json = await response.json();
            setStatus(json.status);
            setCommissions({
                level1: json.level1,
                level2: json.level2,
                level3: json.level3,
            })
        } catch (e) {
            console.log('error fetching commission', e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCommission();
    }, [])

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/commission/${commissionId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status,
                    ...commissions,
                }),
            });
    
            if (!response.ok) throw new Error("Failed to update settings");
    
            const data = await response.json();
            alert("Settings updated successfully!");
            console.log("Updated settings:", data);
        } catch (error) {
            console.error("Error updating settings:", error);
            alert("Failed to update settings.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-start bg-gray-100">
            {loading ? <LoadingSpinner /> : <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[50%]">
                <h2 className="text-2xl font-bold mb-4 text-center">Commission Settings</h2>

                {/* Toggle Button */}
                <div className="flex items-center justify-between mb-6">
                    <span className="text-lg font-medium">Status: {status ? 'Active' : 'Inactive'}</span>
                    <button
                        onClick={handleToggle}
                        className={`px-4 py-2 rounded-md text-white ${status ? "bg-red-500" : "bg-green-500"
                            }`}
                    >
                        {status ? "Inactive" : "Active"}
                    </button>
                </div>

                {/* Commission Inputs */}
                {/* <div className="mb-4">
                    <label className="block text-lg font-medium mb-2">Level 1 Commission</label>
                    <input
                        type="number"
                        name="level1"
                        value={commissions.level1}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 w-full rounded-md"
                    />
                </div> */}
                {/* <div className="mb-4">
                    <label className="block text-lg font-medium mb-2">Level 2 Commission</label>
                    <input
                        type="number"
                        name="level2"
                        value={commissions.level2}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 w-full rounded-md"
                    />
                </div> */}
                {/* <div className="mb-4">
                    <label className="block text-lg font-medium mb-2">Level 3 Commission</label>
                    <input
                        type="number"
                        name="level3"
                        value={commissions.level3}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 w-full rounded-md"
                    />
                </div> */}

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                        Save Settings
                    </button>
                </div>
            </div>}
        </div>
    );
}

export default Commission;