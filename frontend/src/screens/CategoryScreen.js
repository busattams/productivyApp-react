import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {Row, Col, Card, Button, Form, ListGroup, Modal  } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from 'date-fns/locale/pt';
import { format } from 'date-fns';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import Loader from '../components/Loader';
import SmallLoader from '../components/SmallLoader';
import Message from '../components/Message';
import { createTask, listCategoryTasks } from '../actions/tasksActions';
import { getCategory, deleteCategory } from '../actions/categoryAction';

setDefaultLocale('pt');
registerLocale('pt', pt);

const CategoryScreen = ({ history, match }) => {

   const [ name, setName ] = useState('');
   const [ priority, setPriority ] = useState('Urgente');
   const [ date, setDate ] = useState(new Date());

   const dispatch = useDispatch();

   const tasksCategory = useSelector(state => state.tasksCategory);
   const { loading, error, tasks } = tasksCategory;

   const categoryPage = useSelector(state => state.getCategory);
   const { loading:loadingCategory, error:errorCategory, category } = categoryPage;

   const { success:successTask } = useSelector(state => state.newTask);
   const { success:successDeletedTask } = useSelector(state => state.deleteTask);

   const categoryId = match.params.id;

   useEffect(() => {
      dispatch(listCategoryTasks(categoryId));
      dispatch(getCategory(categoryId));
   }, [dispatch, successTask, successDeletedTask, categoryId ]);
   
   const [show, setShow] = useState(false);
   const handleModal = () => setShow(!show);

   const [ showTaskModal, setTaskModal ] = useState(false);
   const handleTaskModal = () => setTaskModal(!showTaskModal);

   const deleteHandler = () => {
      dispatch(deleteCategory(category._id));
      history.push(`/home`);
   }

   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(createTask(categoryId, {
         name,
         priority,
         date
      }));
      setName('');
      setPriority('Urgente');
      setDate(new Date());
      setTaskModal(false);
   }

   return (
      <Row>
         <Col md={10} className='mx-auto'>
            { loadingCategory ? ( <SmallLoader /> ) : 
              errorCategory ? (<Message variant='danger' children={errorCategory} />) : (
            <>
            <Link className="btn btn-light my-1" to={`/home`}><i className="fas fa-chevron-left"></i> Voltar</Link>
               <Card bg='dark' className='px-5 py-4'>
                  <div className='d-flex justify-content-between'>
                     <h1 className='text-white'>{category.name}</h1>
                     <div>
                        <Button variant='danger' className='btn-sm' onClick={handleModal}>
                           <i className='fas fa-trash'></i>
                        </Button>
                     </div>
                  </div>
               </Card>
               
               <Button variant='success' className='mt-3 mb-3 btn-block' onClick={handleTaskModal}>
                     <i className='fas fa-plus'></i> Adicionar Nova Tarefa
               </Button>

               <Card className='mb-5'>
               <ListGroup variant='flush'>
               { loading ? ( <Loader /> ) : 
                error ? ( <Message variant='danger' children={error} /> ) : ( 
                  tasks.map(task => (
                        <ListGroup.Item key={task._id}>
                           {!task.completed ? (
                              <div  className={`taskContainer ${task.priority.toLowerCase()} ${task.completed && 'completa'}`}>
                              {task.date &&
                                 <p className='mb-0'>{format(new Date(task.date.toString()), "dd/MMM", { locale: pt })}</p>
                              } 
                              <LinkContainer to={`/task/${task._id}`}>
                                 <h4> 
                                    {task.name}
                                    {task.completed && <i className='fas fa-check text-success ms-2'></i>} 
                                 </h4>
                              </LinkContainer>                              
                           </div>   
                              ) : (
                                 <div  className={`taskContainer ${task.priority.toLowerCase()} completa`}>
                                    {task.date &&
                                       <p className='mb-0'>{format(new Date(task.date.toString()), "dd/MMM", { locale: pt })}</p>
                                    } 
                                    <LinkContainer to={`/task/${task._id}`}>
                                       <h4> 
                                          {task.name}
                                          <i className='fas fa-check text-success ms-2'></i> 
                                       </h4>
                                    </LinkContainer>                              
                                 </div>   
                              )
                           }
                        </ListGroup.Item>
                     ))
               )}
               </ListGroup>
               </Card>

    

         <Modal show={showTaskModal} onHide={handleTaskModal}>
            <Modal.Body className='py-4'>
               <Button variant="primary" className='closeBtn' onClick={handleTaskModal}>
                  <i className='fas fa-times'></i>
               </Button>
               <h2>Nova Tarefa</h2>
               <Form onSubmit={submitHandler} className='border mt-3 mb-3 p-3'>
                  <Row>
                     <Col md={12} className='mb-3'>
                        <Form.Group controlId='task'>
                           <Form.Label>O que você precisa fazer?</Form.Label>
                           <Form.Control type='text'
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                              >  
                           </Form.Control>
                        </Form.Group>
                     </Col>
                     <Col md={6} className='mb-3'>
                        <Form.Group controlId='task'>
                           <Form.Label>Qual a urgência?</Form.Label>
                           <Form.Control as='select'
                              value={priority}
                              onChange={(e) => setPriority(e.target.value)}
                              > 
                              <option value='Urgente'>Urgente</option> 
                              <option value='Média'>Média</option> 
                              <option value='Baixa'>Baixa</option> 
                              <option value='Só se der'>Só se der</option> 
                           </Form.Control>
                        </Form.Group>
                     </Col>
                     <Col md={6} className='mb-3'>
                        <Form.Group controlId='task'>
                           <Form.Label>Quando precisa ser feito?</Form.Label>
                           <DatePicker selected={date} onChange={(date) => setDate(date)} dateFormat='dd/MM/yyyy' locale="pt"/>
                        </Form.Group>
                     </Col>
                     <Col md={12}>
                        <Button type='submit' className='btn-block mt-4'>Adicionar</Button>
                     </Col>
                  </Row>
               </Form>
               <h5 className='text-center' onClick={handleTaskModal}>Cancelar</h5>
            </Modal.Body>
         </Modal>


            <Modal show={show} onHide={handleModal}>
               <Modal.Body className='text-center p-5'>
                  <Button variant="primary" className='closeBtn' onClick={handleModal}>
                     <i className='fas fa-times'></i>
                  </Button>
                  <p className='fw-bold mb-4'>Tem certeza que quer excluir essa categoria? Todas as tarefas assinadas a ela serão excluídas. Isso não pode ser desfeito!</p>
                  <Button variant="primary" className='me-3' onClick={handleModal}>
                     Cancelar
                  </Button>
                  <Button variant="danger" onClick={deleteHandler}>
                     Excluir
                  </Button>
               </Modal.Body>
            </Modal>
         </>
         )}
         </Col>
        
      </Row>
   );
}

export default CategoryScreen;