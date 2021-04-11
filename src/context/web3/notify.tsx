import * as React from 'react';
import { API as NotifyAPI } from 'bnc-notify';
import { useState, useEffect } from 'react';
import { initNotify } from '../../config/notify';
import { networkName } from '../../utils/network';
import { useWeb3 } from '.';

type Transaction = {
  hash?: string;
};

type NotifyContextProps = {
  children: React.ReactNode;
};

type Web3ContextType = {
  monitorTx(hash: string): Promise<void>;
};

const NotifyContext = React.createContext<Web3ContextType | undefined>(
  undefined
);

const NotifyProvider = ({ children }: NotifyContextProps) => {
  const { network } = useWeb3();
  const [pendingTxs, setPendingTxs] = useState<Transaction[]>([]);
  const [notify, setNotify] = useState<NotifyAPI | undefined>(undefined);

  useEffect(() => {
    const notify = initNotify();
    setNotify(notify);
  }, []);

  async function monitorTx(hash: string) {
    if (notify && network) {
      const { emitter } = notify.hash(hash);
      emitter.on('txPool', (transaction: Transaction) => {
        setPendingTxs([...pendingTxs, { ...transaction }]);
        return {
          message: `Your transaction is pending, click <a href="https://${networkName(
            network
          )}.etherscan.io/tx/${
            transaction.hash
          }" rel="noopener noreferrer" target="_blank">here</a> for more info.`,
        };
      });

      emitter.on('txSent', console.log);
      emitter.on('txConfirmed', (transaction) => {
        setPendingTxs(pendingTxs.filter((tx) => tx.hash !== transaction.hash));
        console.log(transaction);
      });
      emitter.on('txSpeedUp', console.log);
      emitter.on('txCancel', (transaction) => {
        setPendingTxs(pendingTxs.filter((tx) => tx.hash !== transaction.hash));
        console.log(transaction);
      });
      emitter.on('txFailed', (transaction) => {
        setPendingTxs(pendingTxs.filter((tx) => tx.hash !== transaction.hash));
        console.log(transaction);
      });
    } else {
      console.log('Notify not initialized');
    }
  }

  return (
    <NotifyContext.Provider
      value={{
        monitorTx,
      }}
    >
      {pendingTxs.length > 0 && pendingTxs.length}
      {children}
    </NotifyContext.Provider>
  );
};

const useNotify = () => {
  const context = React.useContext(NotifyContext);
  if (context === undefined) {
    throw new Error('useNotify must be used within a NotifyProvider');
  }
  return context;
};

export { NotifyProvider, useNotify };
