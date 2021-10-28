import React from 'react';
import enfd from '../../resources/images/ENFD_youth Challange.png';
import fbgf from '../../resources/images/Full Belly Graphic White.png';
import fbw from '../../resources/images/Full Belly web5.png';
import { Menu, Container } from 'semantic-ui-react';

const Footer = () => {
  return (
    <div>
      <Container>
        <Menu className='ui bottom fluid three stackable menu'>
          <img className='ui centered small image' alt='enfd' src={enfd} />
          <img className='ui centered large image' alt='enfd' src={fbw} />
          <img className='ui centered small image' alt='enfd' src={fbgf} />
        </Menu>
      </Container>
    </div>
  );
};

export default Footer;
