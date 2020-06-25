import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from './reducers';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

// memoized function - only executes if an input changes
// a mapping function with memory
export const isLoggedIn = createSelector(
  //state => state['auth'],
  selectAuthState,
  (auth) => !!auth.user
);

export const isLoggedOut = createSelector(
  isLoggedIn,
  loggedIn => !loggedIn
);
