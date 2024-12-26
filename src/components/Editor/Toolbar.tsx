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
import React, { FC } from "react";
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
  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props} className="toolbar-tooltip">
      <ToolbarButton onClick={() => onSelect("image")} icon={<i className="fa fa-image " />} format="image" />
      <ToolbarButton onClick={() => onSelect("code-block")} className="ml-2" icon={<i className="fa fa-code " />} format="code-block" />
      <ToolbarButton onClick={() => onSelect("quote")} className="ml-2" icon={<i className="fa fa-quote-right " />} format="quote" />
      <ToolbarButton onClick={() => onSelect("header")} className="ml-2" icon={<i className="fa fa-header " />} format="header" />
      <ToolbarButton onClick={() => onSelect("description")} className="ml-2" icon={<i className="fa fa-text-width " />} format="description" />
      <ToolbarButton onClick={() => onSelect("break")} className="ml-2" icon={<i className="fa fa-scissors " />} format="break" />
    </Tooltip>
  );

  return (
    <OverlayTrigger
      trigger={["click"]}
      placement="top-start" // Position of the tooltip: top, right, bottom, left
      delay={{ show: 500, hide: 400 }} // Delay in showing/hiding tooltip
      overlay={renderTooltip} // Tooltip content
      rootClose
      rootCloseEvent="mousedown"
    >
      <i className={`fa fa-plus ${wrapperClass}`} />
    </OverlayTrigger>
  );
};

export default Toolbar;