import { createReducer, on } from '@ngrx/store';
import * as AppActions from '../actions';
import { OffersState } from '../app.state';

const initialOffersState: OffersState = {
  offers: [],
  loadError: null,
};

export const offersReducer = createReducer(
  initialOffersState,
  on(AppActions.setOffers, (state, { offers }) => ({
    ...state,
    offers,
    loadError: null,
  })),
  on(AppActions.loadOfferFailure, (state, { error }) => {
    return { ...state, loadError: error };
  })
);
