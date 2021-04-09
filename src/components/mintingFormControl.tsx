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
import { useToast } from '@chakra-ui/toast';
import { Signer } from '@ethersproject/abstract-signer';
import { providers } from 'ethers';
import { useState } from 'react';
import { config } from '../config/variables';
import { useNotify, useWeb3 } from '../context/web3';
import { mintAndLock } from '../contracts/alchemist';

const MintingFormControl = () => {
  const [step, setStep] = useState(0);
  const [value, setValue] = useState('0');
  const { checkIsReady, provider } = useWeb3();
  const { monitorTx } = useNotify();
  const toast = useToast();

  const handleChange = (value: number) => setValue(value.toString());

  const handleNumberInputChange = (valueAsString: string) => {
    if (isNaN(+valueAsString)) return;
    setValue(valueAsString);
  };

  // TODO add a message to the signature request
  const handleMintCrucible = async () => {
    const isReady = await checkIsReady();

    if (isReady) {
      try {
        const lpBalance = value.toString();
        const signer = provider?.getSigner() as Signer;
        const incrementStep = () => setStep((currStep) => currStep + 1);
        const hash: string = await mintAndLock(
          signer,
          provider as providers.Web3Provider,
          lpBalance,
          incrementStep
        );
        monitorTx(hash);
        setStep(0);
      } catch (e) {
        toast({
          title: 'Error',
          position: 'top',
          description: e.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        setStep(0);
      }
    }
  };

  const { tokens } = useWeb3();
  const { lpTokenAddress } = config;

  const isDisabled = () => {
    return (
      !value ||
      value === '0' ||
      step > 0 ||
      Number(value) > Number(tokens[lpTokenAddress].balance)
    );
  };

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
                value={Number(value)}
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
        {step > 0 && (
          <Box mb={4}>
            Signed <strong>{step}</strong> of <strong>3</strong> transactions
          </Box>
        )}
      </LightMode>
      <Button
        size='lg'
        isFullWidth
        disabled={isDisabled()}
        onClick={handleMintCrucible}
      >
        Mint a crucible
      </Button>
    </Box>
  );
};

export default MintingFormControl;
