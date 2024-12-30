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
import React, { FC, forwardRef } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export const Avatar: FC<{
  url: string;
  className: string;
  size: string;
  onClick?: () => void;
  description?: string;
  allowTrigger?: boolean;
}> = ({
  url,
  className,
  size = "sm",
  description = "",
  onClick,
  allowTrigger = true,
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

  const getRandomColor = (): string => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getSortAuthor = (name: string) => {
    if (!name) return "A";
    const splitObject = name.split(" ");

    let letter = splitObject[0][0].toUpperCase();

    if (splitObject.length > 1) {
      letter = `${letter}${splitObject[1][0].toUpperCase()}`;
    }
    return letter;
  };

  return allowTrigger ? (
    <>
      <OverlayTrigger
        trigger={["click"]}
        rootClose
        placement="auto" // Position of the tooltip (top, bottom, left, right)
        overlay={
          <Tooltip className="tooltip-profile" id="button-tooltip">
            <div className="d-flex w-100">
              <div className="avatar xs ">
                <img src={url} alt="Profile Image" />
              </div>
              <span className="ml-3 mt-2">Follow</span>
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
      {url ? (
        <img src={url} alt="Profile Image" />
      ) : (
        <span className="">
          <span
            className="author btn-profile size-SM mr-1"
            style={{ background: getRandomColor() }}
          >
            {getSortAuthor("J")}
          </span>
          <p className="mt-2">
            <small className="text-muted">{description}</small>
          </p>
        </span>
      )}
    </div>
  );
};
