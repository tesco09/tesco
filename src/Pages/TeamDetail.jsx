import React, { useEffect, useState } from "react";
import { BaseUrl } from "../Assets/Data";
import LoadingSpinner from "../components/LoadingSpinner";

export default function TeamDetail() {

    const [loading, setLoading] = useState(false);
    const [teamData, setTeamData] = useState([]);
    const id = localStorage.getItem('id');

    const fetchTeamData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/details/${id}`);
            const json = await response.json();
            console.log('team data:', json);
            setTeamData(json);
        } catch (e) {
            console.log('error fetching team data...');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTeamData();
    }, []);

    return (
        <>
            {loading ? <LoadingSpinner /> : <div className="flex flex-col items-center w-full pb-[20%]">
                <h6 className="mt-4 pt-4 pb-2 text-[#347928]">Team & Commission Detail</h6>
                <div className="flex flex-col items-center w-[90%] p-2 border rounded-md shadow-sm">
                    <span className="text-sm text-[#347928] font-bold">{teamData?.totalTeamDeposit}</span>
                    <span className="text-xs text-black font-medium">Total Team Deposit</span>
                </div>
                <div className="flex flex-col items-center w-[90%] p-2 border rounded-md shadow-sm mt-2">
                    <span className="text-sm text-[#347928] font-bold">{teamData?.totalTeamCommission}</span>
                    <span className="text-xs text-black font-medium">Total Team Commission</span>
                </div>
                <div className="flex flex-col items-center w-[90%] p-2 border rounded-md  shadow-sm mt-2">
                    <span className="text-sm text-[#347928] font-bold">{teamData?.totalMembers}</span>
                    <span className="text-xs text-black font-medium">Total Team Members</span>
                </div>
                <div className="flex flex-col items-center w-[90%] p-2 border rounded-md shadow-sm  mt-2">
                    <span className="text-sm text-[#347928] font-bold">{teamData?.level1Commission}</span>
                    <span className="text-xs text-black font-medium">Level 01 Commission</span>
                </div><div className="flex flex-col items-center w-[90%] p-2 border rounded-md  shadow-sm mt-2">
                    <span className="text-sm text-[#347928] font-bold">{teamData?.level2Commission}</span>
                    <span className="text-xs text-black font-medium">Level 02 Commission</span>
                </div><div className="flex flex-col items-center w-[90%] p-2 border rounded-md  shadow-sm mt-2">
                    <span className="text-sm text-[#347928] font-bold">{teamData?.level3Commission}</span>
                    <span className="text-xs text-black font-medium">Level 03 Commission</span>
                </div>
            </div>}
        </>
    )
}