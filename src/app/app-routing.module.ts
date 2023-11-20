import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffersPageComponent } from './Components/offers-page/offers-page.component';
import { SecondPageComponent } from './Components/second-page/second-page.component';

const routes: Routes = [
  {
    path: '',
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
