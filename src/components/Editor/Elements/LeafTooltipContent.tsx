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

interface LeafTooltipContentProps {
  handleFormatClick: (fmt: string) => void;
  leafTypes: string[];
}

export const LeafTooltipContent: FC<LeafTooltipContentProps> = ({
  leafTypes,
  handleFormatClick,
}) => {
  const types = useMemo(() => {
    return leafTypes;
  }, [leafTypes]);
  return (
    <>
      {types.map((l) => {
        return (
          <i
            className={`fa fa-${l} cursor-pointer`}
            onClick={() => handleFormatClick(l)}
          ></i>
        );
      })}
    </>
  );
};