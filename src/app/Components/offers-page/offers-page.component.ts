import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, take, takeUntil, tap } from 'rxjs';
import { Offer, UserInfo } from 'src/app/Interfaces/interfaces';
import { DummyService } from 'src/app/Services/dummy.service';
import { loadOffers, setUserInfo } from 'src/app/state/actions';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-offers-page',
  templateUrl: './offers-page.component.html',
  styleUrls: ['./offers-page.component.scss'],
})
export class OffersPageComponent implements OnInit, OnDestroy {
  public offers: Offer[] = [];
  public userInfo!: UserInfo;
  private destroy$ = new Subject<void>();
  public error$ = this.store.select((state) => state.offers.loadError);

  constructor(private dummySvc: DummyService, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.retrieveOffers();
    this.retrieveuserInfo();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private retrieveOffers() {
    this.store
      .select((state) => state.offers)
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

      this.renderOffers();
  }

  private renderOffers() {
    this.store
      .select((state) => state.offers)
      .pipe(takeUntil(this.destroy$))
      .subscribe((offersState) => {
        this.offers = offersState.offers;
      });
  }

  public reloadOffers() {
    this.store.dispatch(loadOffers());
  }

  private retrieveuserInfo() {
    this.store
      .select((state) => state.userInfo)
      .pipe(
        take(1),
        tap((info) => {
          if (info.id == 0 && info.name == '' && info.token == '') {
            this.dummySvc.getUserInfo().subscribe((userInfo) => {
              console.log(userInfo);
              this.store.dispatch(setUserInfo({ userInfo: userInfo }));
              this.userInfo = userInfo;
            });
          }
        })
      )
      .subscribe((info) => {
        this.userInfo = info;
      });
  }

  private userInfoFromStore() {
    this.store
      .select((state) => state.userInfo)
      .subscribe((userInfo) => {
        this.userInfo = userInfo;
      });
  }
}
