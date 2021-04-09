import React, { useState } from 'react';
import { truncate } from '../utils/address';
import { useHistory } from 'react-router-dom';
import { Button, IconButton } from '@chakra-ui/button';
import { Collapse } from '@chakra-ui/transition';
import { Crucible } from '../context/crucibles/crucibles';
import { Box, Flex, HStack, Text } from '@chakra-ui/layout';
import { IoChevronDownCircle, IoArrowRedoCircleSharp } from 'react-icons/io5';

type Props = {
  crucible: Crucible;
  isExpanded?: boolean;
};

const CrucibleCard: React.FC<Props> = ({ crucible, isExpanded }) => {
  const [showDetails, setShowDetails] = useState(isExpanded);
  const history = useHistory();

  return (
    <Box p={4} bg='white' color='gray.800' borderRadius='xl'>
      <Flex justifyContent='space-between' alignItems='center'>
        <Box flexGrow={1}>
          <HStack>
            <Box
              boxSize='38px'
              bgGradient='linear(to-tr, cyan.200, yellow.500)'
              borderRadius='md'
            />
            <Box textAlign='left'>
              <Text>ID: {truncate(crucible.id)}</Text>
              {/* TODO, make sure all the data is in context */}
              <Text fontSize='sm' color='gray.400'>
                Minted 3 March 2021
              </Text>
            </Box>
          </HStack>
        </Box>
        <Box>
          <IconButton
            aria-label='Manage crucible'
            size='sm'
            bg='none'
            fontSize='2xl'
            color='gray.300'
            icon={<IoArrowRedoCircleSharp />}
            onClick={() => history.push('/crucible', { crucible })}
            _hover={{ bg: 'none', color: 'gray.800' }}
            _active={{ bg: 'none' }}
          />
          <IconButton
            aria-label='Quick view'
            size='sm'
            bg='none'
            fontSize='2xl'
            color='gray.300'
            icon={<IoChevronDownCircle />}
            onClick={() => setShowDetails(!showDetails)}
            _hover={{ bg: 'none', color: 'gray.800' }}
            _active={{ bg: 'none' }}
          />
        </Box>
      </Flex>
      <Collapse in={showDetails}>
        {/* TODO */}
        <Text>Rewards go here</Text>
        <Button
          isFullWidth
          onClick={() => history.push('/crucible', { crucible })}
        >
          Manage crucible
        </Button>
      </Collapse>
    </Box>
  );
};

export default CrucibleCard;
