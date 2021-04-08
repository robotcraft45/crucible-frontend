import { Flex } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { useCrucibles } from '../context/crucibles';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';

const MintingForm = () => {
  return <div>Minting form</div>;
};

const CruciblesListView = () => {
  return <div>Crucibles list view</div>;
};

const MintingTabs = () => {
  const { crucibles, isLoading } = useCrucibles();

  if (isLoading) {
    return (
      <Flex justifyContent='center' alignItems='center' flexGrow={1}>
        <Spinner />
      </Flex>
    );
  }

  return (
    <Tabs defaultIndex={crucibles && crucibles.length > 0 ? 1 : 0}>
      <TabList>
        <Tab>Mint</Tab>
        <Tab>Crucibles</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <MintingForm />
        </TabPanel>
        <TabPanel>
          <CruciblesListView />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default MintingTabs;
