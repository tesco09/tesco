import React, { useEffect, useState } from "react";
import { BaseUrl } from "../Assets/Data";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";

const UnverifiedUsers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchUserData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/register`);
            const json = await response.json();
            const banUser = json.filter((item) => item.ban);
            setUsers(banUser);
            setFilteredUsers(banUser); // Initialize filteredUsers
        } catch (e) {
            console.log("error fetching data...", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = users.filter(
            (user) =>
                user.name.toLowerCase().includes(term) ||
                user.email.toLowerCase().includes(term)
        );
        setFilteredUsers(filtered);
    };

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="dashboard md:w-[80%] md:ml-[20%]">
                    <h2 className="text-2xl font-semibold mb-4">User Management</h2>

                    {/* Search Input */}
                    <div className="mb-4">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearch}
                            placeholder="Search by name or email"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Desktop View */}
                    <div className="hidden sm:block">
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
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="p-4 text-center text-gray-500"
                                        >
                                            No users found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user, idx) => (
                                        <tr
                                            key={idx}
                                            className="hover:bg-gray-50 transition"
                                        >
                                            <td className="p-3 border-b">
                                                {user.name}
                                            </td>
                                            <td className="p-3 border-b">
                                                {user.email}
                                            </td>
                                            <td className="p-3 border-b">
                                                {new Date(
                                                    user.createdAt
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className="p-3 border-b">
                                                Pkr {user.balance.toFixed(2)}
                                            </td>
                                            <td className="p-3 border-b">
                                                <button
                                                    onClick={() => {
                                                        navigate(
                                                            `/user-detail/${user._id}`
                                                        );
                                                    }}
                                                    className={`bg-blue-500 text-white px-3 py-1 rounded hover:bg-red-600 transition border`}
                                                >
                                                    Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile View */}
                    <div className="block sm:hidden">
                        {filteredUsers.length === 0 ? (
                            <p className="text-center text-gray-500">
                                No users found.
                            </p>
                        ) : (
                            filteredUsers.map((user, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white border border-gray-200 rounded-lg shadow-md p-4 mb-4"
                                >
                                    <p className="text-sm font-medium">
                                        <strong>Name:</strong> {user.name}
                                    </p>
                                    <p className="text-sm font-medium">
                                        <strong>Email:</strong> {user.email}
                                    </p>
                                    <p className="text-sm font-medium">
                                        <strong>Joined Date:</strong>{" "}
                                        {new Date(
                                            user.createdAt
                                        ).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm font-medium">
                                        <strong>Balance:</strong> Pkr {user.balance.toFixed(2)}
                                    </p>
                                    <button
                                        onClick={() => {
                                            navigate(
                                                `/user-detail/${user._id}`
                                            );
                                        }}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition mt-2"
                                    >
                                        Details
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default UnverifiedUsers;