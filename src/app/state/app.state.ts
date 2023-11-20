import { Offer, Ticket, UserInfo } from '../Interfaces/interfaces';

export interface OffersState {
  offers: Offer[];
  loadError: any;
}

export interface CartState {
  tickets: Ticket[];
  total: number;
}

export interface AppState {
  offers: OffersState;
  userInfo: UserInfo;
  cart: CartState;
}
