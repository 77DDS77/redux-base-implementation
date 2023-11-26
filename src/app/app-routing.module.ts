import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffersPageComponent } from './Components/offers-page/offers-page.component';
import { SecondPageComponent } from './Components/second-page/second-page.component';
import { CalendarComponent } from './Components/Calendar/calendar/calendar.component';

const routes: Routes = [
  {
    path:'',
    component:CalendarComponent
  },
  {
    path: 'offers/redux-test',
    component: OffersPageComponent,
  },
  {
    path: 'second-page',
    component: SecondPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
