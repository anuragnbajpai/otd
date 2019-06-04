export interface SessionState {
    device: string;
    page: string;
    country: any;
    user: User;
 }

export interface User {
    id: string;
    name: string;
    picture: string;
    email: string;
    role: string;
 }