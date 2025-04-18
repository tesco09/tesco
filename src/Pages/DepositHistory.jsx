import React, { useEffect } from "react";
import { BaseUrl, formatDate } from "../Assets/Data";
import LoadingSpinner from "../components/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


export default function DepositHistory() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }



    const [loading, setLoading] = React.useState(false);
    const [depositHistory, setDepositHistory] = React.useState([]);
    const [bankInfo, setBankInfo] = React.useState([]);
    const id = localStorage.getItem('id');

    const fetchDepositHistory = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/deposit-history/${id}`);
            const bankResponse = await fetch(`${BaseUrl}/bank/${id}`);
            const json = await response.json();
            const bankJson = await bankResponse.json();
            setBankInfo(bankJson);
            console.log('Deposit history:', json);
            setDepositHistory(json);
        } catch (e) {
            console.log('error fetching deposit history', e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDepositHistory();
    }, []);

    return (
        <div className="flex flex-col items-center h-screen w-full ">
            <div className="flex flex-row items-center w-[90%] sticky top-0 py-2 bg-white">
                <button onClick={goBack}>
                    <FontAwesomeIcon icon={faChevronLeft} className="text-black text-sm" />
                </button>
                <span className="text-[16px] font-semibold ml-2 w-[80%] line-clamp-1">Deposit Record</span>
            </div>
            <div className="w-full flex flex-col items-center mt-[5%]">
                <div className="flex flex-col items-center w-[90%]">
                    {loading ? (
                        <LoadingSpinner />
                    ) : depositHistory.length === 0 ? (
                        <p className="text-xl font-semibold text-[#347928] mt-[50%]">No deposit found.</p>
                    ) : (
                        depositHistory.map((item, index) => (
                            < div key={index} className="flex flex-col items-center w-full p-2 py-4 border-b last:border-b-0 border shadow-sm rounded-md" >
                                <div className="flex flex-row items-center justify-between w-full px-2">
                                    <span className="text-xs text-black font-medium w-[50%]">Deposit Amount: </span>
                                    <span className="text-xs text-[#347928] font-bold w-[50%] text-right">{item.amount}</span>
                                </div>
                                <div className="flex flex-row items-center justify-between w-full px-2 mt-2">
                                    <span className="text-xs text-black font-medium w-[50%]">Bank Name: </span>
                                    <span className="text-xs text-[#347928] font-bold w-[50%] text-right">{bankInfo.bankName}</span>
                                </div>
                                <div className="flex flex-row items-center justify-between w-full px-2 mt-2">
                                    <span className="text-xs text-black font-medium w-[50%]">Account Holder: </span>
                                    <span className="text-xs text-[#347928] font-bold w-[50%] text-right">{bankInfo.accountName}</span>
                                </div>
                                <div className="flex flex-row items-center justify-between w-full px-2 mt-2">
                                    <span className="text-xs text-black font-medium w-[50%]">Account Number: </span>
                                    <span className="text-xs text-[#347928] font-bold w-[50%] text-right">{bankInfo.accountNumber}</span>
                                </div>
                                <div className="flex flex-row items-center justify-between w-full px-2 mt-2">
                                    <span className="text-xs text-black font-medium w-[50%]">Status: </span>
                                    <span className="text-xs text-[#347928] font-bold w-[50%] text-right">{item.status}</span>
                                </div>
                                <div className="flex flex-row items-center justify-between w-full px-2 mt-2">
                                    <span className="text-xs text-black font-medium w-[50%]">Date: </span>
                                    <span className="text-xs text-[#347928] font-bold w-[50%] text-right">{item.timestamp && formatDate(item.timestamp)}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div >
    );
}