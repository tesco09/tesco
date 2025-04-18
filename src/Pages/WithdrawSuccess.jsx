import React from "react";

export default function WithdrawSuccess() {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-full">
            <img src={require('../Assets/image/withdraw.png')} className="w-[200px] h-[200px]" />
            <h2 className="text-[28px] font-bold text-[#347928] mt-[10%]">Withdraw Success</h2>
            <p className="text-[18px] text-gray-500 mt-4 text-center">Your withdrawal request has been successfully submitted.</p>
            <a href="/home" className="mt-6 bg-[#347928] text-white px-4 py-2 rounded-md w-[90%] text-center no-underline">Go to Home</a>
        </div>
    );
}