import React from 'react';
import { Spinner } from 'react-bootstrap';

const SmallLoader = () => {
   return (
      <Spinner 
         animation='border' 
         role='status' 
         style={{
            width: '30px',
            height: '30px',
            margin: 'auto',
            display: 'block'
         }}
      >
      </Spinner>
   )
}

export default SmallLoader;