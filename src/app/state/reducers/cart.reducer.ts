import { createReducer, on } from '@ngrx/store';
import { CartState } from '../app.state';
import * as AppActions from '../actions';

const initalCartState: CartState = {
  tickets: [],
  total: 0,
};

export const CartReducer = createReducer(
    initalCartState,
    on(AppActions.addToCart, (state, { ticket }) => {

        let updatedTickets = [...state.tickets, ticket];
        const newTotal = updatedTickets.reduce((sum, t) => sum + (t.price * t.quantity), 0);
        return { ...state, tickets:updatedTickets, total:newTotal}

    }),
    on(AppActions.removeFromCart, (state, {ticketId}) => {

        let updatedTickets = state.tickets.filter(t => t.id !== ticketId);
        const newTotal = updatedTickets.reduce((sum, t) => sum + (t.price * t.quantity), 0);
        return { ...state, tickets:updatedTickets, total:newTotal}
    }),
    on(AppActions.updateTicketQuantity, (state, { ticket, quantity }) => {
        let updatedTickets = state.tickets.map(t => {
            if (t.id !== ticket.id) return t
            return { ...t, quantity: quantity };
          });
        const newTotal = updatedTickets.reduce((sum, t) => sum + (t.price * t.quantity), 0);
        return { ...state, tickets:updatedTickets, total:newTotal};
    }),
    on(AppActions.clearCart, (state) => {
        return { tickets:[], total:0 }
    })

)
