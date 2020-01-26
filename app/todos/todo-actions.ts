import { Action } from 'redux';
import { TodoActionTypes, ITodoModel } from './todo-types';

/* action creators of saga */

export interface IAction extends Action {
    readonly payload?: any;
}

export const fetchTodos = (): IAction => ({
    type: TodoActionTypes.FETCH_TODOS_REQUEST,
});

export const removeTodo = (id: string): IAction => ({
    type: TodoActionTypes.REMOVE_TODO_REQUEST,
    payload: id,
});

export const addTodo = (todo: ITodoModel): IAction => ({
    type: TodoActionTypes.ADD_TODO_REQUEST,
    payload: todo,
});

export const editTodo = (todo: ITodoModel): IAction => ({
    type: TodoActionTypes.EDIT_TODO_REQUEST,
    payload: todo,
});
