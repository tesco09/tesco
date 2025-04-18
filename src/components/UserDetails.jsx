import React, { useEffect, useState } from "react";
import Modal from "../components/ModalShow";
import { BaseUrl } from "../Assets/Data";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

function UserDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [detail, setDetail] = useState({});

  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [add, setAdd] = useState(null);
  const [deduct, setDeduct] = useState(null);

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
      setUser(json);
      setDetail(detailjson);
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

    const newBalance = await parseFloat(user.balance) + parseFloat(add);

    if (add < 0) {
      alert("Please enter a valid amount to add.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BaseUrl}/register/${user?.email}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          balance: newBalance,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Balance Added successfully!');

      }
    } catch (error) {
      console.error('Error Adding Balance:', error);
      alert('Failed to Add Balance.');
    } finally {
      setLoading(false);
      closeModal();
      fetchUserData();
    }
  };


  const handleDeductBalance = async () => {

    const newBalance = await parseFloat(user.balance) - parseFloat(deduct);

    if (deduct < 0) {
      alert("Please enter a valid amount to add.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BaseUrl}/register/${user?.email}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          balance: newBalance,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Balance Deduct successfully!');

      }
    } catch (error) {
      console.error('Error Dedut Balance:', error);
      alert('Failed to Dedut Balance.');
    } finally {
      setLoading(false);
      closeModal();
      fetchUserData();
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
              <p className="text-gray-600">${user.balance}</p>
            </div>
            <div className="border border-gray-300 p-2 rounded-md">
              <p className="text-lg font-semibold text-gray-700">Deposits:</p>
              <p className="text-gray-600">${user.deposit}</p>
            </div>
            <div className="border border-gray-300 p-2 rounded-md">
              <p className="text-lg font-semibold text-gray-700">Withdrawals:</p>
              <p className="text-gray-600">${user.totalWithdraw}</p>
            </div>
            {/* <div className="border border-gray-300 p-2 rounded-md">
              <p className="text-lg font-semibold text-gray-700">Transactions:</p>
              <p className="text-gray-600">{user.transactions}</p>
            </div> */}
            <div className="border border-gray-300 p-2 rounded-md">
              <p className="text-lg font-semibold text-gray-700">Total Invest:</p>
              <p className="text-gray-600">${user.totalInvest}</p>
            </div>
            <div className="border border-gray-300 p-2 rounded-md">
              <p className="text-lg font-semibold text-gray-700">Total Referral Commission:</p>
              <p className="text-gray-600">${detail.totalTeamCommission}</p>
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
              onClick={() => { window.open(`https://tesco-rho.vercel.app/splash/${id}`) }}
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

          {/* Modal */}
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            {modalType === "addBalance" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Add Balance</h2>
                <input
                  value={add}
                  onChange={(e) => setAdd(e.target.value)}
                  type="number"
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
                <input
                  value={deduct}
                  onChange={(e) => setDeduct(e.target.value)}
                  type="number"
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