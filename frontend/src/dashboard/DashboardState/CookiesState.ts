import Cookies from 'js-cookie';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';

export type CookiePreferencesT = {
  functionalCookies?: boolean;
};

export class CookiesState {
  @observable cookiePreferences: CookiePreferencesT = {};

  @action setCookiePreferences(cookiePreferences: CookiePreferencesT) {
    this.cookiePreferences = cookiePreferences;
    Cookies.set(
      'acceptFunctionalCookies',
      cookiePreferences.functionalCookies ? '1' : '0'
    );
  }

  @computed get hasSetCookiePreferences() {
    return this.cookiePreferences.functionalCookies !== undefined;
  }

  constructor() {
    makeObservable(this);
    runInAction(() => {
      if (Cookies.get('acceptFunctionalCookies') === '1') {
        this.cookiePreferences.functionalCookies = true;
      }
      if (Cookies.get('acceptFunctionalCookies') === '0') {
        this.cookiePreferences.functionalCookies = false;
      }
    });
  }
}
