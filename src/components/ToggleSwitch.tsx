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
import React, { useState } from "react";

interface ToggleSwitchProps {
    initialState?: boolean;
    onChange?: (value: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ initialState = false, onChange }) => {
    const [isChecked, setIsChecked] = useState<boolean>(initialState);

    const handleToggle = () => {
        const newState = !isChecked;
        setIsChecked(newState);
        if (onChange) {
            onChange(newState); // Notify parent component of the state change
        }
    };

    return (
        <label className="switch">
            <input type="checkbox" checked={isChecked} onChange={handleToggle} />
            <span className="slider round"></span>
        </label>
    );
};

export default ToggleSwitch;