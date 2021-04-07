import { Flex, Box } from '@chakra-ui/layout';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header';
import bg from './img/bg.jpg';

const Footer = () => {
  return <div>Footer</div>;
};
const Landing = () => {
  return <div>Landing</div>;
};
const CrucibleMinting = () => {
  return <div>Crucible Minting</div>;
};
const Crucible = () => {
  return <div>Crucible</div>;
};
const FAQ = () => {
  return <div>FAQ</div>;
};
const NoMatch = () => {
  return <div>No Match</div>;
};

const App: React.FC = ({ children }) => {
  return (
    <Flex
      px={4}
      minHeight='100vh'
      flexDirection='column'
      background={`url(${bg})`}
      backgroundPosition='center'
      backgroundRepeat='no-repeat'
      backgroundSize='cover'
    >
      <Router>
        <Header />
        <Box flexGrow={1}>
          <Switch>
            <Route exact path={process.env.PUBLIC_URL + '/'}>
              <Landing />
            </Route>
            <Route exact path={process.env.PUBLIC_URL + '/crucible-minting'}>
              <CrucibleMinting />
            </Route>
            <Route exact path={process.env.PUBLIC_URL + '/crucible'}>
              <Crucible />
            </Route>
            <Route exact path={process.env.PUBLIC_URL + '/faqs'}>
              <FAQ />
            </Route>
            <Route path='*'>
              <NoMatch />
            </Route>
          </Switch>
        </Box>
        <Footer />
      </Router>
    </Flex>
  );
};

export default App;
