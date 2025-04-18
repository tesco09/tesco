import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { BaseUrl } from "../Assets/Data";
import LoadingSpinner from "./LoadingSpinner";

const PrivateRoute = () => {
    const isAuthenticated = !!localStorage.getItem("id");
    const [isBan, setIsBan] = useState(null); // null = loading, true/false = loaded
    const [loading, setLoading] = useState(true);

    const fetchUserData = async () => {
        try {
            const id = localStorage.getItem("id");
            const response = await fetch(`${BaseUrl}/register/${id}`);
            const data = await response.json();
            setIsBan(data.ban);
            console.log("User data:", data.ban);
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserData();
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (isBan) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
