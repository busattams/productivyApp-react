import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Card, ListGroup } from 'react-bootstrap';
import SmallLoader from './SmallLoader';
import Message from './Message';
import { listTasks } from '../actions/tasksActions';

const TodayTasks = () => {

   const dispatch = useDispatch();
   const tasksList = useSelector(state => state.tasksList);
   const { loading, error, tasks } = tasksList;

   useEffect(() => {
      dispatch(listTasks());
   }, [dispatch]);

   const todayTasks = tasks.filter(task => task.date.substring(0, 10) === new Date().toISOString().substring(0, 10));

   return (
      <Card className='mt-5 px-0'>
        <Card.Header> <h3>Suas tarefas para hoje:</h3></Card.Header>
         {loading ? ( <SmallLoader  /> ) : 
            error ? ( <Message variant='danger' children={error} /> ) : (
               <Card.Body>
                  <ListGroup variant='flush'>
               { todayTasks.length > 0 ? (
                  todayTasks.map(task => (
                     <ListGroup.Item key={task._id}> 
                     <div  className={`taskContainer d-flex ${task.priority.toLowerCase()}`}>
                        <LinkContainer to={`task/${task._id}`}>
                           <a><h4>{task.name}</h4></a>
                        </LinkContainer>
                        <LinkContainer to={`category/${task.category._id}`}>
                     <a>[{task.category.name}]</a>
                        </LinkContainer>
                     </div>
                     </ListGroup.Item>
               
               ))) : (
                  <p>Nenhuma tarefa para hoje</p>
               )}
                  
                  </ListGroup>
               </Card.Body>
               )}
      </Card>    
   );
}

export default TodayTasks;