export interface CommentMutation {
    comment: string;
    post: string;
}

export interface Post {
    _id: string;
    author: User;
    title: string;
    content: string;
    image?: string | null;
    dateTime: string;
}

export interface PostMutation {
    title: string;
    content: string;
    image?: File | null;
}

export interface User {
    _id: string;
    username: string;
    token: string;
}

export interface Comment {
    _id: string;
    author: User;
    post: Post;
    comment: string;
}

export interface RegisterMutation {
    username: string;
    password: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface ValidationError {
    errors: {
        authentication: {
            message: string;
            name: string;
        },
        messages: string;
        name: string;
        _message: string;
    }
}

export interface GlobalError {
    error: string;
}