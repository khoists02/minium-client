import React from "react";
import { RegistrationForm } from "./RegisterForm";

const RegistrationContainer: React.FC = () => {

    return (
        <div className="container mt-5">
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <RegistrationForm onSubmit={() => {}} />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default RegistrationContainer;