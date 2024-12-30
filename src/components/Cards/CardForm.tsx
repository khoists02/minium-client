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

interface ICardFormClassnames {
  wrapperClassName?: string;
  cardHeaderClassName?: string;
  titleClassName?: string;
  bodyClassName?: string;
}

interface ICardFormLabels {
  title: string;
  small?: string;
}

interface CardFormProps {
  classNames?: ICardFormClassnames;
  labels: ICardFormLabels;
  children: React.ReactElement | React.ReactElement[];
}

export const CardForm: FC<CardFormProps> = ({
  classNames,
  labels,
  children,
}) => {
  return (
    <>
      <div className={`card card__form ${classNames.wrapperClassName}`}>
        <div
          className={`card-header d-flex justify-content-between align-items-center ${classNames.cardHeaderClassName}`}
        >
          <h5 className="mb-0">{labels.title}</h5>
          {labels.small && (
            <small className="text-body float-end">{labels.small}</small>
          )}
        </div>

        <div className={`card-body ${classNames.bodyClassName}`}>
          {children}
        </div>
      </div>
    </>
  );
};
