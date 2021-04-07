import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { useWeb3 } from '../context/web3';
import { truncate } from '../utils/address';
import { FaPowerOff } from 'react-icons/fa';

const UserWallet = () => {
  const { address, onboard } = useWeb3();

  return (
    <Button
      onClick={() => onboard?.walletSelect()}
      rightIcon={
        address ? (
          <FaPowerOff onClick={() => onboard?.walletReset()} />
        ) : undefined
      }
    >
      {address ? <Box mr={2}>{truncate(address)}</Box> : 'Connect'}
    </Button>
  );
};

export default UserWallet;
