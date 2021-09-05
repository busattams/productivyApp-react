import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Col, Button, Form} from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { createCategory, listCategory } from '../actions/categoryAction';
import { NEW_CATEGORY_RESET } from '../constants/categoryConstants';


const NewCategory = () => {

   const dispatch = useDispatch();
   const [ category, setCategory ] = useState('');
   
   const newCategory = useSelector(state => state.newCategory);
   const { loading, error, success, category:createdCategory } = newCategory;
   
   useEffect(() => {
      if(success) {
         dispatch({type: NEW_CATEGORY_RESET})
         dispatch(listCategory());
         setCategory('');
      }
   }, [dispatch, createdCategory, success])

   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(createCategory({category})); // DO NOT FORGET THE {}
   }

   return (
      <>
         {loading ? (
            <Loader />
         ) : error ? (
            <Message variant='danger' childer={error} />
         ) : (
            <Col md={12} className='mt-4'>
               <Form onSubmit={submitHandler}  className='d-flex'>
                  <Form.Control type='text'
                     placeholder='Adicione um novo projeto'
                     required
                     value={category}
                     onChange={(e) => setCategory(e.target.value)}
                     className="me-3"
                  >  
                  </Form.Control>
                  <Button type='submit'>Adicionar</Button>
               </Form>
            </Col>
         )}
      </>
   );
}

export default NewCategory;