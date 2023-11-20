import { createReducer, on } from '@ngrx/store';
import { UserInfo } from 'src/app/Interfaces/interfaces';
import * as AppActions from '../actions';

export const initialState: UserInfo = {
  id: 0,
  name: '',
  lastname: '',
  email: '',
  token: '',
};

export const UserInfoReducer = createReducer(
  initialState,
  on(AppActions.setUserInfo, (state, { userInfo }) => userInfo)
);
