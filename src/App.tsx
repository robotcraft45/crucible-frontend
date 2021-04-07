import { useWeb3 } from './context/web3';
import { networkName } from './utils/network';

const App = () => {
  const {
    address,
    ethBalance,
    network,
    wallet,
    onboard,
    tokens,
    checkIsReady,
  } = useWeb3();

  const handleTransaction = async () => {
    const isReady = await checkIsReady();
    alert(isReady);
  };

  return (
    <div>
      <main>
        <header className='user-info'>
          {address && <span>{address}</span>} <br />
          {ethBalance != null && <span>{ethBalance} ETH</span>} <br />
          {network && <span>{networkName(network)} network</span>}
        </header>
        <section className='main'>
          <div className='container'>
            <h2>Onboarding Users with Onboard.js</h2>
            <div>
              {!wallet?.provider && (
                <button
                  className='bn-demo-button'
                  onClick={() => {
                    onboard?.walletSelect();
                  }}
                >
                  Select a Wallet
                </button>
              )}

              {wallet?.provider && (
                <button
                  className='bn-demo-button'
                  onClick={onboard?.walletCheck}
                >
                  Wallet Checks
                </button>
              )}

              {wallet?.provider && (
                <button
                  className='bn-demo-button'
                  onClick={() => onboard?.walletSelect()}
                >
                  Switch Wallets
                </button>
              )}

              {wallet?.provider && (
                <button className='bn-demo-button' onClick={handleTransaction}>
                  Transact
                </button>
              )}

              {wallet?.provider && (
                <button
                  className='bn-demo-button'
                  onClick={onboard?.walletReset}
                >
                  Reset Wallet State
                </button>
              )}
              {wallet?.provider && wallet?.dashboard && (
                <button className='bn-demo-button' onClick={wallet.dashboard}>
                  Open Wallet Dashboard
                </button>
              )}
              {wallet?.provider && wallet.type === 'hardware' && address && (
                <button
                  className='bn-demo-button'
                  onClick={onboard?.accountSelect}
                >
                  Switch Account
                </button>
              )}
            </div>
            <div>
              <h1>Token Balances</h1>
              {Object.keys(tokens).map((ta) => {
                const t = tokens[ta];
                console.log(t);
                return (
                  <div key={ta}>
                    {t.name} - {t.balance}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
