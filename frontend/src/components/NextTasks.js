import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Card, ListGroup } from 'react-bootstrap';
import SmallLoader from './SmallLoader';
import Message from './Message';
import pt from 'date-fns/locale/pt';
import { format } from 'date-fns';


const NextTasks = ({tasks, loading, error}) => {

   const nextTasks = tasks.filter(task => task.date.substring(0, 10) !== new Date().toISOString().substring(0, 10));

   return (
      <Card className='mt-5 px-0'>
        <Card.Header> <h3>Próximas tarefas</h3></Card.Header>
         {loading ? ( <SmallLoader  /> ) : 
            error ? ( <Message variant='danger' children={error} /> ) : ( 
               <Card.Body>
                  <ListGroup variant='flush'>
                     { nextTasks.length === 0  && <Message variant='success'>Nenhuma tarefa.</Message>}
                     { nextTasks.slice(0, 20).map(task => (
                        <ListGroup.Item key={task._id}> 
                           <div  className={`taskContainer d-flex ${task.priority.toLowerCase()} align-items-end`}>
                              <div>
                                 <span className='mb-0'>{format(new Date(task.date.toString()), "dd/MMM", { locale: pt })}</span>
                                 <LinkContainer to={`task/${task._id}`}>
                                    <h4>{task.name}</h4>
                                 </LinkContainer>
                              </div>
                              <LinkContainer to={`category/${task.category._id}`}>
                                 <small>// {task.category.name}</small>
                              </LinkContainer>
                           </div>
                        </ListGroup.Item>
                     ))}
                  </ListGroup>
               </Card.Body>
            )}
      </Card>    
   );
}

export default NextTasks;