

import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Row, Col, Card, Button, Form, ListGroup, Modal } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import pt from 'date-fns/locale/pt';
import { format } from 'date-fns';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { addCommentTask, completeTask, deleteTask, getTask } from '../actions/tasksActions';

const CategoryScreen = ({ history, match }) => {

   const dispatch = useDispatch();

   const [ comment, setComment ] = useState('')

   const taskDetail = useSelector(state => state.getTask);
   const { loading, error, task } = taskDetail;

   const { success: successComplete } = useSelector(state => state.completeTask);
   const { success: successComment } = useSelector(state => state.commentTask);

   const taskId = match.params.id;
   useEffect(() => {
      dispatch(getTask(taskId));
   }, [dispatch, successComplete, successComment, taskId]);
   

   const completeTaskHandler = () => {
      dispatch(completeTask(task._id));
   } 

   const [show, setShow] = useState(false);
   const handleModal = () => setShow(!show);
   
   const [ showCommentModal, setShowCommentModal ] = useState(false);
   const handleCommentModal = () => setShowCommentModal(!showCommentModal);

   const deleteTaskHandler = () => {
      dispatch(deleteTask(task._id));
      history.push(`/category/${task.category._id}`)
   }

   const addCommentHandler = (e) => {
      e.preventDefault();
      dispatch(addCommentTask(task._id, {comment}));
      setComment('');
      setShowCommentModal(false);
   } 

   return (
      <>
      
      { loading ? <Loader /> : error ? <Message variant='danger' children={error} /> : (
         
         <Row>
            <Col md={10} className='mx-auto'>
               <Link className="btn btn-light my-1" to={`/category/${task.category._id}`}><i className="fas fa-chevron-left"></i> Voltar para Projeto</Link>
               <Card>
                  <Card.Body>
                     <Row>
                        <Col md={6}>
                           <Badge className={`bg-dark ${task.priority.toLowerCase()} me-2`}>{task.priority}</Badge>
                           <Badge className={`${task.completed ? 'baixa' : 'urgente'}`}>{task.completed ? 'FEITA' : 'NÃO FEITA'}</Badge>
                           <h1 className='mb-0'>{task.name}</h1>
                           <p className='fw-bolder mb-0'>Para: {format(new Date(task.date.toString()), "dd 'de' MMMM 'de' yyyy", { locale: pt })}</p>
                        </Col>
                        <Col md={6} className='text-md-center mt-md-0 mt-3'>
                           <Button variant='outline-success' className=' ms-auto' onClick={completeTaskHandler}>
                              <i className='fas fa-check'></i> {task.completed ? 'Marcar como não feito' :  "Marcar como feito"}
                           </Button><br />
                           <Button variant='outline-danger' className='mt-3 btn-delete ms-5 ms-md-0' onClick={handleModal}>
                              <i className='fas fa-trash'></i> Excluir tarefa
                           </Button>
                        </Col>
                     </Row>
                  </Card.Body>
               </Card>

               <Button className='mt-5 mb-3 d-block ms-auto' onClick={handleCommentModal}>
                     <i className='fas fa-plus'></i> Novo Comentário
               </Button>

               <Card className='mb-5'>
                  <Card.Header className='bg-dark'><h3>Comentários</h3></Card.Header>
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

            </Col>

               <Modal show={showCommentModal} onHide={handleCommentModal}>
                  <Modal.Body className='text-center pb-5 pt-4'>
                     <h4>Comentários</h4>
                     <Button variant="primary" className='closeBtn' onClick={handleCommentModal}>
                        <i className='fas fa-times'></i>
                     </Button>
                     <Form onSubmit={addCommentHandler} className='mb-4 mt-4'>
                        <Form.Group controlId='task'>
                           <Form.Control as='textarea'
                              rows='10'
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              required
                              >  
                           </Form.Control>
                           <Button type='submit' className='mt-3 btn-block'>Adicionar</Button>
                           <h6 className='text-center mt-4' onClick={handleCommentModal}>Cancelar</h6>
                        </Form.Group>
                     </Form>
                  </Modal.Body>
               </Modal>

               <Modal show={show} onHide={handleModal}>
                  <Modal.Body className='text-center p-5'>
                     <Button variant="primary" className='closeBtn' onClick={handleModal}>
                        <i className='fas fa-times'></i>
                     </Button>
                     <p className='fw-bold mb-4 mt-4'>Tem certeza que quer excluir essa tarefa? Isso não pode ser desfeito!</p>
                     <Button variant="primary" className='me-3' onClick={handleModal}>
                        Cancelar
                     </Button>
                     <Button variant="danger" onClick={deleteTaskHandler}>
                        Excluir
                     </Button>
                  </Modal.Body>
               </Modal>
         </Row>

      
      )}
      </>
   );
}

export default CategoryScreen;