import React from 'react';
import AboutHero from '../components/about/abouthero';
import AboutStat from '../components/about/aboutstat';
import AboutInfo from '../components/about/aboutinfo';
import AboutBrand from '../components/about/aboutbrand';
import AboutJourney from '../components/about/aboutjourney';
import Certifications from '../components/common/certifications';


const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <AboutHero />
      <AboutStat />
      <AboutInfo />

      <AboutBrand />
      <AboutJourney />
      <div className="h-16 md:h-24" />
      <Certifications />
    </div>
  );
};

export default About;
