import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer, UserInfo } from '../Interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DummyService {
  constructor(private http: HttpClient) {}

  public getOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>('../../assets/dummyData/offers.json');
  }

  public getUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>('../../assets/dummyData/userInfo.json');
  }
}
