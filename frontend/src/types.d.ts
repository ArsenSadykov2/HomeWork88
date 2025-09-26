export interface Comment {
    author: User,
    post: Post,
    comment: string,
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
    author: string;
    title: string;
    content: string;
    image: string | null;
}

export interface User {
    _id: string;
    username: string;
    token: string;
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
        [key: string]: {
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