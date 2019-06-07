export class SessionState {
    device: string;
    page: string;
    item: string;
    country: any;
    user: User;
 }

export class User {
    id: string;
    name: string;
    picture: string;
    email: string;
    role: string;
 }