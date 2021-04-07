import * as React from 'react';
import { BigNumber } from 'ethers';
import { useWeb3 } from '../web3';
import { useState, useEffect } from 'react';
import { formatUnits } from 'ethers/lib/utils';
import { getTokenBalances } from '../../contracts/getTokenBalances';
import { getOwnedCrucibles } from '../../contracts/getOwnedCrucibles';
import { getUniswapBalances } from '../../contracts/getUniswapTokenBalances';

type Crucible = {
  id: string;
  balance: string | any;
  lockedBalance: string;
  owner: string;
  cleanBalance?: string;
  cleanLockedBalance?: string;
  cleanUnlockedBalance?: any;
};

type TokenBalances = {
  lpMistBalance: BigNumber;
  lpWethBalance: BigNumber;
  totalLpSupply: BigNumber;
  mistBalance: BigNumber;
  lpBalance: BigNumber;
  wethPrice: number;
  mistPrice: number;
  cleanMist: string;
  cleanLp: string;
};

type CruciblesProps = {
  children: React.ReactNode;
};

type CruciblesContextType = {
  crucibles: Crucible[];
  tokenBalances: TokenBalances | undefined;
  reloadCrucibles(): void;
};

const Crucibles = React.createContext<CruciblesContextType | undefined>(
  undefined
);

const CruciblesProvider = ({ children }: CruciblesProps) => {
  const { provider, wallet, address, network } = useWeb3();
  const [refreshCrucibles, setRefreshCrucibles] = useState<boolean>(false);
  const [tokenBalances, setTokenBalances] = useState<TokenBalances | undefined>(
    undefined
  );
  const [crucibles, setCrucibles] = useState<Crucible[]>([]);

  useEffect(() => {
    if (provider && wallet && network && address) {
      const signer = provider?.getSigner();
      getTokenBalances(signer, address as string, network).then(
        (balances: any) => {
          setTokenBalances(balances);
        }
      );
    } else {
      setCrucibles([]);
      setTokenBalances(undefined);
    }
  }, [provider, wallet, network, address]);

  useEffect(() => {
    if (tokenBalances && provider && network) {
      const signer = provider?.getSigner();
      getOwnedCrucibles(signer, provider).then((ownedCrucibles: Crucible[]) => {
        let reformatted = ownedCrucibles.map((crucible) => ({
          ...crucible,
          cleanBalance: formatUnits(crucible.balance),
          cleanLockedBalance: formatUnits(crucible.lockedBalance),
          cleanUnlockedBalance: formatUnits(
            crucible.balance.sub(crucible.lockedBalance)
          ),
          mistPrice: tokenBalances.mistPrice,
          wethPrice: tokenBalances.wethPrice,
          ...getUniswapBalances(
            crucible.balance,
            tokenBalances.lpMistBalance,
            tokenBalances.lpWethBalance,
            tokenBalances.totalLpSupply,
            tokenBalances.wethPrice,
            tokenBalances.mistPrice,
            network
          ),
        }));
        setCrucibles(reformatted);
      });
      setRefreshCrucibles(false);
    }
  }, [tokenBalances, provider, network, refreshCrucibles]);

  const reloadCrucibles = () => {
    setRefreshCrucibles(true);
  };

  return (
    <Crucibles.Provider
      value={{
        crucibles,
        tokenBalances,
        reloadCrucibles,
      }}
    >
      {children}
    </Crucibles.Provider>
  );
};

const useCrucibles = () => {
  const context = React.useContext(Crucibles);
  if (context === undefined) {
    throw new Error('useCrucibles must be used within a CruciblesProvider');
  }
  return context;
};

export { CruciblesProvider, useCrucibles };
