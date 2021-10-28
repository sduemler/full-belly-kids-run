import React from 'react';
import enfd from '../../resources/images/ENFD_youth Challange.png';
import fbgf from '../../resources/images/Full Belly Graphic White.png';
import fbw from '../../resources/images/Full Belly web5.png';

const Footer = () => {
  return (
    <div className='ui bottom fixed stackable menu'>
      <img className='ui centered small image' alt='enfd' src={enfd} />
      <img className='ui centered medium image' alt='enfd' src={fbw} />
      <img className='ui centered small image' alt='enfd' src={fbgf} />
    </div>
  );
};

export default Footer;
