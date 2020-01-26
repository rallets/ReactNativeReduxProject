// @ts-ignore
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { IFoodState } from '../foods/food-types';
import { combineReducers, compose, applyMiddleware, createStore, Store, Action } from 'redux';
import { foodReducer } from '../foods/food-reducer';
import createSagaMiddleware from 'redux-saga';
import { todoSaga } from '../todos/todo-saga';
import { ITodoState } from '../todos/todo-types';
import { todoReducer } from '../todos/todo-reducer';

export interface IApplicationState {
    foodReducer: IFoodState;
    todoReducer: ITodoState;
}

const rootReducer = combineReducers<IApplicationState>({
    foodReducer,
    todoReducer
});

// @ts-ignore
const withDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, thunk, logger];

const store: Store<IApplicationState, Action<any>> = createStore(
    rootReducer,
    withDevTools(applyMiddleware(...middleware)),
);

sagaMiddleware.run(todoSaga);

export default store;
