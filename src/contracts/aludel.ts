import { ethers, Signer } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { config } from '../utils/config';
import { aludelAbi } from '../abi/aludelAbi';

const { aludelAddress } = config;

export async function getNetworkStats(signer: Signer) {
  const aludel = new ethers.Contract(aludelAddress, aludelAbi, signer);
  const [
    ,
    ,
    ,
    rewardScaling, // arrray of big numbers, floor ceiling time
    rewardSharesOutstanding,
    totalStake,
    totalStakeUnits,
    lastUpdate,
    rewardSchedules,
  ] = await aludel.getAludelData();

  const [duration, start, shares] = rewardScaling;
  const [floor, ceiling, time] = rewardSchedules[0];
  return {
    duration: duration.toNumber(),
    start: start.toNumber(),
    shares: formatUnits(shares),
    floor: formatUnits(floor),
    ceiling: formatUnits(ceiling),
    time: formatUnits(time),
    rewardSharesOutstanding: formatUnits(rewardSharesOutstanding),
    totalStake: formatUnits(totalStake),
    totalStakeUnits: formatUnits(totalStakeUnits),
    lastUpdate: lastUpdate.toNumber(),
  };
}
