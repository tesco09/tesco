import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BaseUrl, formatDate } from "../Assets/Data";
import LoadingSpinner from "../components/LoadingSpinner";

export default function TransactionDetail() {

    const { id, type } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = React.useState(false);
    const [depositHistory, setDepositHistory] = React.useState({});
    const [withdrawHistory, setWithdrawHistory] = React.useState({});
    const [bankInfo, setBankInfo] = React.useState({});

    const fetchData = async () => {
        try {
            setLoading(true);
            const userId = localStorage.getItem('id');
            const response = type === 'deposit' ? await fetch(`${BaseUrl}/screenshot/${id}`) : await fetch(`${BaseUrl}/withdraw/${id}`);
            const bankResponse = await fetch(`${BaseUrl}/bank/${userId}`);
            const json = await response.json();
            const bankJson = await bankResponse.json();
            if (response.ok) {
                console.log(json);
                type === 'deposit' ? setDepositHistory(json) : setWithdrawHistory(json);
                setBankInfo(bankJson);
            } else {
                console.error('Error fetching transaction:', json.message);
            }
        } catch (e) {
            console.log('error fetching transaction', e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [id, type]);

    const goBack = () => {
        navigate(-1);
    }

    return (
        <>
            {loading ? <LoadingSpinner /> : <div className="flex flex-col items-center w-full">
                <div className="flex flex-row items-center w-[90%] sticky top-0 py-2 bg-white">
                    <button onClick={goBack}>
                        <FontAwesomeIcon icon={faChevronLeft} className="text-black text-sm" />
                    </button>
                    <span className="text-[16px] font-semibold ml-2 w-[80%] line-clamp-1">Transaction Detail</span>
                </div>
                {type === 'deposit' ? <div className="flex flex-col items-center w-[90%] p-2 py-4 border-b last:border-b-0 mt-2">
                    <div className="flex flex-row items-center justify-between w-full px-2 py-2">
                        <span className="text-xs text-black font-medium w-[50%]">Name: </span>
                        <span className="text-xs text-[#347928] font-bold w-[50%] text-right">{depositHistory.name}</span>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full px-2 py-2">
                        <span className="text-xs text-black font-medium w-[50%]">Bank: </span>
                        <span className="text-xs text-[#347928] font-bold w-[50%] text-right">{depositHistory.bank}</span>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full px-2 py-2">
                        <span className="text-xs text-black font-medium w-[50%]">Deposit Amount: </span>
                        <span className="text-xs text-[#347928] font-bold w-[50%] text-right">{depositHistory.amount}</span>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full px-2 py-2">
                        <span className="text-xs text-black font-medium w-[50%]">Status: </span>
                        <span className="text-xs text-[#347928] font-bold w-[50%] text-right">{depositHistory.verify ? 'Verify' : !depositHistory.verify && !depositHistory.scam ? 'Pending' : depositHistory.scam && 'Rejected'}</span>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full px-2 py-2">
                        <span className="text-xs text-black font-medium w-[50%]">Date: </span>
                        <span className="text-xs text-[#347928] font-bold w-[50%] text-right">{formatDate(depositHistory.createdAt) || ''}</span>
                    </div>
                    <img src={depositHistory?.image1} alt="Transaction Screenshot" className="w-full h-auto mt-4 rounded-md resize-cover" />
                </div> :
                    <div className="flex flex-col items-center w-[90%] p-2 py-4 border-b last:border-b-0 mt-2">
                        <div className="flex flex-row items-center justify-between w-full px-2 py-2">
                            <span className="text-xs text-black font-medium w-[50%]">Bank Name: </span>
                            <span className="text-xs text-[#347928] font-bold w-[50%] text-right">{bankInfo?.bankName}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between w-full px-2 py-2">
                            <span className="text-xs text-black font-medium w-[50%]">Name: </span>
                            <span className="text-xs text-[#347928] font-bold w-[50%] text-right">{bankInfo?.accountName}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between w-full px-2 py-2">
                            <span className="text-xs text-black font-medium w-[50%]">Account Number: </span>
                            <span className="text-xs text-[#347928] font-bold w-[50%] text-right">{bankInfo?.accountNumber}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between w-full px-2 py-2">
                            <span className="text-xs text-black font-medium w-[50%]">Withdraw Amount: </span>
                            <span className="text-xs text-[#347928] font-bold w-[50%] text-right">{withdrawHistory?.amount}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between w-full px-2 py-2">
                            <span className="text-xs text-black font-medium w-[50%]">Status: </span>
                            <span className="text-xs text-[#347928] font-bold w-[50%] text-right">{!withdrawHistory.pending ? 'Verify' : withdrawHistory.pending && !withdrawHistory.scam ? 'Pending' : withdrawHistory.scam && 'Rejected'}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between w-full px-2 py-2">
                            <span className="text-xs text-black font-medium w-[50%]">Date: </span>
                            <span className="text-xs text-[#347928] font-bold w-[50%] text-right">{formatDate(withdrawHistory.timestamp) || ''}</span>
                        </div>
                    </div>}
            </div>}
        </>
    )
}