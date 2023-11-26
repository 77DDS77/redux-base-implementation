import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { OffersPageComponent } from './Components/offers-page/offers-page.component';
import { SecondPageComponent } from './Components/second-page/second-page.component';
import { OfferComponent } from './Components/offer/offer.component';
import { StoreModule } from '@ngrx/store';
import { offersReducer } from './state/reducers/offers.reducer';
import { UserInfoReducer } from './state/reducers/user-info.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { OfferEffects } from './state/effects/offers.effect';
import { TicketComponent } from './Components/ticket/ticket.component';
import { CartReducer } from './state/reducers/cart.reducer';
import { CalendarComponent } from './Components/Calendar/calendar/calendar.component';

@NgModule({
  declarations: [AppComponent, OffersPageComponent, SecondPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OfferComponent,
    TicketComponent,
    StoreModule.forRoot({ offers: offersReducer, userInfo: UserInfoReducer, cart:CartReducer }),
    EffectsModule.forRoot([OfferEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states // Restrict extension to log-only mode in production
    }),
    CalendarComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
