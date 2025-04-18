import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Splash() {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // Store id only if it's not already in localStorage
            if (localStorage.getItem("id") !== id) {
                localStorage.setItem("id", id);
            }

            const timer = setTimeout(() => {
                localStorage.removeItem('reloaded');
                navigate("/"); // Redirect to home page after 2 seconds
            }, 2000);

            return () => clearTimeout(timer); // Cleanup the timeout if component unmounts or id changes
        }
    }, [id, navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full">
            <span>Loading...</span>
        </div>
    );
}
