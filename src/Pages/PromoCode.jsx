import React from "react";
import { BaseUrl, fetchData } from "../Assets/Data";
import LoadingSpinner from "../components/LoadingSpinner";

export default function PromoCode() {

    const [code, setCode] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleChange = (e) => {
        setCode(e.target.value);
    };

    const createPromo = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/promo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: 10  // Replace with dynamic value if needed
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Promo created successfully:', data);
                alert('Promo created successfully!');
            } else {
                console.error('Failed to create promo:', data.message);
                alert('Failed to create promo: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const claimPromo = async () => {
        setLoading(true);
        const userId = localStorage.getItem('id');
        const data = await fetchData();
        const name = await data.name; // Replace with actual user name

        try {
            const response = await fetch(`${BaseUrl}/promo/claim/${code}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId,
                    name
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Promo claimed:', data);
                alert('Promo Claimed');
                // You can update UI or show success message
            } else {
                console.error('Claim failed:', data.message);
                alert('Claim failed: ' + data.message);
                // Show error message to user
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const [todayClaims, setTodayClaims] = React.useState([]);
    const [loadingClaims, setLoadingClaims] = React.useState(false);

    const fetchTodayClaims = async () => {
        try {
            setLoadingClaims(true);
            const response = await fetch(`${BaseUrl}/promo/today-claim`);
            const data = await response.json();

            if (response.ok) {
                setTodayClaims(data);
            } else {
                console.error('Failed to fetch today\'s claims:', data.message);
                alert('Failed to fetch today\'s claims: ' + data.message);
            }
        } catch (error) {
            console.error('Error fetching today\'s claims:', error);
            alert('Error fetching today\'s claims.');
        } finally {
            setLoadingClaims(false);
        }
    };

    React.useEffect(() => {
        fetchTodayClaims();
    }, []);

    return (
        <div className="w-full h-screen flex flex-col items-center mt-[30%]">
            {loading ? <LoadingSpinner /> : <div className="flex flex-col justify-center items-center bg-white shadow-md rounded-lg p-4 w-[90%] md:w-[50%] lg:w-[30%]">
                <h1 className="text-[20px] font-bold text-center">You are a Regular User.</h1>
                <label className="text-[12px] font-medium text-left text-gray-500 w-full">Enter Promo Code</label>
                <input type="text" value={code} onChange={handleChange} placeholder="Enter promo code" className="border border-gray-300 rounded-md p-2 w-full mt-1" />
                <button onClick={claimPromo} className="bg-[#347928] text-white rounded-md p-2 py-1 mt-2 w-full">Claim Promo Code</button>
            </div>}
            <div className="flex flex-col w-full mt-8 items-center">
                <h2 className="text-[18px] font-bold text-center mb-4">Today's Promo Claims</h2>
                {loadingClaims ? (
                    <LoadingSpinner />
                ) : todayClaims.length === 0 ? (
                    <p className="text-gray-500 text-center">No claims found for today.</p>
                ) : (
                    <div className="flex flex-col items-center w-[90%]">
                        <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
                            <thead>
                                <tr className="text-center text-[12px] text-white bg-[#347928]">
                                    <th className="p-1 border-b">Win Amount</th>
                                    <th className="p-1 border-b">Claimed By</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todayClaims?.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 transition">
                                        <td className="p-1 border text-center">${item.amount}</td>
                                        <td className="p-1 border text-center">{item.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}