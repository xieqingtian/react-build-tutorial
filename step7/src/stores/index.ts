import { observable, computed, action } from 'mobx'
import { Todo } from '../interfaces/todo'

class todoStore {

    constructor() { }

    @observable todos: Array<Todo> = [
        { id: '1', complete: false, content: '吃饭' },
        { id: '2', complete: false, content: '睡觉' },
        { id: '3', complete: false, content: '打豆豆' }
    ]

    @computed get completedTodos(): Array<Todo> {
        return this.todos.filter(todo => todo.complete === true)
    }

    @computed get activeTodos(): Array<Todo> {
        return this.todos.filter(todo => todo.complete === false)
    }

    @action.bound
    addTodo(todo: Todo): void {
        this.todos.push(todo)
    }

    @action.bound
    deleteTodo(id: string): void {
        this.todos = this.todos.filter(todo => todo.id !== id)
    }
}

export default new todoStore()