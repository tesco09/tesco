import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Detail() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex flex-row items-center w-[90%]">
                <button onClick={goBack}>
                    <FontAwesomeIcon icon={faChevronLeft} className="text-black text-sm" />
                </button>
                <span className="text-[16px] font-semibold ml-2 w-[80%] line-clamp-1">Selected Plan</span>
            </div>
            <span className="text-[12px] font-bold ml-2 w-[90%] mt-4">Description:</span>
            <span className="text-[12px] font-normal ml-2 w-[90%] mt-2">Lorem ipsum, placeholder or dummy text used in typesetting and graphic design for previewing layouts. It features scrambled Latin text, which emphasizes the design over content of the layout. It is the standard placeholder text of the printing and publishing industries.</span>
            <span className="text-[12px] font-bold ml-2 w-[90%] mt-2">Company Information:</span>
            <div className="flex flex-row items-center justify-between w-[90%]">
                <span className="text-[12px] font-bold ml-2 w-[50%] mt-4 text-[#347928]">Company Name</span>
                <span className="text-[12px] font-bold ml-2 w-[50%] mt-4 text-right text-[#347928]">Company ID</span>
            </div>
            <div className="flex flex-row items-center justify-between w-[90%] mt-1">
                <span className="text-[12px] font-medium ml-2 w-[50%] text-black">Lorem ipsum ltd.</span>
                <span className="text-[12px] font-medium ml-2 w-[50%] text-right text-black">64321</span>
            </div>
            <div className="flex flex-row items-center justify-between w-[90%]">
                <span className="text-[12px] font-bold ml-2 w-[50%] mt-4 text-[#347928]">Location</span>
                <span className="text-[12px] font-bold ml-2 w-[50%] mt-4 text-right text-[#347928]">Annual Turnover</span>
            </div>
            <div className="flex flex-row items-center justify-between w-[90%] mt-1">
                <span className="text-[12px] font-medium ml-2 w-[50%] text-black">Lahore</span>
                <span className="text-[12px] font-medium ml-2 w-[50%] text-right text-black">800 Million</span>
            </div>
            <div className="flex flex-row items-center justify-between w-[90%]">
                <span className="text-[12px] font-bold ml-2 w-[50%] mt-4 text-[#347928]">Working From</span>
                <span className="text-[12px] font-bold ml-2 w-[50%] mt-4 text-right text-[#347928]">Own By</span>
            </div>
            <div className="flex flex-row items-center justify-between w-[90%] mt-1">
                <span className="text-[12px] font-medium ml-2 w-[50%] text-black">1988</span>
                <span className="text-[12px] font-medium ml-2 w-[50%] text-right text-black">John Doe</span>
            </div>
            <button onClick={()=>navigate('/invest')} className="bg-gradient-to-r from-[#5D8736] to-[#809D3C] text-white px-4 py-2 border-none rounded text-[16px] cursor-pointer transition duration-300 ease-in-out w-[90%] mt-4">
                Invest
            </button>
        </div>
    )
}