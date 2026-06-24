import React from 'react';
import ContactHero from '../components/contact/ContactHero';
import ContactForm from '../components/contact/ContactForm';
import ContactCTABanner from '../components/contact/ContactCTABanner';
import Certifications from '../components/common/certifications';

const Contact: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <ContactHero />
      <ContactForm />
      <ContactCTABanner />
      <Certifications hideCta />
    </div>
  );
};

export default Contact;
