import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Offer } from 'src/app/Interfaces/interfaces';
import { TicketComponent } from '../ticket/ticket.component';

@Component({
  selector: 'offer',
  standalone: true,
  imports: [CommonModule, TicketComponent],
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent {
  @Input() offer!: Offer;
  public mostraTicket:boolean = false;
}
