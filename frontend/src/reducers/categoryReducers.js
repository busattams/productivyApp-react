import {
   CATEGORY_LIST_REQUEST,
   CATEGORY_LIST_SUCCESS,
   CATEGORY_LIST_FAIL,
   NEW_CATEGORY_REQUEST,
   NEW_CATEGORY_SUCCESS,
   NEW_CATEGORY_FAIL,
   NEW_CATEGORY_RESET,
   DELETE_CATEGORY_REQUEST,
   DELETE_CATEGORY_SUCCESS,
   DELETE_CATEGORY_FAIL,
   SINGLE_CATEGORY_REQUEST,
   SINGLE_CATEGORY_SUCCESS,
   SINGLE_CATEGORY_FAIL
} from '../constants/categoryConstants';

export const listCategoryReducer = (state = {category: []}, action) => {
   switch(action.type) {
      case CATEGORY_LIST_REQUEST: 
         return {loading: true, category: []};
      case CATEGORY_LIST_SUCCESS:
         return {
            loading: false,
            category: action.payload
         };
      case CATEGORY_LIST_FAIL:
         return {loading: false, error: action.payload};
      default:
         return state;
   }
}


export const newCategoryCreateReducer = (state = {}, action) => {
   switch(action.type) {
      case NEW_CATEGORY_REQUEST: 
         return {loading: true};
      case NEW_CATEGORY_SUCCESS:
         return {
            loading: false,
            success: true,
            category: action.payload
         };
      case NEW_CATEGORY_FAIL:
         return {loading: false, error: action.payload};
      case NEW_CATEGORY_RESET: 
         return {};
      default:
         return state;
   }
}

export const deleteCategoryReducer = (state = {}, action) => {
   switch(action.type) {
      case DELETE_CATEGORY_REQUEST: 
         return {loading: true};
      case DELETE_CATEGORY_SUCCESS:
         return { loading: false, success: true };
      case DELETE_CATEGORY_FAIL:
         return {loading: false, error: action.payload};
      default:
         return state;
   }
}

export const getCategoryReducer = (state = {category: {}}, action) => {
   switch(action.type) {
      case SINGLE_CATEGORY_REQUEST: 
         return {loading: true, category: {}};
      case SINGLE_CATEGORY_SUCCESS:
         return {
            loading: false,
            category: action.payload
         };
      case SINGLE_CATEGORY_FAIL:
         return {loading: false, error: action.payload};
      default:
         return state;
   }
}