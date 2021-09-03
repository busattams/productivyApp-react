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
   NEW_TASK_RESET,
   GET_TASK_REQUEST,
   GET_TASK_SUCCESS,
   GET_TASK_FAIL,
   COMPLETE_TASK_REQUEST,
   COMPLETE_TASK_SUCCESS,
   COMPLETE_TASK_FAIL,
   COMPLETE_TASK_RESET,
   DELETE_TASK_REQUEST,
   DELETE_TASK_SUCCESS,
   DELETE_TASK_FAIL,
   COMMENT_TASK_REQUEST,
   COMMENT_TASK_SUCCESS,
   COMMENT_TASK_FAIL,
   COMMENT_TASK_RESET
} from "../constants/taskCostants";

export const listTasksReducer = (state = {tasks: []}, action) => {
   switch(action.type) {
      case TASK_LIST_REQUEST: 
         return {loading: true, tasks: []};
      case TASK_LIST_SUCCESS:
         return {
            loading: false,
            tasks: action.payload
         };
      case TASK_LIST_FAIL:
         return {loading: false, error: action.payload};
      default:
         return state;
   }
}

export const taskCategoryReducer = (state = {tasks: []}, action) => {
   switch(action.type) {
      case TASK_CATEGORY_REQUEST: 
         return {loading: true, tasks: []};
      case TASK_CATEGORY_SUCCESS:
         return {
            loading: false,
            tasks: action.payload
         };
      case TASK_CATEGORY_FAIL:
         return {loading: false, error: action.payload};
      default:
         return state;
   }
}

export const createNewTaskReducer = (state = {}, action) => {
   switch(action.type) {
      case NEW_TASK_REQUEST: 
         return {loading: true};
      case NEW_TASK_SUCCESS:
         return {
            loading: false,
            success: true,
            task: action.payload
         };
      case NEW_TASK_FAIL:
         return {loading: false, error: action.payload};
      case NEW_TASK_RESET: 
         return {};
      default:
         return state;
   }
}

export const getTaskReducer = (state = {task: {priority: '', date: new Date(), comments: [], category: {} }}, action) => {
   switch(action.type) {
      case GET_TASK_REQUEST: 
         return {loading: true, ...state};
      case GET_TASK_SUCCESS:
         return {
            task: action.payload,
            loading: false
         };
      case GET_TASK_FAIL:
         return {loading: false, error: action.payload};
      default:
         return state;
   }
}


export const completeTaskReducer = (state = {}, action) => {
   switch (action.type) {
      case COMPLETE_TASK_REQUEST:
         return {loading: true };
      case COMPLETE_TASK_SUCCESS:
         return { 
            loading: false, 
            success: true,
         };
      case COMPLETE_TASK_FAIL: 
         return { loading: false, error: action.payload };
      case COMPLETE_TASK_RESET:
         return {};
      default:
         return state;
   }
}


export const deleteTaskReducer = (state = {}, action) => {
   switch(action.type) {
      case DELETE_TASK_REQUEST: 
         return {loading: true};
      case DELETE_TASK_SUCCESS:
         return { loading: false, success: true };
      case DELETE_TASK_FAIL:
         return {loading: false, error: action.payload};
      default:
         return state;
   }
}

export const addCommentTaskReducer = (state = {}, action) => {
   switch(action.type) {
      case COMMENT_TASK_REQUEST: 
         return {loading: true};
      case COMMENT_TASK_SUCCESS:
         return {
            loading: false,
            success: true
         };
      case COMMENT_TASK_FAIL:
         return {loading: false, error: action.payload};
      case COMMENT_TASK_RESET: 
         return {};
      default:
         return state;
   }
}