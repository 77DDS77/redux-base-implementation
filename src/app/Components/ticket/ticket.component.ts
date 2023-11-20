import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Offer, Ticket } from 'src/app/Interfaces/interfaces';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { addToCart, removeFromCart, updateTicketQuantity } from 'src/app/state/actions';
import { take, tap } from 'rxjs';

@Component({
  selector: 'ticket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent {
  
  @Input() offer!: Offer;
  public ticketAmount:number = 0;

  constructor(private store: Store<AppState>){}

  public addToCart(){    
    if(this.ticketAmount < 0) return;

    let ticket:Ticket = {
      id:`${this.offer.name}-${this.offer.name.length}`,
      date: Date.now(),
      quantity: this.ticketAmount,
      offer:this.offer,
      price:this.offer.price
    }

    this.store.select(state => state.cart)
    .pipe(
      take(1),
      tap(cartState => {
        if(cartState.tickets.find(t => t.offer.id === this.offer.id)){    
          if(this.ticketAmount === 0) {
            this.store.dispatch(removeFromCart({ ticketId:ticket.id}))
          } else {
            this.store.dispatch(updateTicketQuantity({ticket:ticket, quantity:this.ticketAmount}))
          }     
        }else {
          this.store.dispatch(addToCart({ticket:ticket}))
        }
      })
    ).subscribe()
  }

}
