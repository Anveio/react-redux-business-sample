import * as constants from '../constants';

export interface ConnectAccount {
  type: constants.CONNECT_ACCOUNT;
  user: UserState;
}

export interface DisconnectAccount {
  type: constants.DISCONNECT_ACCOUNT;
}

export type AccountConnectionAction = DisconnectAccount | ConnectAccount;

export const connectAccount = (user: UserState) => ({
  type: constants.CONNECT_ACCOUNT,
  user
});

export const disconnectAccount = () => ({
  type: constants.DISCONNECT_ACCOUNT
});
