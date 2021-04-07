import { SimpleGrid, Box, Flex } from '@chakra-ui/layout';
import UserBalance from './userBalance';
import UserWallet from './userWallet';
import Logo from './logo';

const Header = () => {
  return (
    <SimpleGrid columns={3} py={4}>
      <Box>
        <Logo />
      </Box>
      <Box>
        <Flex justifyContent='center'>
          <UserBalance />
        </Flex>
      </Box>
      <Box>
        <Flex justifyContent='flex-end'>
          <UserWallet />
        </Flex>
      </Box>
    </SimpleGrid>
  );
};

export default Header;
