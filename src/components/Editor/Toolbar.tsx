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
import React, { FC, useEffect, useRef, useState } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import ToolbarButton from "./ToolbarButton";

interface ToolbarProps {
  wrapperClass?: string;
  onSelect: (format: string) => void;
}

const Toolbar: FC<ToolbarProps> = ({
  onSelect,
  wrapperClass = "",
}) => {
  const [show, setShow] = useState(false);
  const tooltipTarget = useRef<HTMLDivElement>(null);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setShow(!show);
  }

  const handleSelect = (fmt: string) => {
    onSelect(fmt);
    setShow(false);
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (tooltipTarget.current && !tooltipTarget.current.contains(event.target as Node)) {
      setShow(false);
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [show]);

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props} className="toolbar-tooltip">
      <div >
        <ToolbarButton onClick={() => handleSelect("image")} icon={<i className="fa fa-image " />} format="image" />
        <ToolbarButton onClick={() => handleSelect("code-block")} className="" icon={<i className="fa fa-code " />} format="code-block" />
        <ToolbarButton onClick={() => handleSelect("quote")} className="" icon={<i className="fa fa-quote-right " />} format="quote" />
        <ToolbarButton onClick={() => handleSelect("header")} className="" icon={<i className="fa fa-header " />} format="header" />
        <ToolbarButton onClick={() => handleSelect("description")} className="" icon={<i className="fa fa-text-width " />} format="description" />
        <ToolbarButton onClick={() => handleSelect("break")} className="" icon={<i className="fa fa-scissors " />} format="break" />
      </div>
    </Tooltip>
  );

  return (
    <div ref={tooltipTarget}>
      <OverlayTrigger
        show={show}
        placement="right" // Position of the tooltip: top, right, bottom, left
        delay={{ show: 1000, hide: 400 }} // Delay in showing/hiding tooltip
        overlay={renderTooltip} // Tooltip content
      >
        <span onClick={handleClick} contentEditable={false} className={`toolbar_plus ${wrapperClass}`}>
          {show ? "x" : "+"}
        </span>
      </OverlayTrigger>
    </div>
  );
};

export default Toolbar;