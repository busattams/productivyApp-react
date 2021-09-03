import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import {Row, Col, Button, Form} from 'react-bootstrap';s
import SmallLoader from './SmallLoader';
import Message from './Message';
import { listTasks } from '../actions/tasksActions';

const Tasks = ({category}) => {

   const dispatch = useDispatch();
   const tasksList = useSelector(state => state.tasksList);
   const { loading, error, tasks } = tasksList;

   useEffect(() => {
      dispatch(listTasks());
   }, [dispatch]);

   let foundTasks = tasks.filter(task => task.category._id === category);

   return (
      <>
          {loading ? (
            <SmallLoader  />
         ) : error ? (
            <Message variant='danger' children={error} />
         ) : (
               foundTasks.length > 0 ? (
                  foundTasks.map(task => (
                     <div key={task._id}>
                        <p>{task.name}</p>
                        {/* <p>{task.priority}</p> */}
                     </div>
                     ))
               ) : (
                  <Message>No tasks. Congratulations!</Message>
               )

         )}

      </>
   );
}

export default Tasks;