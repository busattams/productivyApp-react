import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {deleteCategoryReducer, getCategoryReducer, listCategoryReducer, newCategoryCreateReducer} from './reducers/categoryReducers'
import { addCommentTaskReducer, completeTaskReducer, createNewTaskReducer, deleteTaskReducer, getTaskReducer, listTasksReducer, taskCategoryReducer } from './reducers/taskReducer';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducer';

const reducer = combineReducers({
   userRegister: userRegisterReducer,
   userLogin: userLoginReducer,
   categoryList: listCategoryReducer,
   getCategory: getCategoryReducer,
   newCategory: newCategoryCreateReducer,
   tasksList: listTasksReducer,
   deleteCategory: deleteCategoryReducer,
   tasksCategory: taskCategoryReducer,
   newTask: createNewTaskReducer,
   getTask: getTaskReducer,
   completeTask: completeTaskReducer,
   deleteTask: deleteTaskReducer,
   commentTask: addCommentTaskReducer
});


const userInfoFromStorage = localStorage.getItem('userInfo') ?
   JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
   userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;