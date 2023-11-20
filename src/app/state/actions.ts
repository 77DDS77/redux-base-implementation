import { createAction, props } from '@ngrx/store';
import { Offer, Ticket, UserInfo } from '../Interfaces/interfaces';

//* OFFERS ACTIONS
export const loadOffers = createAction('[Offers Page] Load Offers');
export const setOffers = createAction(
  '[Offers API] Offers Loaded',
  props<{ offers: Offer[] }>()
);
export const loadOfferFailure = createAction(
  '[Offers API] Offers Loading Failed',
  props<{ error: any }>()
);

//* USER INFO ACTIONS
export const setUserInfo = createAction(
  '[User API] Set User Info',
  props<{ userInfo: UserInfo }>()
);

//* CART ACTIONS
export const addToCart = createAction(
  '[Cart] Added to cart',
  props<{ ticket: Ticket }>()
);
export const removeFromCart = createAction(
  '[Cart] Remove from Cart',
  props<{ ticketId: string }>()
);
export const updateTicketQuantity = createAction(
  '[Cart] Update Ticket Quantity',
  props<{ ticket: Ticket; quantity: number }>()
);
export const clearCart = createAction('[Cart] Clear Cart');
