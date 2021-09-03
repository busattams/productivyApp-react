import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {Row, Col, Card, ListGroup } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import NewCategory from '../components/NewCategory';
import Tasks from '../components/Tasks';
import { listCategory } from '../actions/categoryAction';
import TodayTasks from '../components/TodayTasks';

const HomeScreen = () => {

   const dispatch = useDispatch();

   const categoryList = useSelector(state => state.categoryList);
   const { loading, error, category } = categoryList;

   const categoryDelete = useSelector(state => state.deleteCategory);
   const { success:successDelete } = categoryDelete;

   useEffect(() => {
      dispatch(listCategory());
   }, [dispatch, successDelete]);

 

   return (
      <>
         {loading ? (
            <Loader />
         ) : error ? (
            <Message variant='danger' children={error} />
         ) : (
            <Row>

               <Col md={10} className='mx-auto'>
               <TodayTasks />
               <Card className='mt-5'>
                  <Card.Header><h3>Projetos</h3></Card.Header>
                  <ListGroup variant='flush'>
                     {category.map(category => (
                        <ListGroup.Item key={category._id} className='my-2'>
                           <LinkContainer to={`/category/${category._id}`}>
                              <a>{category.name}</a>
                           </LinkContainer>
                        </ListGroup.Item>
                     ))}
                  </ListGroup>
               </Card>
               <NewCategory />

               </Col>


            </Row>
         )}

        
      </>
   );
}

export default HomeScreen;