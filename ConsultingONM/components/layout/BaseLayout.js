import React from 'react';
import Meta from '../shared/Meta';

const BaseLayout = ({ children }) => {
  return (
    <>
      <Meta />
      {children}
    </>
  );
};

export default BaseLayout;
