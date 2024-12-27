/*
 * Mimium Pty. Ltd. ("LKG") CONFIDENTIAL
 * Copyright (c) 2022 Mimium project Pty. Ltd. All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains the property of LKG. The intellectual and technical concepts contained
 * herein are proprietary to LKG and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained
 * from LKG.  Access to the source code contained herein is hereby forbidden to anyone except current LKG employees, managers or contractors who have executed
 * Confidentiality and Non-disclosure agreements explicitly covering such access.
 */
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
