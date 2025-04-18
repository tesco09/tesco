import React, { useEffect, useState } from 'react';
import './Header.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faChevronLeft, faCircleInfo, faCircleQuestion, faQuestion, faQuestionCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { BaseUrl, pageTitles } from '../Assets/Data';
import LoadingSpinner from './LoadingSpinner';

function Header() {

  const navigate = useNavigate();
  const location = useLocation();


  let path = location.pathname;
  if (path.startsWith("/deposit/")) path = "/deposit";
  if (path.startsWith("/withdraw/")) path = "/withdraw";
  if (path.startsWith("/withdraw-sucess/")) path = "/withdraw-sucess";
  if (path.startsWith("/invite/")) path = "/invite";
  if (path.startsWith("/my-team/")) path = "/my-team";
  if (path.startsWith("/team-detail/")) path = "/team-detail";
  if (path.startsWith("/detail/")) path = "/detail";
  if (path.startsWith("/invest-success/")) path = "/invest-success";
  if (path.startsWith("/progress/")) path = "/progress";
  if (path.startsWith("/notification/")) path = "/notification";
  if (path.startsWith("/dashboard/")) path = "/dashboard";
  if (path.startsWith("/deposit-history/")) path = "/deposit-history";
  if (path.startsWith("/withdraw-history/")) path = "/withdraw-history";
  if (path.startsWith("/profile/")) path = "/profile";
  if (path.startsWith("/edit-password/")) path = "/edit-password";
  if (path.startsWith("/about/")) path = "/about";
  if (path.startsWith("/contact/")) path = "/contact";
  const title = pageTitles[path] || "";


  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [notifications, setNotifications] = useState(0);

  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    const id = localStorage.getItem('id');
    try {
      // setLoading(true);
      const response = await fetch(`${BaseUrl}/register/${id}`);
      const response2 = await fetch(`${BaseUrl}/notifications/receiver/${id}`);
      const json = await response.json();
      const json2 = await response2.json();
      const unseen = json2.filter((item) => item.seen === false);
      setNotifications(unseen.length);
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
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setShowLogoutModal(false);
    closeSidebar();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className='flex flex-row items-center'>
          {/* Left: Hamburger Menu */}
          <button
            className="hamburger-menu"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </button>

          {/* Center: Dashboard Text */}
          <h1 className="header-title ml-[20px] mt-2 w-[160px] text-left">{title || userData?.name}</h1>
        </div>

        {/* Right: Help Button */}
        <a href='/notification'>
          {notifications > 0 && <span className='bg-red-500 text-[8px] text-white rounded-full h-[12px] w-[12px] z-20 position-absolute mb-[20px] items-center flex flex-col justify-center ml-[12px]'>{notifications}</span>}
          <FontAwesomeIcon icon={faBell} className='text-white text-[20px]' />
        </a>
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="sidebar">
          <div className='flex flex-row w-full items-center mb-2'>
            <button className="close-sidebar w-[5%]" onClick={closeSidebar}>
              <FontAwesomeIcon icon={faChevronLeft} className='text-sm' />
            </button>
            <span className='text-md font-medium w-[70%] text-center'>Profile</span>
          </div>
          <nav className="sidebar-nav flex flex-col items-center w-full">
            <div className='flex flex-row items-center w-full pb-2'>
              {userData?.profileImage ? <img src={userData?.profileImage} alt='preview' className='text-gray-300 border overflow-hidden rounded-full h-[30px] w-[30px]' /> : <FontAwesomeIcon icon={faUser} className='text-gray-300 border overflow-hidden rounded-full h-[30px] w-[30px]' />}
              {loading ? <LoadingSpinner /> : <div className='flex flex-col ml-2 w-[80%]'>
                <span className='text-[#347928] text-[14px] font-bold'>Welcom Back!</span>
                <span className='text-gray-500 text-[10px] font-medium'>{userData?.name}</span>
              </div>}
            </div>
            <a href="/" className='mt-4 font-medium' onClick={closeSidebar}>Home</a>
            <a href="/transactions" className='font-medium' onClick={closeSidebar}>Transactions</a>
            <a href="/invite" className='font-medium' onClick={closeSidebar}>Invite a friend</a>
            <a href="/contact" className='font-medium' onClick={closeSidebar}>Contact us</a>
            <a href="/profile" className='font-medium' onClick={closeSidebar}>Profile</a>
            <a href="/promo-code" className='font-medium' onClick={closeSidebar}>Promo Code</a>
            <div className='flex flex-row items-center w-full mt-[5%]'>
              <button onClick={handleLogout} className="bg-gradient-to-r from-[#3F7D58] to-[#90C67C] text-white px-4 py-2 border-none rounded-md text-[12px] font-medium w-[80px]">
                Logout
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Overlay for Sidebar */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Are you sure you want to logout?</h2>
            <div className="modal-actions">
              <button className="confirm-button" onClick={handleLogout}>
                Yes
              </button>
              <button
                className="cancel-button"
                onClick={() => setShowLogoutModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;