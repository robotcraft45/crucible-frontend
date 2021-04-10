import { API as NotifyAPI } from 'bnc-notify';

export const notifyTxStep = (notify: NotifyAPI | undefined, step: number) => {
  switch (step) {
    case 1:
      notify?.notification({
        eventCode: 'sign_lock',
        type: 'hint',
        message:
          'You have signed 1 of 2 signatures, please sign the next signature.',
      });
      break;
    case 2:
      notify?.notification({
        eventCode: 'mint_deposit_stake',
        type: 'hint',
        message:
          'You have signed all signatures, your transaction is waiting for you to confirm.',
      });
  }
};

export const notifyTxCancelled = (
  notify: NotifyAPI | undefined,
  message: string
) => {
  notify?.notification({
    eventCode: 'sign_rejected',
    type: 'error',
    message,
  });
};
