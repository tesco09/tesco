import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl, formatDate, timeAgo } from "../Assets/Data";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Transactions() {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("Transactions");
    const [selectedDate, setSelectedDate] = useState("");

    const fetchData = async () => {
        const id = localStorage.getItem("id");
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/notifications/receiver/${id}`);
            const responseDeposit = await fetch(`${BaseUrl}/deposit-history/${id}`);
            const responseWithdraw = await fetch(`${BaseUrl}/withdraw-history/${id}`);
            const json = await response.json();
            const jsonDeposit = await responseDeposit.json();
            const jsonWithdraw = await responseWithdraw.json();

            if (response.ok) {
                setNotifications({
                    Transactions: json,
                    Deposits: jsonDeposit,
                    Withdraw: jsonWithdraw,
                });
                setFilteredData(json); // Default to Transactions
            } else {
                console.error("Error fetching notifications:", json.message);
            }
        } catch (e) {
            console.log("Error fetching notifications", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);
        setFilteredData(notifications[selectedCategory] || []);
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setSelectedDate(selectedDate);

        if (selectedDate) {
            const filtered = notifications[category]?.filter((item) =>
                item.timestamp?.startsWith(selectedDate)
            );
            setFilteredData(filtered || []);
        } else {
            setFilteredData(notifications[category] || []);
        }
    };

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="flex flex-col items-center w-full pb-4">
                    {/* Dropdowns for filtering */}
                    <div className="flex flex-row items-center justify-between w-[90%] mt-[10%] pb-2">
                        {/* Category Dropdown */}
                        <select
                            value={category}
                            onChange={handleCategoryChange}
                            className="p-2 border rounded-md text-black w-[48%]"
                        >
                            <option value="Transactions">Transactions</option>
                            <option value="Deposits">Deposits</option>
                            <option value="Withdraw">Withdraw</option>
                        </select>

                        {/* Date Dropdown */}
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            className="p-2 border rounded-md text-black w-[48%]"
                        />
                    </div>

                    {/* Filtered Data */}
                    {filteredData?.length > 0 && category === 'Transactions' ? (
                        filteredData.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center w-[90%] shadow-md border bg-white rounded-md mt-2 p-2"
                            >
                                <span className="text-black text-[14px] font-bold w-full">
                                    {item?.heading || "No Heading"}
                                </span>
                                <span className="text-black text-[12px] font-regular w-full">
                                    {item?.subHeading || "No Subheading"}
                                </span>
                                <span className="text-black text-[10px] font-regular w-full text-right">
                                    {item.timestamp && timeAgo(item.timestamp)}
                                </span>
                            </div>
                        ))
                    ) : filteredData.length > 0 && category !== 'Transactions' ?
                        filteredData.map((item, index) => (
                            <div
                                onClick={() => navigate(`/transaction-detail/${item?.type}/${item?.requestId}`)}
                                key={index}
                                className="flex flex-row items-center w-[90%] shadow-md border bg-white rounded-md mt-2 p-2"
                            >
                                <div className="flex flex-col items-center justify-between w-[90%]">
                                    <span className="text-black text-[14px] font-bold w-full">
                                        {item?.type || "No Heading"}
                                    </span>
                                    <span className="text-black text-[10px] font-regular w-full mt-2">
                                        {item.timestamp && formatDate(item.timestamp)}
                                    </span>
                                </div>
                                <div className="w-[10%] flex flex-col items-center justify-center">
                                    <FontAwesomeIcon icon={faChevronRight} className="text-sm text-gray-500" />
                                </div>
                            </div>
                        )) : (
                            <span className="text-gray-500 text-[14px] mt-4">
                                No data available for the selected filters.
                            </span>
                        )}
                </div>
            )}
        </>
    );
}