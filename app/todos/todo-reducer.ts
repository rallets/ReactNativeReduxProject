import { ITodoState, TodoActionTypes } from './todo-types';
import { Action } from 'redux';

const initialState: ITodoState = {
    todos: [
        {
            id: '',
            title: ''
        }
    ],
    todo:
    {
        id: '',
        title: ''
    }
    ,
    isLoading: false,
    error: ''
};

interface IAction extends Action<string> {
    readonly payload?: any;
}

export const todoReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case TodoActionTypes.FETCH_TODOS_REQUEST:
            return { ...state, isLoading: true };

        case TodoActionTypes.FETCH_TODOS_SUCCESS:
            return { ...state, isLoading: false, todos: action.payload };

        case TodoActionTypes.FETCH_TODOS_FAIL:
            return { ...state, isLoading: false, error: action.payload };

        /* remove */
        case TodoActionTypes.REMOVE_TODO_REQUEST:
            return { ...state, isLoading: true };

        case TodoActionTypes.REMOVE_TODO_SUCCESS:
            return { ...state, isLoading: false, todos: state.todos.filter(f => f.id !== action.payload) };

        case TodoActionTypes.REMOVE_TODO_FAIL:
            return { ...state, isLoading: false, error: action.payload };

        /* add */
        case TodoActionTypes.ADD_TODO_REQUEST:
            return { ...state, isLoading: true };
        case TodoActionTypes.ADD_TODO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                todos: [...state.todos, action.payload],
            };
        case TodoActionTypes.ADD_TODO_FAIL:
            return { ...state, isLoading: false, error: action.payload };

        /* edit */
        case TodoActionTypes.EDIT_TODO_REQUEST:
            return { ...state, isLoading: true };
        case TodoActionTypes.EDIT_TODO_SUCCESS:
            const todos = [...state.todos];
            const idx = todos.findIndex(x => x.id === action.payload.id);
            todos[idx] = action.payload;
            return {
                ...state,
                isLoading: false,
                todos: todos,
            };
        case TodoActionTypes.ADD_TODO_FAIL:
            return { ...state, isLoading: false, error: action.payload };

        default:
            return state;
    }
}
