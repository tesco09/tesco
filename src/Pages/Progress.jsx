import React, { useEffect, useState } from "react";
import { BaseUrl, daysDifference, formatDate, timeAgo, timeDifference } from "../Assets/Data";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Progress() {

    const [selectedLevel, setSelectedLevel] = React.useState(2);
    const [planData, setPlanData] = useState([]);
    const [peopleInvested, setPeopleInvested] = useState([]);
    const [loading, setLoading] = useState(false);
    const id = localStorage.getItem('id');

    const levels = [
        { id: 2, name: "Running" },
        { id: 1, name: "Complete" },
    ];

    const fetchPlans = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/myplan/${id}`);
            const response2 = await fetch(`${BaseUrl}/details/${id}`);
            const json = await response.json();
            const json2 = await response2.json();
            console.log('plan data:', json, json2);
            setPeopleInvested(json2);
            if (selectedLevel === 1) {
                const completed = json.filter((item) => item.status === 'complete');
                setPlanData(completed);
            } else if (selectedLevel === 2) {
                const completed = json.filter((item) => item.status === 'pending' || item.status === 'ready');
                setPlanData(completed);
            }
        } catch (e) {
            console.log('error fetching plans...');
        } finally {
            setLoading(false);
        }
    }

    const handleClaim = async (planId) => {
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/dailyclaim/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    planId: planId
                })
            });
            if (!response.ok) {
                alert('error in claiming');
            } else {
                alert('successfully claimed');
                fetchPlans();
            }
        } catch (e) {
            console.log('error in claim', e);
        } finally {
            setLoading(false);
        }
    }
    

    useEffect(() => {
        fetchPlans();
    }, [selectedLevel])

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="flex flex-col items-center mt-[5%] w-full h-screen">
                    <div className="flex space-x-4 mb-2 bg-white pt-2 mt-[5%]">
                        {levels.map((level) => (
                            <button
                                key={level.id}
                                onClick={() => setSelectedLevel(level.id)}
                                className={`px-4 py-2 rounded-full font-medium text-xs transition-all duration-300 ${selectedLevel === level.id
                                    ? "bg-[#347928] text-white shadow-lg"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                {level.name}
                            </button>
                        ))}
                    </div>

                    {/* Scrollable Plan Data */}
                    <div className="overflow-y-auto w-full px-4 mb-[20%]" style={{ maxHeight: '80vh' }}>
                        {planData?.map((item) => (
                            <div key={item._id} className="w-full flex flex-col items-center p-2 py-4 shadow-sm rounded-xl mt-6 bg-white">
                                <div className="flex flex-row items-center justify-between w-[90%] mt-2">
                                    <span className="text-[12px] font-bold text-black w-[50%]">Invested Amount:</span>
                                    <span className="text-[12px] font-bold text-right text-[#347928] w-[50%]">{item?.investment}</span>
                                </div>
                                <div className="flex flex-row items-center justify-between w-[90%] mt-2">
                                    <span className="text-[12px] font-bold text-black w-[50%]">Daily Profit:</span>
                                    <span className="text-[12px] font-bold text-right text-[#347928] w-[50%]">{item?.dailyProfit}</span>
                                </div>
                                {selectedLevel === 2 && (
                                    <div className="flex flex-row items-center justify-between w-[90%] mt-2">
                                        <span className="text-[12px] font-bold text-black w-[50%]">Remaining Time to Claim:</span>
                                        <span className="text-[12px] font-bold text-right text-[#347928] w-[50%]">
                                            {item?.lastClaim && timeDifference(item.lastClaim)}
                                        </span>
                                    </div>
                                )}
                                {selectedLevel === 2 && (
                                    <div className="flex flex-row items-center justify-between w-[90%] mt-2">
                                        <span className="text-[12px] font-bold text-black w-[50%]">Days Left:</span>
                                        <span className="text-[12px] font-bold text-right text-[#347928] w-[50%]">
                                            {item?.endDate && daysDifference(item.endDate)} Days
                                        </span>
                                    </div>
                                )}
                                <div className="flex flex-row items-center justify-between w-[90%] mt-2">
                                    <span className="text-[12px] font-bold text-black w-[50%]">Starting Date:</span>
                                    <span className="text-[12px] font-bold text-right text-[#347928] w-[50%]">
                                        {item?.startDate && formatDate(item.startDate)}
                                    </span>
                                </div>
                                <div className="flex flex-row items-center justify-between w-[90%] mt-2">
                                    <span className="text-[12px] font-bold text-black w-[50%]">Ending Date:</span>
                                    <span className="text-[12px] font-bold text-right text-[#347928] w-[50%]">
                                        {item?.endDate && formatDate(item.endDate)}
                                    </span>
                                </div>
                                <div className="flex flex-row items-center justify-between w-[90%] mt-2">
                                    <span className="text-[12px] font-bold text-black w-[50%]">Status:</span>
                                    <span className="text-[12px] font-bold text-right text-[#347928] w-[50%]">
                                        {item?.status}
                                    </span>
                                </div>
                                {/* {<div className="flex flex-row items-center justify-between w-[90%] mt-2">
                                    <span className="text-[12px] font-medium text-[#347928] w-full">{item.planId === '1' ? peopleInvested.plan1 : item.planId === '2' ? peopleInvested.plan2 : item.planId === '3' ? peopleInvested.plan3 : ''} people invested</span>
                                </div>} */}
                                {item?.status === 'pending' && (
                                    <span className="px-2 py-1 border-[1.5px] border-[#347928] rounded-md text-[12px] text-[#347928] self-start ml-[5%] mt-2">
                                        Pending
                                    </span>
                                )}
                                {item?.status === 'ready' && (
                                    <button
                                        onClick={() => handleClaim(item._id)}
                                        className="px-2 py-1 bg-[#347928] rounded-md text-[12px] text-white self-end ml-[5%] mt-2"
                                    >
                                        Claim
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );

}