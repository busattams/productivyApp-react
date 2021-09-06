import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Row, Col } from 'react-bootstrap';
import TodayTasks from '../components/TodayTasks';
import NextTasks from '../components/NextTasks';
import Categories from '../components/Categories';
import NewCategory from '../components/NewCategory';
import { listCategory } from '../actions/categoryAction';
import { listTasks } from '../actions/tasksActions';

const HomeScreen = ({ history }) => {

   const dispatch = useDispatch();
   
   const userLogin = useSelector(state => state.userLogin);
   const { userInfo } = userLogin;

   const categoryList = useSelector(state => state.categoryList);
   const { loading:loadingCategory, error:errorCategory, category } = categoryList;

   const tasksList = useSelector(state => state.tasksList);
   const { loading:loadingTasks, error:errorTasks, tasks } = tasksList;

   const deletedCategory = useSelector(state => state.deleteCategory);
   const { success:successDeleteCategory } = deletedCategory;

   useEffect(() => {
      if(!userInfo) {
         history.push('/login')
      } else {
         dispatch(listCategory());
         dispatch(listTasks());
      }
   }, [dispatch, userInfo, successDeleteCategory, history]);


   return (
      <Row>
         <Col md={10} className='mx-auto pb-5'>
            <TodayTasks tasks={tasks} error={errorTasks} loading={loadingTasks} />
            <Categories category={category} error={errorCategory} loading={loadingCategory} />
            <NewCategory />
            <NextTasks tasks={tasks} error={errorTasks} loading={loadingTasks} />
         </Col>
      </Row>
   );
}

export default HomeScreen;