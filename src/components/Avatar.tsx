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
import React, { FC, forwardRef, useMemo } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { ShortLogo } from "./ShortLogo";
import { Placement } from "react-bootstrap/esm/types";

interface AvatarProps {
  url?: string;
  className?: string;
  size?: string;
  description?: string;
  allowTrigger?: boolean;
  shortName?: string;
  placement?: Placement;
  onClick?: () => void;
}

export const Avatar: FC<AvatarProps> = ({
  url,
  className,
  size = "sm",
  description = "",
  shortName,
  allowTrigger = true,
  placement = "auto",
  onClick,
}) => {
  // Custom trigger component with ref forwarding
  const TriggerDiv = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
  >(({ children, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      style={{ display: "inline-block", cursor: "pointer" }}
    >
      {children}
    </div>
  ));

  const TooltipAction = () => {
    if (url) return <img src={url} alt="Profile Image" />;
    return (
      <ShortLogo size={size} shortName={shortName} description={description} />
    );
  };

  return allowTrigger ? (
    <>
      <OverlayTrigger
        trigger={["click"]}
        rootClose
        placement={placement} // Position of the tooltip (top, bottom, left, right)
        overlay={
          <Tooltip className="tooltip-profile" id="button-tooltip">
            <div className="d-flex w-100">
              <div className="avatar xs ">
                <img src={url} alt="Profile Image" />
              </div>
              <span className="ml-3 ">
                <p className="mt-2 mb-0">Follow</p>
                <p className="mb-0 text-small">{shortName}</p>
              </span>
            </div>
            <div className="w-100 text-muted truncate-6-lines description mt-3">
              <small>{description}</small>
            </div>
          </Tooltip>
        }
      >
        <TriggerDiv>
          <div
            onClick={(e) => {
              e.preventDefault();
              if (onClick) onClick();
            }}
            className={`avatar ${onClick ? "cursor-pointer" : ""} ${size} ${className}`}
          >
            <img src={url} alt="Profile Image" />
          </div>
        </TriggerDiv>
      </OverlayTrigger>
    </>
  ) : (
    <div
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
      }}
      className={`avatar w-100 ${onClick ? "cursor-pointer" : ""} ${size} ${className}`}
    >
      {TooltipAction()}
    </div>
  );
};
