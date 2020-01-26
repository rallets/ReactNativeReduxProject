import { api } from '../api-config';
import { ITodoModel } from './todo-types';

export async function getTodos() {
    return await api.get<ITodoModel[]>('todos');
}

export async function deleteTodo(id: string) {
    return await api.delete<void>('todos/' + id);
}

export async function postTodo(newTodo: ITodoModel) {
    return await api.post<ITodoModel>('todos/', newTodo);
}

export async function editTodo(todo: ITodoModel) {
    return await api.put<ITodoModel>('todos/' + todo.id, todo);
}
