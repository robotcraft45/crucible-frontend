import Notify, { API as NotifyAPI } from 'bnc-notify';
import { config } from './variables';

const { networkId, dappId } = config;

export function initNotify(): NotifyAPI {
  return Notify({
    dappId,
    networkId,
  });
}
