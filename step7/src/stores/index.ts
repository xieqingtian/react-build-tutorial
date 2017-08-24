import { observable, computed, action } from 'mobx'
import { Todo } from '../interfaces/todo'

export class TodoStore {
    @observable
    todos: Array<Todo> = [
        { id: '1', complete: false, content: '吃饭' },
        { id: '2', complete: false, content: '睡觉' },
        { id: '3', complete: false, content: '打豆豆' },
    ]

    @observable showType: number = -1

    @computed
    get completedTodos(): Array<Todo> {
        return this.todos.filter(todo => todo.complete === true)
    }

    @computed
    get activeTodos(): Array<Todo> {
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

    @action.bound
    editTodo(id: string, content: string): void {
        this.todos.find(todo => todo.id === id).content = content
    }

    @action.bound
    toggleComplete(id: string): void {
        const todo = this.todos.find(item => item.id === id)
        todo.complete = !todo.complete
    }

    @action.bound
    changeShowType(type: number): void {
        this.showType = type
    }
}

export default new TodoStore()
