import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { data, useNavigate, useParams } from "react-router-dom";
import { addThirtyDays, BaseUrl, investmentOffers } from "../Assets/Data";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Invest() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [pkr, setPkr] = useState(0);
    const [select, setSelect] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        const data = investmentOffers.find((item) => item.id === parseFloat(id));
        console.log(data,);
        setSelect(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const goBack = () => {
        navigate(-1);
    }

    const handlePkrChange = (e) => {
        const { value } = e.target;
        setPkr(value);
    }

    const handleSubmit = async () => {
        setLoading(true);
        const id = localStorage.getItem('id');
        const date = new Date();
        const endDate = await addThirtyDays(date, select.days);
        try {
            const response = await fetch(`${BaseUrl}/addPlan/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    planId: select.id,
                    investment: select.amount,
                    days: select.days,
                    dailyProfit: select.profit,
                    endDate: endDate,
                })
            });

            if (response.ok) {
                navigate('/invest-success');
            } else {
                alert('error buying plan');
            }
        } catch (e) {
            console.log('error buying plan');
            alert('error buying plan');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex flex-row items-center w-[90%]">
                <button onClick={goBack}>
                    <FontAwesomeIcon icon={faChevronLeft} className="text-black text-sm" />
                </button>
                <span className="text-[16px] font-semibold ml-2 w-[80%] line-clamp-1">{select?.name}</span>
            </div>
            <img src={select?.image} alt="preview" className="w-[200px] h-[200px] border mt-[5%]"/>
            <h3 className='text-[#347928] font-bold text-[24px] mt-[10%]'>PKR {select?.amount}</h3>
            <label className="text-[14px] text-gray-500 font-medium mt-0">Amount</label>
            <p className="p-2 h-[40px] w-[100px] border-[1.5px] border-[#5D8736] rounded-md bg-white mt-1 text-[12px] font-bold text-center">{select?.amount}</p>
            <span className='text-black font-bold text-[12px] mt-4 w-[90%]'>Daily Profit: <span className="font-normal">= {select?.profit}</span></span>
            <span className='text-black font-bold text-[12px] mt-2 w-[90%]'>Total Profit: <span className="font-normal">= {select?.profit * select?.days}</span></span>
            <span className='text-black font-bold text-[12px] mt-2 w-[90%]'>Total Return: <span className="font-normal">= {select?.profit * select?.days}</span></span>
            {!loading ? <button onClick={handleSubmit} className="bg-gradient-to-r from-[#5D8736] to-[#809D3C] text-white px-4 py-2 border-none rounded text-[16px] cursor-pointer transition duration-300 ease-in-out w-[90%] mt-[10%]">
                Invest
            </button> : <LoadingSpinner />}
        </div>
    )
}