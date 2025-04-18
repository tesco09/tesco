import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
    const adminEmail = localStorage.getItem("admin-email");
    // const isAuthenticated = !!localStorage.getItem("admin-email");

    if (adminEmail !== 'tescoappofficial@gmail.com') {
        return <Navigate to="/admin-login" />;
    }

    return <Outlet />;
};

export default AdminRoute;
