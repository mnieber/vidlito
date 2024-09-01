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
  @observable accessor cookiePreferences: CookiePreferencesT = {};

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

  get lastUrl(): string | undefined {
    const result = Cookies.get('lastUrl');
    return result === '' ? undefined : result;
  }

  setLastUrl(lastUrl: string | undefined) {
    if (acceptsFunctionalCookies()) {
      Cookies.set('lastUrl', lastUrl ?? '');
    }
  }

  constructor() {
    makeObservable(this);
    runInAction(() => {
      if (acceptsFunctionalCookies()) {
        this.cookiePreferences.functionalCookies = true;
      }
      if (rejectsFunctionalCookies()) {
        this.cookiePreferences.functionalCookies = false;
      }
    });
  }
}

export const cookiesState = new CookiesState();

export function rejectsFunctionalCookies() {
  return Cookies.get('acceptFunctionalCookies') === '0';
}

export function acceptsFunctionalCookies() {
  return Cookies.get('acceptFunctionalCookies') === '1';
}
