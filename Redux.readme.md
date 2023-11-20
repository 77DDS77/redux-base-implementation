# IMPLEMENTAZIONE REDUX

## 0. Base Setup

- Store
```bash
npm i @ngrx/store
```

- Effects
```bash
npm i @ngrx/effects
```

- Store devTools
```bash
npm i @ngrx/store-devtools
```
Store dev tools lo devo importare nell' ```app.module.ts``` per poter attivare i devTools di Redux (estensione scaricabile sul browser)

```ts
imports: [
    StoreDevtoolsModule.instrument({
      // Retains last 25 states
      maxAge: 25, 
      // Restrict extension to log-only mode
      logOnly: environment.production, 
       // Pauses recording actions and state changes 
       // when the extension window is not open
      autoPause: true,
      // ... other properties ...
    }),
  ],
```
__N.B.__ store dev tools e' best practice confinarlo solo negli ambienti non di produzione:
```ts
imports: [
  !environment.production ? StoreDevtoolsModule.instrument({
    // ... properties ...
  }) : [],
],
```

## 1. Definizione dello Stato

Definiamo lo stato globale della applicazione ovvero quello che vorremmo rendere persistente ed accessibile da qualsiasi componente.

<span id="appState"></span>
```ts
export interface OffersState {
  offers: Offer[];
  loadError: any;
}

export interface UserInfo {
  id: number;
  name: string;
  lastname: string;
  email: string;
  token: string;
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
```

## 2. Definizione Actions

Le Actions sono di fatto azioni alle quali piu' tardi binderemo le funzioni del reducer. Le azioni verranno poi 'dispatched' dal componente passandro le props definite:

<span id="actions"></span>
<small>Actions con props:</small>
```ts
export const setOffers = createAction(
  '[Offers API] Offers Loaded',
  props<{ offers: Offer[] }>()
);

export const updateTicketQuantity = createAction(
  '[Cart] Update Ticket Quantity',
  props<{ ticket: Ticket; quantity: number }>()
);
```
<span id="loadOffers"></span>
<small>Actions senza props:</small>
```ts
export const loadOffers = createAction('[Offers Page] Load Offers');
```
__N.B.__ Questa Action e' senza props perche', impostandola con l'intento di agganciarla ad una logica asincrona (chiamata HTTP), verra' collegata ad un effect

## 3. Definizione Effects

Un effect e' sostanzialmente un a funzione che viene lancianta ogni qual volta l'azione a cui e' bindato viene dispatchata, piu' o meno come il Rreducer. 

A differenza delle funzioni bindate su un Reducer (funzioni sincrone) gli __Effect__ gestiscono funzioni asincrone (chiamata a un'API, l'accesso a risorse esterne, o l'emissione di altre actions) e permettono di isolare effetti collaterali dal flusso di gestione principale.

<span id="OfferEffects"></span>
<small>Definzione Effects:</small>
```ts
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as AppActions from '../actions';

@Injectable()
export class OfferEffects {
  constructor(private actions$: Actions, private dummySvc: DummyService) {}

  loadOffers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadOffers), //binding alla nostra Action
      mergeMap(() =>
        this.dummySvc.getOffers().pipe( //chiamata asyncrona
          map((offers) => AppActions.setOffers({ offers: offers })),
          catchError((error) => //gestione degli errori
            //con dispatch di un'altra action
            of(AppActions.loadOfferFailure({ error: error }))
          )
        )
      )
    )
  );
}
```

## 3.1 Importare l'Effect

Una volta definito l'Effect va importato nell' app.module.ts

```
imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    EffectsModule.forRoot([OfferEffects])
  ],
```

## 4. Definizione del Reducer

Il reducer e' colui che gestisce la logica legata alle Action collegate. Le funzioni che gestiscono lo stato si basano non sulla modifica ma sulla sostuzione quindi restituiscono sempre un nuovo stato.

Allla funzione ```createReducer``` viene passato come primo parametro lo stato iniziale dell'entita' che vogliamo rendere persistente e nei parametri successivi passiamo le funzioni di handling delle varie Actions che vogliamo gestire. 

<span id="offersReducer"></span>
<small>Dichiarazione del __Reducer__:</small><br>
<small>Binding [setOffer](#actions) action:</small>
```ts
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
```
<small>-> Guarda qua le [Actions](#actions) se non le ricordi <- </small>

Data la Action ```AppActions.setOffers``` che richiede un __Offer[ ]__ come parametro, resituisce un nuovo stato di tipo ```OfferState```.

Come dicevamo prima l'action [loadOffers](#loadOffers) non la gestiamo nel Reducer ma con un Effect perche' richiede una funzone asincrona.

Vedi esempio di reducer con logica piu' complessa [CartReducer](./src/app/state/reducers/cart.reducer.ts).

## 4.1 Importare il Reducer

Sempre sull'```app.module.ts``` devo dichiarare tra gli import tutti i reducer che utilizzo:

```ts
StoreModule.forRoot({ offers: offersReducer, userInfo: UserInfoReducer, cart:CartReducer }),
```

## 5. Implementazione nel componente

Le due funzioni di base che ci permettono di
- Lanciare le funzioni che manipolano lo stato (dispatching delle Action)
- Leggere dallo store i dati richiesti

richiedo l'iniezione nel costruttore dello ```Store<T>``` tipizzato con l'[AppState](#appState) dichiarato all'inizio:

```ts
import { Store } from '@ngrx/store';

(...)

constructor(private store: Store<AppState>) {}
```

Con il quale poi possiamo:

<small>Dispatchare Actions:</small>
```ts
this.store.dispatch(loadOffers()); //senza props
this.store.dispatch(setUserInfo({ userInfo: userInfo })); //con props
```
<small>Leggere dallo store:</small>
```ts
this.store.select((state) => state.userInfo)
.subscribe((userInfo) => {
  this.userInfo = userInfo;
});
```

__N.B.__ ricordarsi di chiudere le subscription all'onDestroy del componente per evitare memory leak.

## 5.1 Caricare in asincrono una sola volta

Una implementazione chiave Redux e' quella di poter richiedere via chiamata HTTP dei dati, salvarli nello store, mantenerli nello store quando non vengono piu utilizzati per poi ri-renderizzarli quando nuovamente richiesti senza dover fare una seconda chiamata HTTP.

In questo caso voglio caricare le __Offers__ via chiamata HTTP, salvarle, e ripresentare quando richieste ma prelevandole dallo store senza dover fare un'ulteriore chiamata.

```ts

ngOnInit(): void {
    this.retrieveOffers();
}

private retrieveOffers() {
    this.store
      .select((state) => state.offers) //recupero le offers
      .pipe(
        take(1),
        tap((offersState) => {
          if (offersState.offers.length === 0) {
            this.store.dispatch(loadOffers());
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
      
      this.renderOffers(); //renderizzo le offers
  }

private renderOffers() {
  this.store
    .select((state) => state.offers)
    .pipe(takeUntil(this.destroy$))
    .subscribe((offersState) => {
      this.offers = offersState.offers;
    });
}
```

1. In questo caso riciedo allo __Store__ lo ```state``` delle Offers, che al "primo giro" mi rispondera con lo [stato iniziale](#offersReducer) che abbiamo definito nel Reducer quindi un array vuoto ```[]```.

2. Controllando quindi nell' ```if()``` che la lunghezza sia zero posso dispatchare l'[Action che carichera' le offerte](#OfferEffects) e una volta caricate le salvera' nello store globale.

3. Renderizzo le offers andandole a leggere dallo store dove sono state appena salvate.

4. Nel caso in cui l'utente navighi su un altra pagina, il nostro componente verra' distrutto, ma nel momento in cui il componente viene renderizzato di nuovo l' ```ngOnInit()``` verra' chiamato di nuovo:
    - l' ```if()``` controllera' la lunghezza dell'array di offers che sara' ```> 0```.
    - non verra' dispatchata l'Action che lancia la chiamata HTTP per caricarle.
    - verra' lanciata solo ```renderOffers()``` che pescandole dallo store riuscira; a renderizzarle senza problemi e molto piu velocemente.

Altra implementazione del [CartReducer](./src/app/Components/ticket/ticket.component.ts) su componente per la gestione del carrello.