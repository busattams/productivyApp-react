

import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Row, Col, Card, Button, Form, ListGroup } from 'react-bootstrap';
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

   useEffect(() => {
      dispatch(listCategoryTasks(match.params.id));
      dispatch(getCategory(match.params.id));
   }, [dispatch, successTask, successDeletedTask ]);
   

   const deleteHandler = (id) => {
      if(window.confirm('Tem certeza? Todas as tarefas desta categoria serão deletadas. Isso não pode ser desfeito.')) {
         dispatch(deleteCategory(id));
         history.push(`/`);
      }
   }

   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(createTask(match.params.id, {
         name,
         priority,
         date
      }));
   }

   return (
      <Row>
         <Col md={9} className='mx-auto'>
            { loadingCategory ? ( <SmallLoader /> ) : 
              errorCategory ? (<Message variant='danger' children={error} />) : (
            <>
               <Card bg='dark' className='px-5 py-4 mt-5'>
                  <div className='d-flex justify-content-between'>
                     <h1 className='text-white'>{category.name}</h1>
                     <div>
                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(category._id)}>
                           <i className='fas fa-trash'></i>
                        </Button>
                     </div>
                  </div>
               </Card>
               
               <Card>
               <ListGroup variant='flush'>
               { loading ? ( <Loader /> ) : 
                error ? ( <Message variant='danger' children={error} /> ) : ( 
                  tasks.map(task => (
                        <ListGroup.Item key={task._id}>
                           <div  className={`taskContainer ${task.priority.toLowerCase()}`}>
                              {task.date &&
                                 <p className='mb-0'>{format(new Date(task.date.toString()), "dd/MMM", { locale: pt })}</p>
                              }
                           <LinkContainer to={`/task/${task._id}`}><a><h4>{task.name}</h4></a></LinkContainer>
                           </div>
                        </ListGroup.Item>
                     ))
               )}
               </ListGroup>
               </Card>

         <Form onSubmit={submitHandler} className='border my-5 p-4'>
            <Row>
               <Col md={12}>
                  <h2>Nova Tarefa</h2>
               </Col>
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
               <Col md={6}>
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
               <Col md={6}>
                  <Form.Group controlId='task'>
                     <Form.Label>Quando precisa ser feito?</Form.Label>
                     <DatePicker selected={date} onChange={(date) => setDate(date)} dateFormat='dd/MM/yyyy' locale="pt"/>
                  </Form.Group>
               </Col>
               <Col md={12}>
                  <Button type='submit' className='mt-4'>Adicionar</Button>
               </Col>
            </Row>
         </Form>

            </>
              )}
         </Col>
        
      </Row>
   );
}

export default CategoryScreen;