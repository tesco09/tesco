import React, { useEffect, useState } from "react";
import { BaseUrl, fetchData } from "../Assets/Data";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";

const TotalUsers = () => {

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/register`);
            const json = await response.json();
            console.log('data:', json);
            setUsers(json);
        } catch (e) {
            console.log('error fetching data...', e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);


    return (
        <>
            {loading ? <LoadingSpinner /> :
                <div className="dashboard md:w-[80%] md:ml-[20%]">
                    <h2 className="text-2xl font-semibold mb-4">User Management</h2>
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-3 border-b">Name</th>
                                <th className="p-3 border-b">Email</th>
                                <th className="p-3 border-b">Joined Date</th>
                                <th className="p-3 border-b">Balance</th>
                                <th className="p-3 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-4 text-center text-gray-500">
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 transition">
                                        <td className="p-3 border-b">{user.name}</td>
                                        <td className="p-3 border-b">{user.email}</td>
                                        <td className="p-3 border-b">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-3 border-b">${user.balance.toFixed(2)}</td>
                                        <td className="p-3 border-b">
                                            <button
                                                onClick={() => { navigate(`/user-detail/${user._id}`) }}
                                                className={`bg-blue-500 text-white px-3 py-1 rounded hover:bg-red-600 transition border`}>
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>}
        </>
    );
};

export default TotalUsers;
