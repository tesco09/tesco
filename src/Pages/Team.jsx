import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../Assets/Data";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Team() {

    const navigate = useNavigate();
    const [userData, setUserData] = React.useState({});
    const [detail, setDetail] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    const fetchUserData = async () => {
        const id = localStorage.getItem('id');
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/register/${id}`);
            const detailResponse = await fetch(`${BaseUrl}/details/${id}`);
            const detailJson = await detailResponse.json();
            setDetail(detailJson);
            const json = await response.json();
            if (response.ok) {
                setUserData(json);
            } else {
                console.error('Error fetching user data:', json.message);
            }
        } catch (e) {
            console.log('error fetching user data', e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        alert(`${text} copied to clipboard!`);
    };

    return (
        <>
            {loading ? <LoadingSpinner /> : <div className="flex flex-col items-center mt-4 w-full pb-[20%]">
                {/* <div className='flex flex-row items-center justify-between mb-4 w-[70%] mt-4'>
                    <div onClick={() => navigate('/my-team')} className="flex flex-col items-center p-2 border shadow-md rounded-xl w-[45%]">
                        <span className='text-[#347928] text-[12px] font-medium'>Team Member</span>
                        <h3 className='text-black font-medium text-[12px] pt-1'>{detail?.totalMembers}</h3>
                    </div>
                    <div className="flex flex-col items-center p-2 border shadow-md rounded-xl w-[45%]">
                        <span className='text-[#347928] text-[12px] font-medium'>Team Sale</span>
                        <h3 className='text-black font-medium text-[12px] pt-1'>Rs. {detail?.totalTeamCommission}</h3>
                    </div>
                </div> */}
                <img src={require('../Assets/image/invite.png')} alt="Invite" className="h-[100px] w-[100px] mt-[10%]"/>
                <h4 className="font-[Bold] text-black mt-4">Invite Your Friends</h4>
                <p className="w-[90%] text-gray-500 text-[14px] text-center font-[SemiBold] leading-[16px]">Invite your friends with your Invitaion code and Earn Upto 3 levels</p>
                {/* <p className="w-[80%] text-[16px] text-center text-[#347928] text-bold mt-4">ہر براہ راست اور ٹیم سرمایہ کاری پر کارکردگی پر مبنی سرمایہ کاری اور سود کے انعامات، تین سطحی کمیشن کے ڈھانچے میں دعوتی بونس کے ساتھ۔</p> */}
            {/* <span className="font-bold text-[#347928] mt-3">Invitaion Code</span>
            <h2 className="font-[bold] text-[#347928]  mt-1">{userData?.generatedId}</h2> */}
            <div className="flex flex-row items-center justify-between w-[90%]">
                <span className='text-[14px] text-gray-500 font-medium p-[3px] line-clamp-2 w-[80%]'>https://tesco-rho.vercel.app/signup/{userData?.generatedId}</span>
                <button className="w-[20%] text-center bg-gray-100 p-[4px] border-[1.5px] text-gray-500  rounded-full text-[12px] font-bold" onClick={() => handleCopy(`https://tesco-rho.vercel.app/signup/${userData?.generatedId}`)}>
                    {/* <FontAwesomeIcon icon={faCopy} className='text-white text-[14px]' /> */}
                    Copy
                </button>
            </div>
            <h6 className="font-bold text-red-500 mt-2">Instructions</h6>
                <p className="w-[80%] text-[12px] text-center text-red-500 font-bold mt-0">The Tesco Company provide you with a commission of up to three levels according to your members' plan.</p>
             <h2 className="font-bold text-[#347928] mt-4 text-[16px] w-[90%]">Investment Commissions</h2>
            <div class="overflow-x-auto w-[90%]">
                <table class="table-auto border-collapse border border-gray-300 w-full text-center">
                    <thead class="bg-[#347928] text-white text-[12px]">
                        <tr>
                            <th class="border border-gray-300 px-4 py-1">Level</th>
                            <th class="border border-gray-300 px-4 py-1">Team Investment Bonus</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-gray-100 hover:bg-gray-200 text-[12px]">
                            <td class="border border-gray-300 px-4 py-1">Level 01</td>
                            <td class="border border-gray-300 px-4 py-1">8%</td>
                        </tr>
                        <tr class="hover:bg-gray-200 text-[12px]">
                            <td class="border border-gray-300 px-4 py-1">Level 02</td>
                            <td class="border border-gray-300 px-4 py-1">3.5%</td>
                        </tr>
                        <tr class="bg-gray-100 hover:bg-gray-200 text-[12px]">
                            <td class="border border-gray-300 px-4 py-1">Level 03</td>
                            <td class="border border-gray-300 px-4 py-1">1.5%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* <h2 className="font-bold text-[#347928] mt-4 text-[16px] w-[90%]">Team Interest Commissions</h2> */}
            {/* <div class="overflow-x-auto w-[90%]">
                <table class="table-auto border-collapse border border-gray-300 w-full text-center">
                    <thead class="bg-[#347928] text-white text-[12px]">
                        <tr>
                            <th class="border border-gray-300 px-4 py-1">Level</th>
                            <th class="border border-gray-300 px-4 py-1">Team Interest Bonus</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-gray-100 hover:bg-gray-200 text-[12px]">
                            <td class="border border-gray-300 px-4 py-1">Level 01</td>
                            <td class="border border-gray-300 px-4 py-1">10%</td>
                        </tr>
                        <tr class="hover:bg-gray-200 text-[12px]">
                            <td class="border border-gray-300 px-4 py-1">Level 02</td>
                            <td class="border border-gray-300 px-4 py-1">5%</td>
                        </tr>
                        <tr class="bg-gray-100 hover:bg-gray-200 text-[12px]">
                            <td class="border border-gray-300 px-4 py-1">Level 03</td>
                            <td class="border border-gray-300 px-4 py-1">3%</td>
                        </tr>
                    </tbody>
                </table>
            </div> */}
        </div >}
        </>
    );
}