import React from 'react';
import academy from '../../resources/images/11_Academy_Primary_Mark_RGB.png';
import fbgf from '../../resources/images/Full Belly Graphic White.png';
import fbw from '../../resources/images/Full Belly Footer 2022.jpg';
import { Menu, Container } from 'semantic-ui-react';

const Footer = () => {
  return (
    <div>
      <Container>
        <Menu className='ui bottom fluid three stackable menu'>
          <img className='ui centered small image' alt='enfd' src={academy} />
          <img className='ui centered large image' alt='enfd' src={fbw} />
          <img className='ui centered small image' alt='enfd' src={fbgf} />
        </Menu>
      </Container>
    </div>
  );
};

export default Footer;
