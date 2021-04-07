import { Image } from '@chakra-ui/image';
import { Link } from 'react-router-dom';
import { LinkOverlay, LinkBox } from '@chakra-ui/layout';
import logo from '../img/logo.png';
import React from 'react';

type Props = {
  widthList?: number[];
};

const Logo: React.FC<Props> = ({ widthList = [200] }) => {
  return (
    <LinkBox>
      <LinkOverlay as={Link} to='/'>
        <Image src={logo} width={widthList} alt='alchemist logo' />
      </LinkOverlay>
    </LinkBox>
  );
};

export default Logo;
