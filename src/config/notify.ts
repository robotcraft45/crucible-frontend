import Notify, { API as NotifyAPI } from 'bnc-notify';
import { config } from '../utils/config';

const { networkId, dappId } = config;

export function initNotify(): NotifyAPI {
  return Notify({
    dappId,
    networkId,
  });
}
