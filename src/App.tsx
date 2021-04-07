import { Box, Flex } from '@chakra-ui/layout';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import bg from './img/bg.jpg';

const Header = () => {
  return <div>Header</div>;
};
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
      minHeight='100vh'
      flexDirection='column'
      backgroundSize='cover'
      backgroundPosition='center'
      backgroundRepeat='no-repeat'
      background={`url(${bg})`}
      position='relative'
      overflow='hidden'
      zIndex={0}
    >
      <Router>
        <Header />
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
        <Box flexGrow={1}>{children}</Box>
        <Footer />
      </Router>
    </Flex>
  );
};

export default App;
