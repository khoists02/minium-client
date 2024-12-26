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

import React, { FC, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

interface CommentInBlockProps {
  icoClassName?: string;
  onClick?: () => void;
}

export const CommentInBlock: FC<CommentInBlockProps> = ({
  icoClassName = "",
  onClick,
}) => {
  const [show, setShow] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setShow((prev) => !prev);
    if (onClick) onClick();
  };

  console.log({ show })

  const renderTooltip = (props: any) => (
    <Tooltip onClick={(e) => e.stopPropagation()} contentEditable={false} id="button-tooltip" {...props} className="comment-tooltip">
      <div className="comment-menu">
        <div className="comment-menu__header mb-2">

        </div>

        <div className="comment-menu__textarea mb-2">
          <textarea className="form-control" name="" id=""></textarea>
        </div>

        <div className="comment-menu__button">
          <button className="btn btn-light">Cancel</button>
          <button className="btn btn-success">Save</button>
        </div>

      </div>
    </Tooltip>
  );

  return <>
    <OverlayTrigger
      trigger={["click"]}
      show={show}
      placement="auto" // Position of the tooltip: top, right, bottom, left
      overlay={renderTooltip} // Tooltip content
    >
      <i
        onClick={handleClick} contentEditable={false} className={`fa fa-lock ${icoClassName}`} />
    </OverlayTrigger>
  </>
}