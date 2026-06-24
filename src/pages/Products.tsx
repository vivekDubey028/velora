import React from 'react';
import ProductHero from '../components/products/producthero';
import ProductsDisplayNew from '../components/products/ProductsDisplayNew';

const Products: React.FC = () => {
  return (
    <div style={{ background: '#f5f7fb', minHeight: '100vh' }}>
      <ProductHero />
      <ProductsDisplayNew />
    </div>
  );
};

export default Products;
