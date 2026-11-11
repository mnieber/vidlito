import { action, computed, makeObservable, observable } from 'mobx';
import * as R from 'ramda';
import { AllauthFieldErrorsT } from '/src/api/utils/allauth';
import { States } from '/src/auth/endpoints/states';
import { ObjT } from '/src/utils/types';

const lutSuccess = {
  signIn: States.SIGN_IN_SUCCEEDED,
  loadUserId: States.LOAD_USER_ID_SUCCEEDED,
  signUp: States.SIGN_UP_SUCCEEDED,
  requestPasswordReset: States.REQUEST_PASSWORD_RESET_SUCCEEDED,
  resetPassword: States.RESET_PASSWORD_SUCCEEDED,
  verifyEmail: States.VERIFY_EMAIL_SUCCEEDED,
  signOut: States.SIGN_OUT_SUCCEEDED,
};

const lutFailure = {
  signIn: States.SIGN_IN_FAILED,
  loadUserId: States.LOAD_USER_ID_FAILED,
  signUp: States.SIGN_UP_FAILED,
  requestPasswordReset: States.REQUEST_PASSWORD_RESET_FAILED,
  resetPassword: States.RESET_PASSWORD_FAILED,
  verifyEmail: States.VERIFY_EMAIL_FAILED,
  signOut: States.SIGN_OUT_FAILED,
};

export class AuthState {
  @observable errors: string[] = [];
  @observable initialState: string;
  @observable state: string;
  @observable details: ObjT = {};
  // The messages of allauth for each field (see States.INVALID_FIELDS)
  @observable fieldErrors: AllauthFieldErrorsT = {};

  constructor(initialState: string) {
    makeObservable(this);
    this.state = this.initialState = initialState;
  }

  @computed get hasErrors() {
    return !R.isEmpty(this.errors);
  }

  @action reset = () => {
    this.errors = [];
    this.state = this.initialState;
    this.details = {};
    this.fieldErrors = {};
  };

  isTrackedQuery = (queryName: string) => {
    return [
      'signIn',
      'signUp',
      'requestPasswordReset',
      'resetPassword',
      'verifyEmail',
      'signOut',
    ].includes(queryName);
  };

  @action onUpdated(queryName: string, data: ObjT) {
    if (this.isTrackedQuery(queryName)) {
      this.errors = data.errors ?? [];
      this.fieldErrors = data.fieldErrors ?? {};
      this.state =
        data.errors && data.errors.length > 0
          ? (lutFailure[queryName as keyof typeof lutFailure] as string)
          : (lutSuccess[queryName as keyof typeof lutSuccess] as string);
    }
  }

  @action onUpdating(queryName: string) {
    if (this.isTrackedQuery(queryName)) {
      this.reset();
    }
  }

  @action onErrored(queryName: string, message: string) {
    if (this.isTrackedQuery(queryName)) {
      this.details = { message: message };
      this.errors = [lutFailure[queryName as keyof typeof lutFailure]];
      this.state = lutFailure[queryName as keyof typeof lutSuccess];
    }
  }
}
