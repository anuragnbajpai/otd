export interface SessionState {
    device: string;
    page: string;
    user: User;
 }

export interface User {
    name: string;
    picture: string;
    email: string;
    role: string;
 }