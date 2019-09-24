import React from 'react';

import ContentWrapper from '../components/ContentWrapper';
import Contacts from '../components/Contacts';
import Map from '../components/Map';

function Contact() {
  return (
    <div className="contact">
      <ContentWrapper>
        <Contacts/>
      </ContentWrapper>
      <Map/>
    </div>
  );
};

export default Contact;