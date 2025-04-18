import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl, formatDate, timeAgo } from "../Assets/Data";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Notification() {

    const navigate = useNavigate();
    const [notifications, setnotifications] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const fetchData = async () => {
        const id = localStorage.getItem('id');
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/notifications/receiver/${id}`);
            const json = await response.json();
            if (response.ok) {
                setnotifications(json);
            } else {
                console.error('Error fetching notifications:', json.message);
            }
        } catch (e) {
            console.log('error fetching notifications', e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const goBack = () => {
        navigate(-1);
    }

    const updateNotification = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/notifications/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    seen: true,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('User updated successfully:', data);
                fetchData();
            } else {
                console.error('Error updating user:', data.message);
            }
        } catch (error) {
            console.error('Request failed:', error.message);
        } finally {
            setLoading(false);
        }
    };


    const allSeen = async () => {
        try {
            setLoading(true);
            const receiverId = localStorage.getItem('id');
            const response = await fetch(`${BaseUrl}/notifications/all-seen/${receiverId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    seen: true,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('User updated successfully:', data);
                fetchData();
            } else {
                console.error('Error updating user:', data.message);
            }
        } catch (error) {
            console.error('Request failed:', error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            {loading ? <LoadingSpinner /> : <div className="flex flex-col items-center w-full">
                <div className="flex flex-row items-center w-[90%] bg-white">
                    <button onClick={goBack}>
                        <FontAwesomeIcon icon={faChevronLeft} className="text-black text-sm" />
                    </button>
                    <span className="text-[16px] font-semibold ml-2 w-[80%] line-clamp-1 text-center">Notifications</span>
                </div>
                <button type="button" onClick={allSeen} className="text-black text-[14px] font-medium w-[90%] text-right underline">All Seen</button>
                {notifications.filter((item) => item.seen === false).length === 0 ? (
                    <div className="w-[90%] text-center text-gray-500 mt-[50%]">
                        No new notifications
                    </div>
                ) : (
                    notifications
                        .filter((item) => item.seen === false)
                        .map((item) => (
                            <div
                                key={item._id}
                                onClick={() => updateNotification(item._id)}
                                className="flex flex-col items-center w-[90%] border bg-white rounded-md mt-2 p-2 shadow-md"
                            >
                                <span className="text-black text-[14px] font-bold w-full">
                                    {item?.heading}
                                </span>
                                <span className="text-black text-[12px] font-regular w-full">
                                    {item?.subHeading}
                                </span>
                                <span className="text-black text-[10px] font-regular w-full text-right">
                                    {item.timestamp && timeAgo(item.timestamp)}
                                </span>
                            </div>
                        ))
                )}
            </div>}
        </>
    )
}