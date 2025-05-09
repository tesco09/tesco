import React, { useEffect, useState } from "react";
import Modal from "../components/ModalShow";
import { BaseUrl } from "../Assets/Data";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import ToggleSwitch from "./ToggleSwitch";

function UserDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [detail, setDetail] = useState({});

  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePlans, setActivePlans] = useState([]); // State for active plans
  const [add, setAdd] = useState(null);
  const [deduct, setDeduct] = useState(null);
  const [selected, setSelected] = useState('Balance');

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalType(null);
    setIsModalOpen(false);
  };

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BaseUrl}/register/${id}`);
      const json = await response.json();
      const detailresponse = await fetch(`${BaseUrl}/details/${id}`);
      const detailjson = await detailresponse.json();
      const plansResponse = await fetch(`${BaseUrl}/myplan/${id}`);
      const plansJson = await plansResponse.json();
      setUser(json);
      setDetail(detailjson);
      setActivePlans(plansJson);
    } catch (e) {
      console.log('error fetching data...', e);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };


  const handleAddBalance = async () => {
    const amountToAdd = parseFloat(add);

    if (isNaN(amountToAdd) || amountToAdd <= 0) {
      alert("Please enter a valid positive amount to add.");
      return;
    }

    let newBalance = 0;
    if (selected === 'Balance') {
      newBalance = parseFloat(user.balance) + amountToAdd;
    } else if (selected === 'Deposit') {
      newBalance = parseFloat(user.deposit) + amountToAdd;
    }

    const data = selected === 'Balance' ? { balance: newBalance } : { deposit: newBalance };

    setLoading(true);
    try {
      const response = await fetch(`${BaseUrl}/register/${user?.email}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Balance added successfully!');
        fetchUserData(); // Refresh user data
      } else {
        const result = await response.json();
        throw new Error(result.message || 'Failed to add balance.');
      }
    } catch (error) {
      console.error('Error Adding Balance:', error);
      alert('Failed to add balance.');
    } finally {
      setLoading(false);
      closeModal();
    }
  };


  const handleDeductBalance = async () => {
    const amountToDeduct = parseFloat(deduct);

    if (isNaN(amountToDeduct) || amountToDeduct <= 0) {
      alert("Please enter a valid positive amount to deduct.");
      return;
    }

    let newBalance = 0;
    if (selected === 'Balance') {
      if (amountToDeduct > parseFloat(user.balance)) {
        alert("Insufficient balance to deduct.");
        return;
      }
      newBalance = parseFloat(user.balance) - amountToDeduct;
    } else if (selected === 'Deposit') {
      if (amountToDeduct > parseFloat(user.deposit)) {
        alert("Insufficient deposit to deduct.");
        return;
      }
      newBalance = parseFloat(user.deposit) - amountToDeduct;
    }

    const data = selected === 'Balance' ? { balance: newBalance } : { deposit: newBalance };

    setLoading(true);
    try {
      const response = await fetch(`${BaseUrl}/register/${user?.email}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Balance deducted successfully!');
        fetchUserData(); // Refresh user data
      } else {
        const result = await response.json();
        throw new Error(result.message || 'Failed to deduct balance.');
      }
    } catch (error) {
      console.error('Error Deducting Balance:', error);
      alert('Failed to deduct balance.');
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  const updateBan = async () => {
    try {
      let banData = true;
      if (user.ban === true) {
        banData = false;
      } else {
        banData = true;
      }
      const response = await fetch(`${BaseUrl}/register/${user.email}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ban: banData,
        }),
      });

      const json = await response.json();
      if (!response.ok) throw new Error(json.message);

      if (response.ok) {
        alert('status updated successfully!');
        setUser(prev => ({
          ...prev,
          ban: banData,
        }));
      }
    } catch (error) {
      console.error('Reset Password Error:', error);
      alert('Failed to update status');
    } finally {
      closeModal();
    }
  };

  const handleDeletePlan = async (id) => {
    const confirmed = window.confirm('Are you sure to delete plan');
    if (!confirmed) return;
    try {
      setLoading(true);
      const response = await fetch(`${BaseUrl}/myplan/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete plan');
      }

      const result = await response.json();
      console.log('msg:', result.message);
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      {loading ? <LoadingSpinner /> :
        <div className="flex flex-col items-center w-full md:w-[80%] md:ml-[20%] bg-gray-50 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">User Details</h1>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white p-6 rounded-lg shadow-md">
            <div className="border border-gray-300 p-2 rounded-md">
              <p className="text-lg font-semibold text-gray-700">Name:</p>
              <p className="text-gray-600">{user.name}</p>
            </div>
            <div className="border border-gray-300 p-2 rounded-md">
              <p className="text-lg font-semibold text-gray-700">Email:</p>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div className="border border-gray-300 p-2 rounded-md">
              <p className="text-lg font-semibold text-gray-700">Balance:</p>
              <p className="text-gray-600">Pkr {user.balance}</p>
            </div>
            <div className="border border-gray-300 p-2 rounded-md">
              <p className="text-lg font-semibold text-gray-700">Deposits:</p>
              <p className="text-gray-600">Pkr {user.deposit}</p>
            </div>
            <div className="border border-gray-300 p-2 rounded-md">
              <p className="text-lg font-semibold text-gray-700">Withdrawals:</p>
              <p className="text-gray-600">Pkr {user.totalWithdraw}</p>
            </div>
            {/* <div className="border border-gray-300 p-2 rounded-md">
              <p className="text-lg font-semibold text-gray-700">Transactions:</p>
              <p className="text-gray-600">{user.transactions}</p>
            </div> */}
            <div className="border border-gray-300 p-2 rounded-md">
              <p className="text-lg font-semibold text-gray-700">Total Invest:</p>
              <p className="text-gray-600">Pkr {user.totalInvest}</p>
            </div>
            <div className="border border-gray-300 p-2 rounded-md">
              <p className="text-lg font-semibold text-gray-700">Total Referral Commission:</p>
              <p className="text-gray-600">Pkr {detail.totalTeamCommission}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={() => openModal("addBalance")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md transition duration-300"
            >
              Add Balance
            </button>
            <button
              onClick={() => openModal("deductBalance")}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md shadow-md transition duration-300"
            >
              Deduct Balance
            </button>
            <button
              onClick={() => { window.open(`https://www.tesco-network.com/splash/${id}`) }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md shadow-md transition duration-300"
            >
              Login
            </button>
            <button
              onClick={() => openModal("banUser")}
              className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-md shadow-md transition duration-300"
            >
              {user.ban ? 'Unban User' : 'Ban User'}
            </button>
          </div>

          <div className="w-full mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Active Plans</h2>
            {activePlans.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activePlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="border border-gray-300 p-4 rounded-md shadow-md flex flex-col items-center"
                  >
                    {/* <img
                      src={plan.image}
                      alt={plan.name}
                      className="w-24 h-24 object-cover rounded-md mb-4"
                    /> */}
                    <p className="text-lg font-semibold text-gray-700">
                      {plan.name}
                    </p>
                    <p className="text-gray-600">Amount: Pkr {plan.investment}</p>
                    <p className="text-gray-600">Daily Profit: Pkr {plan.dailyProfit}</p>
                    <button
                      type="button"
                      onClick={() => handleDeletePlan(plan._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-md mt-4"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No active plans found.</p>
            )}
          </div>

          {/* Modal */}
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            {modalType === "addBalance" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Add Balance</h2>
                <ToggleSwitch value={selected} onChange={setSelected} />
                <input
                  value={add}
                  onChange={(e) => setAdd(e.target.value)}
                  type="text"
                  placeholder="Enter amount"
                  className="border border-gray-300 p-2 w-full rounded-md mb-4"
                />
                <button
                  onClick={handleAddBalance}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300"
                >
                  Submit
                </button>
              </div>
            )}
            {modalType === "deductBalance" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Deduct Balance</h2>
                <ToggleSwitch value={selected} onChange={setSelected} />
                <input
                  value={deduct}
                  onChange={(e) => setDeduct(e.target.value)}
                  type="text"
                  placeholder="Enter amount"
                  className="border border-gray-300 p-2 w-full rounded-md mb-4"
                />
                <button
                  onClick={handleDeductBalance}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300"
                >
                  Submit
                </button>
              </div>
            )}
            {modalType === "notifications" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Send Notification</h2>
                <textarea
                  placeholder="Enter message"
                  className="border border-gray-300 p-2 w-full rounded-md mb-4"
                ></textarea>
                <button
                  onClick={closeModal}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300"
                >
                  Send
                </button>
              </div>
            )}
            {modalType === "banUser" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Ban User</h2>
                <p className="text-gray-700 mb-4">Are you sure you want to ban this user?</p>
                <button
                  onClick={updateBan}
                  className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md shadow-md transition duration-300"
                >
                  Confirm
                </button>
              </div>
            )}
          </Modal>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Update User Details</h2>
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700 mb-2">Name</label>
              <input
                value={user.name}
                type="text"
                placeholder="Enter name"
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700 mb-2">Email</label>
              <input
                value={user.email}
                type="email"
                placeholder="Enter email"
                className="border border-gray-300 p-2 w-full rounded-md"
              />
            </div>
            {/* <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md transition duration-300">
          Submit
        </button> */}
          </form>
        </div>}.
    </>
  );
}

export default UserDetails;