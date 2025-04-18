import React from "react";

export default function WithdrawSuccess() {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-full">
            <img src={require('../Assets/image/withdraw.png')} className="w-[170px] h-[170px]" />
            <h2 className="text-[28px] font-bold text-[#347928] mt-[10%]">Congratulations!</h2>
            <p className="text-[18px] text-gray-500 mt-2 text-center w-[90%]">Your withdrawal will be recieved shortly. It can take up to 24 hours to show in your your account but most of the time it takes only a few seconds.</p>
            <a href="/home" className="mt-4 bg-[#347928] text-white px-4 py-2 rounded-md w-[90%] text-center no-underline">Go to Home</a>
        </div>
    );
}