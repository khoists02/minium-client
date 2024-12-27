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
export interface IUserResponse {
    id?: string;
    name?: string;
    email?: string;
    photoUrl?: string;
    updatedAt?: Date | string;
    description?: string;
}

export interface IPostResponse {
    id?: string;
    title?: string;
    content?: string;
    description?: string;
    backgroundUrl?: string;
    countLikes?: number;
    countComments?: number;
    user?: {
        id?: string;
        name?: string;
        photoUrl?: string;
        description?: string;
    };
    draft?: boolean;
    updatedAt?: Date | string;
}

export interface ICommentResponse {
    id?: string;
    title?: string;
    content?: string;
    author?: IUserResponse;
}
