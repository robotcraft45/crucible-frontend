import { Image } from '@chakra-ui/image';
import { Box, Heading, Link, Text } from '@chakra-ui/layout';
import { config } from '../config/variables';
import pot from '../img/pot.png';

const MissingIngredients = () => {
  const { uniswapPoolUrl } = config;
  return (
    <Box textAlign='center'>
      <Image src={pot} height='220px' htmlHeight='220px' mx='auto' my={8} />
      <Heading size='lg'>Missing ingredients</Heading>
      <Text color='gray.200' my={3}>
        It looks like you have no Liquidty Pool tokens. You need LP tokens to
        mint a crucible.{' '}
        <Link color='blue.400' href={uniswapPoolUrl}>
          Get LP tokens on uniswap.
        </Link>
      </Text>
    </Box>
  );
};

export default MissingIngredients;
