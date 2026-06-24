import React from 'react';
import PreHero from '../components/home/prehero';
import Glance from '../components/home/glance';
import Commitment from '../components/home/commitment';
import MapSection from '../components/common/map-section';
import Gallery from '../components/home/gallery';
import Certifications from '../components/common/certifications';
import Products from '../components/products/products';
import Insights from '../components/home/insights';

const Home: React.FC = () => {
  return (
    <>
      <PreHero />
      <Glance />
      <Commitment />
      <MapSection />
      <Gallery />
      <Certifications />
      <Products />
      <Insights />
    </>
  );
};

export default Home;
