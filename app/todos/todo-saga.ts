import { put, takeEvery, call, all } from 'redux-saga/effects';
import { getTodos, deleteTodo, postTodo, editTodo } from "./todo-service";
import { TodoActionTypes, ITodoState, ITodoModel } from './todo-types';
import { IAction } from "./todo-actions";

function* fetchingTodos() {
    try {
        const { data } = yield call(getTodos);
        const sortedData = data.sort((first: ITodoModel, second: ITodoModel) =>
            first.title.toLowerCase() < second.title.toLowerCase() ? -1 : 1
        );
        yield put({
            type: TodoActionTypes.FETCH_TODOS_SUCCESS,
            payload: sortedData
        });
    } catch (e) {
        yield put({
            type: TodoActionTypes.FETCH_TODOS_FAIL,
            payload: e.message
        })
    }
}

function* removingTodo({ payload: id }: IAction) {
    try {
        yield call(deleteTodo, id);
        yield put({
            type: TodoActionTypes.REMOVE_TODO_SUCCESS,
            payload: id
        });
    } catch (e) {
        yield put({
            type: TodoActionTypes.REMOVE_TODO_FAIL,
            payload: e.message
        })
    }
}

function* addingTodo({ payload: newTodo }: IAction) {
    try {
        const { data } = yield call(postTodo, newTodo);
        yield put({
            type: TodoActionTypes.ADD_TODO_SUCCESS,
            payload: data
        });
    } catch (e) {
        yield put({
            type: TodoActionTypes.ADD_TODO_FAIL,
            payload: e.message
        })
    }
}

function* editingTodo({ payload: todo }: IAction) {
    try {
        const { data } = yield call(editTodo, todo);
        yield put({
            type: TodoActionTypes.EDIT_TODO_SUCCESS,
            payload: data
        });
    } catch (e) {
        yield put({
            type: TodoActionTypes.EDIT_TODO_FAIL,
            payload: e.message
        })
    }
}

function* watchFetchingTodos() {
    yield takeEvery(TodoActionTypes.FETCH_TODOS_REQUEST, fetchingTodos);
}

function* watchRemovingTodos() {
    yield takeEvery(TodoActionTypes.REMOVE_TODO_REQUEST, removingTodo);
}

function* watchAddingTodos() {
    yield takeEvery(TodoActionTypes.ADD_TODO_REQUEST, addingTodo);
}

function* watchEditingTodos() {
    yield takeEvery(TodoActionTypes.EDIT_TODO_REQUEST, editingTodo);
}

export function* todoSaga() {
    yield all([watchFetchingTodos(), watchRemovingTodos(), watchAddingTodos(), watchEditingTodos()])
}
