import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Card, ListGroup } from 'react-bootstrap';
import SmallLoader from './SmallLoader';
import Message from './Message';
import pt from 'date-fns/locale/pt';
import { format } from 'date-fns';


const NextTasks = ({tasks, loading, error}) => {
   
   const today =  new Date().setHours(0,0,0,0);
   const nextTasksDay = () => {
      let day = new Date().getDate();
      let month = new Date().getMonth() + 1;
      let year = new Date().getFullYear();
      let days = new Date(year, month, 0).getDate();
      if((day > 20 && days === 30) || (day > 21 && days === 31) ) {
         day = 1;
         month++;
      } else {
         day += 10;
      }
      return new Date(`${month}-${day}-${year}`).setHours(0,0,0,0)
   }
   const taskDay = (taskDate) => new Date(format(new Date(taskDate.toString()), "MM-dd-yyyy")).setHours(0,0,0,0);
   const nextTasks = tasks.filter(task => taskDay(task.date) > today && taskDay(task.date) < nextTasksDay());

   return (
      <Card className='mt-5 px-0'>
        <Card.Header className='bg-dark'> <h3>Tarefas dos próximos 10 dias</h3></Card.Header>
         {loading ? ( <SmallLoader  /> ) : 
            error ? ( <Message variant='danger' children={error} /> ) : ( 
               <Card.Body>
                  <ListGroup variant='flush'>
                     { nextTasks.length === 0  && <Message variant='success'>Nenhuma tarefa.</Message>}
                     { nextTasks.map(task => (
                        !task.completed && (
                           <ListGroup.Item key={task._id}> 
                           <div  className={`taskContainer d-md-flex ${task.priority.toLowerCase()} align-items-end`}>
                              <div>
                                 <span className='mb-0'>{format(new Date(task.date.toString()), "dd/MMM", { locale: pt })}</span>
                                 <LinkContainer to={`task/${task._id}`}>
                                    <h4>{task.name}</h4>
                                 </LinkContainer>
                              </div>
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

export default NextTasks;