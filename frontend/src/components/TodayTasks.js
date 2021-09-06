import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Card, ListGroup } from 'react-bootstrap';
import SmallLoader from './SmallLoader';
import Message from './Message';


const TodayTasks = ({tasks, loading, error}) => {

   const todayTasks = tasks.filter(task => task.date.substring(0, 10) === new Date().toISOString().substring(0, 10));
   return (
      <Card className='mt-3 px-0'>
        <Card.Header className='bg-danger'> <h3>Suas tarefas para hoje:</h3></Card.Header>
         {loading ? ( <SmallLoader  /> ) : 
            error ? ( <Message variant='danger' children={error} /> ) : ( 
               <Card.Body>
                  <ListGroup variant='flush'>
                     { todayTasks.length === 0  && <Message variant='success'>Nenhuma tarefa para hoje</Message>}
                     { todayTasks.map(task => (
                        !task.completed && (
                           <ListGroup.Item key={task._id}> 
                           <div  className={`taskContainer d-md-flex ${task.priority.toLowerCase()}`}>
                              <LinkContainer to={`task/${task._id}`}>
                                 <h4>{task.name}</h4>
                              </LinkContainer>
                              <LinkContainer to={`category/${task.category._id}`}>
                                 <small><span className='d-none d-md-inline'>|</span> {task.category.name}</small>
                              </LinkContainer>
                           </div>
                        </ListGroup.Item>
                        )
                     ))}
                  </ListGroup>
               </Card.Body>
            )}
      </Card>    
   );
}

export default TodayTasks;