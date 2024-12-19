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