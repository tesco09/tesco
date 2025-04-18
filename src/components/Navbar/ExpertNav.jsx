import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Offcanvas, Nav } from "react-bootstrap";

const ExpertNav = (props) => {
    const [modalShow, setModalShow] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleModalClose = () => setModalShow(false);
    const handleModalShow = () => setModalShow(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="w-full mt-4">
            <div className="w-full">
                <div className="flex justify-between items-center px-4 py-2">
                    <div className="flex items-center gap-3">
                        {props.hideham ? '' : <Button
                            variant=""
                            onClick={handleShow}
                            className="mb-2 text-white about-bar"
                        >
                            <svg
                                width="28"
                                height="22"
                                viewBox="0 0 28 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2 2H26M2 11H26M2 20H26"
                                    stroke="#0097DB"
                                    strokeWidth="3.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Button>}
                        <Link to="/" className="text-decoration-none">
                            <h3 className="text-[#0097DB]" style={{ fontFamily: 'Gilroy-SemiBold' }}>avijo</h3>
                        </Link>
                        <div className="relative">
                            {dropdownOpen && (
                                <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-lg">
                                    <li><a className="block px-4 py-2 text-gray-800 hover:bg-gray-100" href="#">Action</a></li>
                                    <li><a className="block px-4 py-2 text-gray-800 hover:bg-gray-100" href="#">Another action</a></li>
                                    <li><hr className="border-gray-200 my-1" /></li>
                                    <li><a className="block px-4 py-2 text-gray-800 hover:bg-gray-100" href="#">Something else here</a></li>
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-3 items-center">
                        {props.price && <Link to="/ChooseAccount" className="text-black font-gilroy font-[500] text-[15px] text-decoration-none">
                            Pricing
                        </Link>}
                        <Link to="/safety" className="text-black font-gilroy font-[500] text-[15px] text-decoration-none">
                            Safety of your data
                        </Link>
                        <button className="bg-white br-4 rounded-2 border-2 border-black h-[40px] w-[120px]" >
                            <span className="text-[16px] font-gilroy font-[500] text-[black]">Contact Us</span>
                        </button>
                    </div>
                </div>
            </div>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className="ms-3">avijo</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav defaultActiveKey="/home" className="flex-column">
                        <Nav.Link
                            className="d-flex align-items-center gap-3 navbar-link"
                            href="/Avijo/Alpha"
                        >
                            <svg
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M14 0.00390625L0.4375 7.58753V28.0039H11.375V20.0435H16.625V28.0039H27.5625V7.58753L14 0.00390625ZM7.18971 22.6548H4.99877V20.0426H7.18971V22.6548ZM7.18971 16.8579H4.99877V14.2457H7.18971V16.8579ZM15.0954 16.8579H12.9045V14.2457H15.0954V16.8579ZM17.4265 9.12649H15.2236V11.3294H12.7764V9.12649H10.5735V6.67835H12.7764V4.47461H15.2236V6.67835H17.4265V9.12649ZM20.806 14.2457H22.8602V16.8579H20.806V14.2457ZM23.0012 22.6548H20.8103V20.0426H23.0012V22.6548Z"
                                    fill="#6E6E68"
                                />
                            </svg>
                            Health Facility Registry (HFR)
                        </Nav.Link>
                        <Nav.Link
                            className="d-flex align-items-center gap-3 navbar-link"
                            href="/Avijo/Expert"
                        >
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M30.6085 25.043H1.39116C0.814906 25.043 0.347656 25.5102 0.347656 26.0865V30.956C0.347656 31.5323 0.814844 31.9995 1.39116 31.9995H30.6085C31.1848 31.9995 31.652 31.5323 31.652 30.956V26.0865C31.652 25.5102 31.1848 25.043 30.6085 25.043ZM15.9998 29.2168C15.4236 29.2168 14.9563 28.7497 14.9563 28.1733C14.9563 27.597 15.4235 27.1298 15.9998 27.1298C16.5761 27.1298 17.0433 27.597 17.0433 28.1733C17.0433 28.7497 16.5761 29.2168 15.9998 29.2168Z"
                                    fill="#6E6E68"
                                />
                                <path
                                    d="M28.5245 6.26088C29.1006 6.26088 29.568 5.79344 29.568 5.21737V1.0435C29.5679 0.467437 29.1006 0 28.5245 0H16.0028C15.4267 0 14.9592 0.467437 14.9592 1.0435V5.21744C14.9592 5.7935 15.4267 6.26094 16.0028 6.26094H21.2201V8.34787H3.481C2.90475 8.34787 2.4375 8.81506 2.4375 9.39137V21.9131C2.4375 22.4894 2.90469 22.9566 3.481 22.9566H28.5245C29.1007 22.9566 29.568 22.4894 29.568 21.9131V9.39131C29.568 8.81506 29.1008 8.34781 28.5245 8.34781H23.3071V6.26088H28.5245ZM11.8288 14.6087H7.65487C7.07881 14.6087 6.61137 14.1412 6.61137 13.5652C6.61137 12.9891 7.07881 12.5217 7.65487 12.5217H11.8288C12.4049 12.5217 12.8723 12.9891 12.8723 13.5652C12.8723 14.1413 12.4049 14.6087 11.8288 14.6087ZM16.0028 20.8696C15.4265 20.8696 14.9592 20.4024 14.9592 19.8261C14.9592 19.2498 15.4264 18.7826 16.0028 18.7826C16.579 18.7826 17.0463 19.2498 17.0463 19.8261C17.0463 20.4024 16.579 20.8696 16.0028 20.8696ZM16.0028 16.6956C15.4265 16.6956 14.9592 16.2284 14.9592 15.6521C14.9592 15.0759 15.4264 14.6086 16.0028 14.6086C16.579 14.6086 17.0463 15.0758 17.0463 15.6521C17.0463 16.2284 16.579 16.6956 16.0028 16.6956ZM20.1767 20.8696C19.6004 20.8696 19.1332 20.4024 19.1332 19.8261C19.1332 19.2498 19.6004 18.7826 20.1767 18.7826C20.753 18.7826 21.2202 19.2498 21.2202 19.8261C21.2202 20.4024 20.7529 20.8696 20.1767 20.8696ZM20.1767 16.6956C19.6004 16.6956 19.1332 16.2284 19.1332 15.6521C19.1332 15.0759 19.6004 14.6086 20.1767 14.6086C20.753 14.6086 21.2202 15.0758 21.2202 15.6521C21.2201 16.2284 20.7529 16.6956 20.1767 16.6956ZM24.3506 20.8696C23.7743 20.8696 23.3071 20.4024 23.3071 19.8261C23.3071 19.2498 23.7743 18.7826 24.3506 18.7826C24.9268 18.7826 25.3941 19.2498 25.3941 19.8261C25.3941 20.4024 24.9269 20.8696 24.3506 20.8696ZM24.3506 14.6087C24.9268 14.6087 25.3941 15.0759 25.3941 15.6522C25.3941 16.2284 24.9269 16.6957 24.3506 16.6957C23.7743 16.6957 23.3071 16.2285 23.3071 15.6522C23.3071 15.0759 23.7743 14.6087 24.3506 14.6087Z"
                                    fill="#6E6E68"
                                />
                            </svg>
                            Health Professional Registery (HPR)
                        </Nav.Link>
                        <Nav.Link
                            className="d-flex align-items-center gap-3 navbar-link"
                            href="/hpp/home"
                        >
                            <svg
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M3.33073 4.66406H9.9974C10.351 4.66406 10.6902 4.80454 10.9402 5.05459C11.1903 5.30464 11.3307 5.64377 11.3307 5.9974V25.9974C11.3307 26.351 11.1903 26.6902 10.9402 26.9402C10.6902 27.1903 10.351 27.3307 9.9974 27.3307H1.9974C1.64377 27.3307 1.30464 27.1903 1.05459 26.9402C0.804538 26.6902 0.664063 26.351 0.664062 25.9974V7.33073C0.664062 6.62349 0.945014 5.94521 1.44511 5.44511C1.94521 4.94501 2.62349 4.66406 3.33073 4.66406Z"
                                    fill="#6E6E68"
                                />
                                <path
                                    d="M11.3307 0.664062H24.6641C25.3713 0.664063 26.0496 0.945014 26.5497 1.44511C27.0498 1.94521 27.3307 2.62349 27.3307 3.33073V25.9974C27.3307 26.351 27.1903 26.6902 26.9402 26.9402C26.6902 27.1903 26.351 27.3307 25.9974 27.3307H8.66406V3.33073C8.66406 2.62349 8.94501 1.94521 9.44511 1.44511C9.94521 0.945014 10.6235 0.664063 11.3307 0.664062Z"
                                    fill="#A7A5A5"
                                />
                                <path
                                    d="M20.6667 11.3333H19.3333V12.6667C19.3333 13.0203 19.1929 13.3594 18.9428 13.6095C18.6928 13.8595 18.3536 14 18 14C17.6464 14 17.3072 13.8595 17.0572 13.6095C16.8071 13.3594 16.6667 13.0203 16.6667 12.6667V11.3333H15.3333C14.9797 11.3333 14.6406 11.1929 14.3905 10.9428C14.1405 10.6928 14 10.3536 14 10C14 9.64638 14.1405 9.30724 14.3905 9.05719C14.6406 8.80714 14.9797 8.66667 15.3333 8.66667H16.6667V7.33333C16.6667 6.97971 16.8071 6.64057 17.0572 6.39052C17.3072 6.14048 17.6464 6 18 6C18.3536 6 18.6928 6.14048 18.9428 6.39052C19.1929 6.64057 19.3333 6.97971 19.3333 7.33333V8.66667H20.6667C21.0203 8.66667 21.3594 8.80714 21.6095 9.05719C21.8595 9.30724 22 9.64638 22 10C22 10.3536 21.8595 10.6928 21.6095 10.9428C21.3594 11.1929 21.0203 11.3333 20.6667 11.3333ZM14 18V27.3333H22V18C22 17.6464 21.8595 17.3072 21.6095 17.0572C21.3594 16.8071 21.0203 16.6667 20.6667 16.6667H15.3333C14.9797 16.6667 14.6406 16.8071 14.3905 17.0572C14.1405 17.3072 14 17.6464 14 18Z"
                                    fill="#6E6E68"
                                />
                            </svg>
                            avijo HPP
                        </Nav.Link>

                        <Nav.Link
                            className="d-flex align-items-center gap-3 navbar-link"
                            href="/"
                        >
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M19.4327 0H6.46114C6.12 0 5.84454 0.27639 5.84454 0.616599V3.12288H2.95301C2.61186 3.12288 2.33594 3.3988 2.33594 3.73948V19.932C2.33594 20.2727 2.61233 20.5486 2.95301 20.5486H16.781H19.4332C19.7743 20.5486 20.0498 20.2722 20.0498 19.932V0.617068C20.0502 0.27639 19.7734 0 19.4327 0ZM16.163 19.3145H3.56914V4.35655H16.163V19.3145ZM18.8166 19.3145H17.398V3.73995C17.398 3.39927 17.1212 3.12335 16.7824 3.12335H7.07821V1.23414H18.8171L18.8166 19.3145Z"
                                    fill="#6E6E68"
                                />
                                <path
                                    d="M6.35668 5.66797H4.35156V8.7519H6.35668V5.66797Z"
                                    fill="#6E6E68"
                                />
                                <path
                                    d="M6.35668 10.293H4.35156V13.3769H6.35668V10.293Z"
                                    fill="#6E6E68"
                                />
                                <path
                                    d="M6.35668 14.9219H4.35156V18.0053H6.35668V14.9219Z"
                                    fill="#6E6E68"
                                />
                                <path
                                    d="M9.36449 5.66797H7.35938V8.7519H9.36449V5.66797Z"
                                    fill="#6E6E68"
                                />
                                <path
                                    d="M9.36449 10.293H7.35938V13.3769H9.36449V10.293Z"
                                    fill="#6E6E68"
                                />
                                <path
                                    d="M9.36449 14.9219H7.35938V18.0053H9.36449V14.9219Z"
                                    fill="#6E6E68"
                                />
                                <path
                                    d="M12.3723 5.66797H10.3672V8.7519H12.3723V5.66797Z"
                                    fill="#6E6E68"
                                />
                                <path
                                    d="M12.3723 10.293H10.3672V13.3769H12.3723V10.293Z"
                                    fill="#6E6E68"
                                />
                                <path
                                    d="M12.3723 14.9219H10.3672V18.0053H12.3723V14.9219Z"
                                    fill="#6E6E68"
                                />
                                <path
                                    d="M15.3797 5.66797H13.375V8.7519H15.3797V5.66797Z"
                                    fill="#6E6E68"
                                />
                                <path
                                    d="M15.3797 10.293H13.375V13.3769H15.3797V10.293Z"
                                    fill="#6E6E68"
                                />
                                <path
                                    d="M15.3797 14.9219H13.375V18.0053H15.3797V14.9219Z"
                                    fill="#6E6E68"
                                />
                                <path
                                    d="M19.4323 20.7656H2.56972C2.22905 20.7656 1.95312 21.042 1.95312 21.3822C1.95312 21.7234 2.22905 21.9979 2.56972 21.9979H19.4323C19.773 21.9979 20.0494 21.7215 20.0494 21.3822C20.0499 21.042 19.773 20.7656 19.4323 20.7656Z"
                                    fill="#6E6E68"
                                />
                            </svg>
                            Visit avijo.in
                        </Nav.Link>
                        <button
                            className="sidebar_btn mt-3 ms-3 mb-3"
                            onClick={handleModalShow}
                        >
                            Download Avijo Health app
                        </button>

                        <Nav.Link
                            className="d-flex align-items-center gap-3 navbar-link"
                            href="/safety"
                        >
                            Safety of your data
                        </Nav.Link>
                        <Nav.Link
                            className="d-flex align-items-center gap-3 navbar-link"
                            href="/contact"
                        >
                            Help
                        </Nav.Link>
                        <Nav.Link
                            className="d-flex align-items-center gap-3 navbar-link"
                            href="/contact"
                        >
                            Contact Us{" "}
                        </Nav.Link>
                        <Nav.Link
                            className="d-flex align-items-center gap-3 navbar-link"
                            href="/Terms-and-Conditions"
                        >
                            Terms of Service{" "}
                        </Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default ExpertNav;
