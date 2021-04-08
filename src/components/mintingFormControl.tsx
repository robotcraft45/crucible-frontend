import { Button } from '@chakra-ui/button';
import { LightMode } from '@chakra-ui/color-mode';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { NumberInput, NumberInputField } from '@chakra-ui/number-input';
import {
  Slider,
  SliderThumb,
  SliderTrack,
  SliderFilledTrack,
} from '@chakra-ui/slider';
import { useState } from 'react';
import { config } from '../config/variables';
import { useWeb3 } from '../context/web3';

const MintingFormControl = () => {
  const [value, setValue] = useState(0);

  const handleChange = (value: number) => setValue(value);

  const handleNumberInputChange = (
    valueAsString: string,
    valueAsNumber: number
  ) => {
    handleChange(valueAsNumber || 0);
  };

  const { tokens } = useWeb3();
  const { lpTokenAddress } = config;

  return (
    <Box>
      <LightMode>
        <Box bg='white' p={4} mb={4} borderRadius='xl' color='gray.800'>
          <Flex mb={4} justifyContent='space-between' alignItems='center'>
            <Text>Select amount</Text>
            <Text>
              Balance:{' '}
              <strong>{tokens[lpTokenAddress].balance.toFixed(3)} LP</strong>
            </Text>
          </Flex>
          <Box>
            <NumberInput
              mb={4}
              size='lg'
              bg='gray.50'
              value={value}
              onChange={handleNumberInputChange}
              borderRadius='xl'
            >
              <NumberInputField
                fontSize='xl'
                fontWeight='bold'
                _hover={{
                  borderColor: 'gray.600',
                }}
                _focus={{
                  borderColor: 'gray.600',
                  borderWidth: '2px',
                }}
              />
            </NumberInput>
            <Box mb={4}>
              <Slider
                step={0.1}
                min={0}
                max={Number(tokens[lpTokenAddress].balance.toFixed(3))}
                value={value}
                onChange={handleChange}
                focusThumbOnChange={false}
              >
                <SliderTrack>
                  <SliderFilledTrack bg='gray.600' />
                </SliderTrack>
                <SliderThumb fontSize='sm' boxSize='18px' bg='yellow.400' />
              </Slider>
            </Box>
          </Box>
        </Box>
      </LightMode>
      <Button size='lg' isFullWidth disabled={!value}>
        Mint a crucible
      </Button>
    </Box>
  );
};

export default MintingFormControl;
