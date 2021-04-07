import { ethers, Signer } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { config } from '../config/variables';
import { _abi } from '../interfaces/Erc20DetailedFactory';
import { ChainId, Token, WETH, Fetcher } from '@uniswap/sdk';

const { lpTokenAddress, mistTokenAddress, wethAddress, daiAddress } = config;

export async function getTokenBalances(
  signer: Signer,
  walletAddress: string,
  chainId: ChainId
) {
  const MIST = new Token(chainId, mistTokenAddress, 18, '⚗', 'Alchemist');
  const DAI = new Token(chainId, daiAddress, 18);

  const [
    mistBalance,
    lpBalance,
    lpMistBalance,
    lpWethBalance,
    totalLpSupply,
    wethPrice,
    mistPrice,
  ] = await Promise.all([
    new ethers.Contract(mistTokenAddress, _abi, signer).balanceOf(
      walletAddress
    ),
    new ethers.Contract(lpTokenAddress, _abi, signer).balanceOf(walletAddress),
    new ethers.Contract(mistTokenAddress, _abi, signer).balanceOf(
      lpTokenAddress
    ),
    new ethers.Contract(wethAddress, _abi, signer).balanceOf(lpTokenAddress),
    new ethers.Contract(lpTokenAddress, _abi, signer).totalSupply(),
    (
      await Fetcher.fetchPairData(DAI, WETH[DAI.chainId])
    ).token1Price.toSignificant(),
    (
      await Fetcher.fetchPairData(MIST, WETH[DAI.chainId])
    ).token1Price.toSignificant(),
  ]);
  return {
    mistBalance,
    lpBalance,
    cleanMist: formatUnits(mistBalance),
    cleanLp: formatUnits(lpBalance),
    lpMistBalance,
    lpWethBalance,
    totalLpSupply,
    wethPrice: Number(wethPrice),
    mistPrice: Number(wethPrice) / Number(mistPrice),
  };
}
