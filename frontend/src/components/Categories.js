import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {Card, ListGroup } from 'react-bootstrap';
import Message from './Message';
import SmallLoader from './SmallLoader';

const Categories = ({category, loading, error}) => {
   return (
      <Card className='mt-5'>
         <Card.Header className='bg-dark'><h3>Projetos</h3></Card.Header>
         {loading ? ( <SmallLoader  /> ) : 
            error ? ( <Message variant='danger' children={error} /> ) : ( 
               <ListGroup variant='flush' className='pt-3 px-2'>
                  {category.length === 0 && <Message variant='warning'>Nenhum projeto adicionado.</Message>}
                  {category.map(category => (
                     <ListGroup.Item key={category._id}>
                        <LinkContainer to={`/category/${category._id}`}>
                           <h4>{category.name}</h4>
                        </LinkContainer>
                     </ListGroup.Item>
                  ))}
               </ListGroup>
            )}
      </Card>
   )
}

export default Categories;