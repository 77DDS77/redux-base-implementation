export interface Offer {
  id: number;
  name: string;
  availability: number;
  museum: string;
  price:number;
}

export interface UserInfo {
  id: number;
  name: string;
  lastname: string;
  email: string;
  token: string;
}

export interface Ticket {
  id: string;
  quantity: number;
  date: number;
  offer: Offer;
  price: number;
}
