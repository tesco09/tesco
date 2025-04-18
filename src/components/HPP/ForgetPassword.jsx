import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PharmacyForgetPassword from "../PharmacyForgetPassword";
import PharmacyLogin from "../PharmacyLogin";
const ForgetPassword = () => {
    React.useEffect(() => {
        localStorage.setItem("myPath", window.location.pathname);
    }, []);

    return (
        <div>
            <div className="container">
                <Tabs
                    defaultActiveKey="Register"
                    id="fill-tab-example"
                    className="mb-3"
                    fill
                >
                    <Tab eventKey="Login" title="Login">
                        <PharmacyLogin />
                    </Tab>
                    <Tab eventKey="Register" title="Register">
                        <PharmacyForgetPassword />
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};

export default ForgetPassword;
