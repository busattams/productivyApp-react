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

export const listCategory = () => async (dispatch) => {
   try {
      dispatch({type: CATEGORY_LIST_REQUEST});
      const { data } = await axios.get('http://localhost:3001/api/category');
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

export const createCategory = (category) => async (dispatch) => {
   try {
      dispatch({type: NEW_CATEGORY_REQUEST});
      
      const config = {
         headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
         },
      }
         const { data } = await axios.post(
            'http://localhost:3001/api/category',
            category,
            config
            );
            console.log(data)

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

export const deleteCategory = (id) => async (dispatch) => {
   try {
      dispatch({type: DELETE_CATEGORY_REQUEST});
      // const config = {
      //    headers: {
      //       "Content-Type": "application/json",
      //       "Accept": "application/json"
      //    },
      // }
      await axios.delete(
         `http://localhost:3001/api/category/${id}`,
         // config
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

export const getCategory = (id) => async (dispatch) => {
   try {
      dispatch({type: SINGLE_CATEGORY_REQUEST});
      const { data } = await axios.get(`http://localhost:3001/api/category/${id}`);
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