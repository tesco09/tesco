import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { BaseUrl } from "../../../Assets/Data";

const ProfileEdit = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    fullName: "",
    emailId: "",
    mobileNumber: "",
    companyLegalName: "",
    gstNo: "",
    panNo: "",
    addressLineNo1: "",
    addressLineNo2: "",
    cityDistrict: "",
    pincode: "",
    state: "",
    countryRegion: "",
    bankAccountName: "",
    bankAccountNumber: "",
    ifscCode: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const requiredFields = [
      "businessName",
      "fullName",
      "emailId",
      "mobileNumber",
      "companyLegalName",
      "gstNo",
      "panNo",
      "addressLineNo1",
      "addressLineNo2",
      "cityDistrict",
      "pincode",
      "state",
      "countryRegion",
      "bankAccountName",
      "bankAccountNumber",
      "ifscCode",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        Swal.fire("Error", `Please enter ${field}.`, "error");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const payload = {
      businessName: formData.businessName,
      fullName: formData.fullName,
      emailId: formData.emailId,
      mobileNumber: formData.mobileNumber,
      companyLegalName: formData.companyLegalName,
      gstNo: formData.gstNo,
      panNo: formData.panNo,
      addressLineNo1: formData.addressLineNo1,
      addressLineNo2: formData.addressLineNo2,
      cityDistrict: formData.cityDistrict,
      pincode: Number(formData.pincode),
      state: formData.state,
      countryRegion: formData.countryRegion,
      bankAccountName: formData.bankAccountName,
      bankAccountNumber: formData.bankAccountNumber,
      ifscCode: formData.ifscCode,
    };

    try {
      const response = await axios.post(
        `${BaseUrl}/hppAuth/hppAuthProfile`,
        payload
      );
      if (response.status === 200) {
        Swal.fire("Success", "Profile updated successfully!", "success");
        navigate("/Verfied");
      } else {
        Swal.fire(
          "Error",
          response.data.message || "Profile update failed.",
          "error"
        );
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message ||
          "Network error. Please try again later.",
        "error"
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <section className="profile-edit navbar-shadow py-4">
          <div className="container mt-3">
            <div className="d-sm-block d-md-flex align-items-center gap-5">
              <div className="text-center">
                <div>
                  <label>Profile photo</label>
                </div>
                <div>
                  {/* <img
                    src={require("../../Assets/image/Frame 2609503.png")}
                    alt=""
                  /> */}
                </div>
                <div className="mt-2">
                  <button className="rounded">Add Company Logo</button>
                </div>
              </div>
              <div className="d-flex flex-column">
                <label>Company/Business name</label>
                <input
                  type="text"
                  name="businessName"
                  placeholder="Enter Business name"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        </section>
        <section className="profile-edit navbar-shadow py-4">
          <div className="container mt-3">
            <div className="">
              <div className="basic">
                <h5>Basic Details</h5>
                <div className="row">
                  <div className="col-md-4">
                    <div>
                      <label className="mb-2">Your Name</label>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Enter your Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div>
                      <label className="mb-2">Mobile Number</label>
                      <input
                        type="text"
                        name="mobileNumber"
                        placeholder="Enter Your mobile Number"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div>
                      <label className="mb-2">Your Email ID</label>
                      <input
                        type="text"
                        name="emailId"
                        placeholder="Enter Your Email"
                        value={formData.emailId}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="profile-edit navbar-shadow py-4">
          <div className="container mt-3">
            <div className="">
              <div className="basic">
                <h5>GST and PAN Detail</h5>
                <div className="row">
                  <div className="col-md-4">
                    <div>
                      <label className="mb-2">Company Legal Name</label>
                      <input
                        type="text"
                        name="companyLegalName"
                        placeholder="Enter Company Legal Name"
                        value={formData.companyLegalName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex flex-column">
                      <label>GST No.</label>
                      <input
                        type="text"
                        name="gstNo"
                        placeholder="Enter GST Number"
                        value={formData.gstNo}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex flex-column">
                      <label>PAN No.</label>
                      <input
                        type="text"
                        name="panNo"
                        placeholder="Enter PAN Number"
                        value={formData.panNo}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="profile-edit navbar-shadow py-4">
          <div className="container mt-3">
            <div className="">
              <div className="basic">
                <h5>Address</h5>
                <div className="row">
                  <div className="col-md-4">
                    <div>
                      <label>Address Line No.1</label>
                      <input
                        type="text"
                        name="addressLineNo1"
                        placeholder="Enter Address Line 1"
                        value={formData.addressLineNo1}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div>
                      <label>Address Line No.2</label>
                      <input
                        type="text"
                        name="addressLineNo2"
                        placeholder="Enter Address Line 2"
                        value={formData.addressLineNo2}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div>
                      <label>City/District</label>
                      <input
                        type="text"
                        name="cityDistrict"
                        placeholder="Enter City or District"
                        value={formData.cityDistrict}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div>
                      <label>Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        placeholder="Enter Pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div>
                      <label>State</label>
                      <input
                        type="text"
                        name="state"
                        placeholder="Enter State"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div>
                      <label>Country/Region</label>
                      <input
                        type="text"
                        name="countryRegion"
                        placeholder="Enter Country/Region"
                        value={formData.countryRegion}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="profile-edit navbar-shadow py-4">
          <div className="container mt-3">
            <div className="">
              <div className="basic">
                <h5>Bank Account Detail</h5>
                <div className="row">
                  <div className="col-md-4">
                    <div>
                      <label>Bank account name</label>
                      <input
                        type="text"
                        name="bankAccountName"
                        placeholder="Enter Bank account name"
                        value={formData.bankAccountName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div>
                      <label>IFSC Code</label>
                      <input
                        type="text"
                        name="ifscCode"
                        placeholder="Enter IFSC Code"
                        value={formData.ifscCode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div>
                      <label>Bank account number</label>
                      <input
                        type="text"
                        name="bankAccountNumber"
                        placeholder="Enter Bank account number"
                        value={formData.bankAccountNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="profile-edit navbar-shadow py-5 mb-3">
          <div className="container mt-3">
            <div className="">
              <div className="basic">
                <div className="row">
                  <div className="col-md-6">
                    <Link to="/" className="back-btn">
                      Back
                    </Link>
                  </div>
                  <div className="col-md-6 text-right">
                    <button type="submit" className="submit-btn">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
};

export default ProfileEdit;
