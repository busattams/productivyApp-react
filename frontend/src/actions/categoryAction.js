import {
   CATEGORY_LIST_REQUEST,
   CATEGORY_LIST_SUCCESS,
   CATEGORY_LIST_FAIL,
   NEW_CATEGORY_REQUEST,
   NEW_CATEGORY_SUCCESS,
   NEW_CATEGORY_FAIL,
   DELETE_CATEGORY_REQUEST,
   DELETE_CATEGORY_SUCCESS,
   DELETE_CATEGORY_FAIL,
   SINGLE_CATEGORY_REQUEST,
   SINGLE_CATEGORY_SUCCESS,
   SINGLE_CATEGORY_FAIL
} from '../constants/categoryConstants';

import axios from 'axios';

export const listCategory = () => async (dispatch, getState) => {
   try {
      dispatch({type: CATEGORY_LIST_REQUEST});
      const { userLogin: { userInfo } } = getState()
      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`
         }
      }
      const { data } = await axios.get('http://localhost:3001/api/category', config);
      dispatch({
         type: CATEGORY_LIST_SUCCESS,
         payload: data
      });
   } catch (error) {
      dispatch({
         type: CATEGORY_LIST_FAIL,
         payload: error.response && 
            error.response.data.message ? error.response.data.message : 
            error.message
      });
   }
}

export const createCategory = (category) => async (dispatch, getState) => {
   try {
      dispatch({type: NEW_CATEGORY_REQUEST});
      const { userLogin: { userInfo } } = getState()
      const config = {
         headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${userInfo.token}`
         },
      }
         const { data } = await axios.post(
            'http://localhost:3001/api/category',
            category,
            config
            );

      dispatch({
         type: NEW_CATEGORY_SUCCESS,
         payload: data
      });
   } catch (error) {
      dispatch({
         type: NEW_CATEGORY_FAIL,
         payload: error.response && 
            error.response.data.message ? error.response.data.message : 
            error.message
      });
   }
}

export const deleteCategory = (id) => async (dispatch, getState) => {
   try {
      dispatch({type: DELETE_CATEGORY_REQUEST});
      const { userLogin: { userInfo } } = getState()
      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`
         }
      }
      console.log(userInfo);
      await axios.delete(
         `http://localhost:3001/api/category/${id}`,
         config
      );

      dispatch({type: DELETE_CATEGORY_SUCCESS});

   } catch (error) {
      dispatch({
         type: DELETE_CATEGORY_FAIL,
         payload: error.response && 
            error.response.data.message ? error.response.data.message : 
            error.message
      });
   }
}

export const getCategory = (id) => async (dispatch, getState) => {
   try {
      dispatch({type: SINGLE_CATEGORY_REQUEST});
      const { userLogin: { userInfo } } = getState()
      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`
         }
      }
      const { data } = await axios.get(`http://localhost:3001/api/category/${id}`, config);
      dispatch({
         type: SINGLE_CATEGORY_SUCCESS,
         payload: data
      });
   } catch (error) {
      dispatch({
         type: SINGLE_CATEGORY_FAIL,
         payload: error.response && 
            error.response.data.message ? error.response.data.message : 
            error.message
      });
   }
}