export class SessionState {
    device: string;
    page: string;
    searchKeyword: string;
    country: Country | null;
    user: User | null;
 }

export class User {
    id: string;
    name: string;
    picture: string;
    email: string;
    role: string;
    saved: string[];
 }

 
export class Country {
    code: string;
    currency: string;
    currencySymbol: string;
    image: string;
    name: string;
 }