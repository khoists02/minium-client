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
import React, { FC, useMemo } from "react";

export const ShortLogo: FC<{
  shortName: string;
  size: string;
  description?: string;
}> = ({ shortName, size, description }) => {
  const getRandomColor = (): string => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const sortLabel = useMemo(() => {
    if (!shortName) return "A";
    const splitObject = shortName.split(" ");

    let letter = splitObject[0][0].toUpperCase();

    if (splitObject.length > 1) {
      letter = `${letter}${splitObject[1][0].toUpperCase()}`;
    }
    return letter;
  }, [shortName]);
  return (
    <>
      <span className="">
        <span
          className={`author size-${size} btn-profile  me-1`}
          style={{ background: getRandomColor() }}
        >
          {sortLabel}
        </span>
        <p className="mt-2">
          <small className="text-muted">{description}</small>
        </p>
      </span>
    </>
  );
};
