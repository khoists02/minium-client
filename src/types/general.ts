export interface IUserResponse {
    id?: string;
    name?: string;
    email?: string;
    imageUrl?: string;
    updatedAt?: Date | string;
}

export interface IPostResponse {
    id?: string;
    title?: string;
    content?: string;
    author?: string;
    updatedAt?: Date | string;
}

export interface ICommentResponse {
    id?: string;
    content?: string;
    author?: {
        id?: string;
        name?: string;
    }
}