

import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Row, Col, Card, Button, Form, ListGroup } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import { LinkContainer } from 'react-router-bootstrap';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from 'date-fns/locale/pt';
import { format } from 'date-fns';
import { registerLocale, setDefaultLocale } from  "react-datepicker";

import Loader from '../components/Loader';
import SmallLoader from '../components/SmallLoader';
import Message from '../components/Message';
import { addCommentTask, completeTask, deleteTask, getTask } from '../actions/tasksActions';

setDefaultLocale('pt');
registerLocale('pt', pt);

const CategoryScreen = ({ history, match }) => {

   const dispatch = useDispatch();

   const [ comment, setComment ] = useState('')

   const taskDetail = useSelector(state => state.getTask);
   const { loading, error, task } = taskDetail;

   const { success: successComplete } = useSelector(state => state.completeTask);
   const { success: successComment } = useSelector(state => state.commentTask);

   useEffect(() => {
      dispatch(getTask(match.params.id));
   }, [dispatch, successComplete, successComment]);
   

   const completeTaskHandler = () => {
      dispatch(completeTask(task._id));
   } 

   const deleteTaskHandler = () => {
      if(window.confirm('Tem certeza? Isso não pode ser desfeito.')) { 
         dispatch(deleteTask(task._id));
         history.push(`/category/${task.category._id}`)
      }
   }

   const addCommentHandler = (e) => {
      e.preventDefault();
      dispatch(addCommentTask(task._id, {comment}));
   } 

   return (
      <>
      
      { loading ? <Loader /> : error ? <Message variant='danger' children={error} /> : (
         
         <Row>
            <Col md={12}>
            <Link className="btn btn-light my-1" to={`/category/${task.category._id}`}><i className="fas fa-chevron-left"></i> Voltar para Projeto</Link>
            </Col>

            <Col md={10} className='mx-auto'>

               <Card bg='light'>
                  <Card.Body>
                     <Row>
                        <Col md={8}>
                           <h1 className='mb-0'>{task.name}</h1>
                           <p className='fw-bold mb-0'>Para: {format(new Date(task.date.toString()), "dd 'de' MMMM 'de' yyyy", { locale: pt })}</p>
                           <Badge className={`bg-dark ${task.priority.toLowerCase()} me-2`}>{task.priority}</Badge>
                           <Badge className={`bg-dark ${task.completed}`}>{task.completed ? 'FEITA' : 'NÃO FEITA'}</Badge>
                        </Col>
                        <Col md={4} className='text-center'>
                        <Button variant='outline-success' className='btn-sm ms-auto' onClick={completeTaskHandler}>
                              <i className='fas fa-check'></i> {task.completed ? 'Marcar como não feito' :  "Marcar como feito"}
                           </Button><br />
                           <Button variant='outline-danger' className='btn-sm  mt-3 btn-delete' onClick={deleteTaskHandler}>
                              <i className='fas fa-trash'></i> Excluir tarefa
                           </Button>
                        </Col>
                     </Row>
                  </Card.Body>
               </Card>

               <Card className='my-5'>
                  <Card.Header><h3>Comentários</h3></Card.Header>
                  <Card.Body>
                     <ListGroup variant='flush'>
                        {task.comments.length === 0 ? <Message>Sem comentários</Message> : (
                           task.comments.map(comment => (
                              <ListGroup.Item key={comment._id}>
                                 <strong>{format(new Date(comment.date.toString()), "Pp", { locale: pt })}</strong>
                                 <p>{comment.comment}</p>
                              </ListGroup.Item>
                           ))
                        )}
                     </ListGroup>
                  </Card.Body>
               </Card>

               <Form onSubmit={addCommentHandler} className='mb-4'>
                  <Form.Group controlId='task'>
                     <Form.Label>Comentários</Form.Label>
                     <Form.Control as='textarea'
                        rows='5'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                        >  
                     </Form.Control>
                     <Button type='submit' className='mt-3'>Adicionar</Button>
                  </Form.Group>
               </Form>
               </Col>
         </Row>

      
      )}
      </>
   );
}

export default CategoryScreen;