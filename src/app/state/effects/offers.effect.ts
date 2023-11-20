import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { DummyService } from 'src/app/Services/dummy.service';
import * as AppActions from '../actions';

@Injectable()
export class OfferEffects {
  constructor(private actions$: Actions, private dummySvc: DummyService) {}

  loadOffers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadOffers),
      mergeMap(() =>
        this.dummySvc.getOffers().pipe(
          map((offers) => AppActions.setOffers({ offers: offers })),
          catchError((error) =>
            of(AppActions.loadOfferFailure({ error: error }))
          )
        )
      )
    )
  );
}
