import { useEffect } from 'react';
import { useCrucibles } from '../context/crucibles';
import { useWeb3 } from '../context/web3';
import MissingCrucibles from './missingCrucibles';

const CruciblesListView = () => {
  const { crucibles, reloadCrucibles } = useCrucibles();
  const { tokens } = useWeb3();

  useEffect(() => {
    reloadCrucibles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens]);

  if (crucibles && crucibles?.length === 0) {
    return <MissingCrucibles />;
  }

  return <div>{crucibles && crucibles?.length}</div>;
};

export default CruciblesListView;
