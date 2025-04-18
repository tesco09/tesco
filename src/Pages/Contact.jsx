import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {

    const navigate = useNavigate();
    const goBack = ()=> {
        navigate(-1);
    }

    return (
        <div className="flex flex-col items-center mt-2 w-full pb-[20%]">
            <div className="flex flex-row items-center w-[90%]">
                <div onClick={goBack} className="flex flex-col items-center h-[15px] w-[15px]">
                    <FontAwesomeIcon icon={faClose} className="h-[15px] w-[15px]" />
                </div>
                <span className="text-[#347928] text-[14px] font-medium ml-2">Tesco Contact Customer Support</span>
            </div>
            <img
                src={require('../Assets/image/contact.png')}
                alt="Contact"
                className="h-[150px] w-[150px] mt-[15%] rounded-md"
            />
            <h4 className="font-[Bold] text-black mt-4">Contact Us</h4>
            <p className="w-[90%] text-gray-500 text-[14px] text-center font-[SemiBold] leading-[16px]">
                If you have any questions or need assistance, feel free to reach out to
                us.
            </p>
            <button type="button" className="flex flex-row items-center w-[90%] h-[50px] rounded-md border-[2px] border-[#347928] mt-4">
                <div className="w-[20%] flex flex-col items-center">
                    <img src={require('../Assets/image/whatsapp.png')} className="h-[30px] w-[30px]" />
                </div>
                <span className="text-[#347928] text-[14px] font-medium ml-2 w-[80%] text-left">Chat with us on WhatsApp</span>
            </button>
            <button type="button" className="flex flex-row items-center justify-center w-[90%] h-[50px] rounded-md bg-[#347928] mt-2">
                <div className="flex flex-col items-center">
                    <img src={require('../Assets/image/support.png')} className="h-[30px] w-[30px]" />
                </div>
                <span className="text-white text-[14px] font-medium ml-2 text-center">Chat with us</span>
            </button>
        </div>
    );
}