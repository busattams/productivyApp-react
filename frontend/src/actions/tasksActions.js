import { 
   TASK_LIST_REQUEST, 
   TASK_LIST_SUCCESS, 
   TASK_LIST_FAIL, 
   TASK_CATEGORY_REQUEST, 
   TASK_CATEGORY_SUCCESS,
   TASK_CATEGORY_FAIL,
   NEW_TASK_REQUEST,
   NEW_TASK_SUCCESS,
   NEW_TASK_FAIL,
   GET_TASK_REQUEST,
   GET_TASK_SUCCESS,
   GET_TASK_FAIL,
   COMPLETE_TASK_REQUEST,
   COMPLETE_TASK_SUCCESS,
   COMPLETE_TASK_FAIL,
   DELETE_TASK_REQUEST,
   DELETE_TASK_SUCCESS,
   DELETE_TASK_FAIL,
   COMMENT_TASK_REQUEST,
   COMMENT_TASK_SUCCESS,
   COMMENT_TASK_FAIL
} from "../constants/taskCostants";
import axios from 'axios';

export const listTasks = () => async (dispatch, getState) => {
   try {
      dispatch({type: TASK_LIST_REQUEST});
      const { userLogin: { userInfo } } = getState()
      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`
         }
      }
      const { data } = await axios.get(`http://localhost:3001/api/tasks/`, config);
      dispatch({
         type: TASK_LIST_SUCCESS,
         payload: data
      });
   } catch (error) {
      dispatch({
         type: TASK_LIST_FAIL,
         payload: error.response && 
            error.response.data.message ? error.response.data.message : 
            error.message
      });
   }
}

export const listCategoryTasks = (category) => async (dispatch, getState) => {
   try {
      dispatch({type: TASK_CATEGORY_REQUEST});
      const { userLogin: { userInfo } } = getState()
      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`
         }
      }
      const { data } = await axios.get(`http://localhost:3001/api/tasks/category/${category}`, config);
      dispatch({
         type: TASK_CATEGORY_SUCCESS,
         payload: data
      });
   } catch (error) {
      dispatch({
         type: TASK_CATEGORY_FAIL,
         payload: error.response && 
            error.response.data.message ? error.response.data.message : 
            error.message
      });
   }
}


export const createTask = (category, task) => async (dispatch, getState) => {
   try {
      dispatch({type: NEW_TASK_REQUEST});

      const { userLogin: { userInfo } } = getState()
      
      const config = {
         headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${userInfo.token}`
         },
      }
      const { data } = await axios.post(
         `http://localhost:3001/api/tasks/${category}/new`,
         task,
         config
      );

      dispatch({
         type: NEW_TASK_SUCCESS,
         payload: data
      });
   } catch (error) {
      dispatch({
         type: NEW_TASK_FAIL,
         payload: error.response && 
            error.response.data.message ? error.response.data.message : 
            error.message
      });
   }
}

export const getTask = (id) => async (dispatch, getState) => {
   try {
      dispatch({type: GET_TASK_REQUEST});
      const { userLogin: { userInfo } } = getState()
      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`
         }
      }
      const { data } = await axios.get(`http://localhost:3001/api/tasks/${id}`, config);
      dispatch({
         type: GET_TASK_SUCCESS,
         payload: data
      });
   } catch (error) {
      dispatch({
         type: GET_TASK_FAIL,
         payload: error.response && 
            error.response.data.message ? error.response.data.message : 
            error.message
      });
   }
}

export const completeTask = (id) => async (dispatch, getState) => {
   try {
      dispatch({type: COMPLETE_TASK_REQUEST});
    
      const { userLogin: { userInfo } } = getState()
      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`
         }
      }
      await axios.patch(`http://localhost:3001/api/tasks/${id}/complete`, {}, config);
      
      dispatch({type: COMPLETE_TASK_SUCCESS});

   } catch (error) {
      dispatch({
         type: COMPLETE_TASK_FAIL,
         payload: error.response && 
            error.response.data.message ? error.response.data.message : 
            error.message
      });
   }
}


export const deleteTask = (id) => async (dispatch, getState) => {
   try {
      dispatch({type: DELETE_TASK_REQUEST});
      const { userLogin: { userInfo } } = getState()
      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`
         }
      }
      await axios.delete(
         `http://localhost:3001/api/tasks/${id}`,
         config
      );

      dispatch({type: DELETE_TASK_SUCCESS});

   } catch (error) {
      dispatch({
         type: DELETE_TASK_FAIL,
         payload: error.response && 
            error.response.data.message ? error.response.data.message : 
            error.message
      });
   }
}


export const addCommentTask = (id, comment) => async (dispatch, getState) => {
   try {
      dispatch({type: COMMENT_TASK_REQUEST});

      const { userLogin: { userInfo } } = getState()
      const config = {
         headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${userInfo.token}`
         },
      }
    
      await axios.patch(`http://localhost:3001/api/tasks/${id}/comment`,
         comment,
         config
      );
      
      dispatch({type: COMMENT_TASK_SUCCESS});

   } catch (error) {
      dispatch({
         type: COMMENT_TASK_FAIL,
         payload: error.response && 
            error.response.data.message ? error.response.data.message : 
            error.message
      });
   }
}