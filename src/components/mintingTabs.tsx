import { Flex } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { useCrucibles } from '../context/crucibles';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import MintingForm from './mintingForm';
import CruciblesListView from './cruciblesListView';

const MintingTabs = () => {
  const { crucibles, isLoading } = useCrucibles();

  const tabProps = {
    borderRadius: 'lg',
    fontWeight: 'bold',
    _selected: { color: 'gray.800', bg: 'cyan.500' },
  };

  if (isLoading) {
    return (
      <Flex justifyContent='center' alignItems='center' flexGrow={1}>
        <Spinner />
      </Flex>
    );
  }

  return (
    <Tabs isFitted defaultIndex={crucibles && crucibles.length > 0 ? 1 : 0}>
      <TabList bg='gray.700' borderRadius='xl' border='none' p={2}>
        <Tab {...tabProps}>Mint</Tab>
        <Tab {...tabProps}>Crucibles</Tab>
      </TabList>

      <TabPanels>
        <TabPanel px={0}>
          <MintingForm />
        </TabPanel>
        <TabPanel px={0}>
          <CruciblesListView />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default MintingTabs;
