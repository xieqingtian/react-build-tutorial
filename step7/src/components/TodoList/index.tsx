import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { TransitionMotion } from 'react-motion'
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'
import Footer from '../Footer'
import TodoItem from '../TodoItem'
import SideBar from '../SideBar'
import * as styles from './index.less'
import { TodoStore } from '../../stores'

interface TodoListProps extends RouteComponentProps<{}> {
    store: TodoStore
}

@inject('store')
@withRouter
@observer
class TodoList extends React.Component<TodoListProps, {}> {
    render() {
        const {
            todos,
            completedTodos,
            addTodo,
            deleteTodo,
            editTodo,
            toggleComplete,
            changeShowType,
            showType,
            activeTodos,
        } = this.props.store

        let realTodos = null

        switch (showType) {
            case -1:
                realTodos = todos
                break
            case 0:
                realTodos = activeTodos
                break
            case 1:
                realTodos = completedTodos
                break
            default:
        }

        return (
            <div className={styles.container}>
                <AppBar
                    title="TodoList"
                    showMenuIconButton={false}
                    style={{ textAlign: 'center' }}
                />
                <img
                    src={require('../../assets/images/logo.svg')}
                    width="100"
                    alt="react-logo"
                />
                {realTodos.map((todo, index) =>
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        deleteTodo={deleteTodo}
                        editTodo={editTodo}
                        toggleComplete={toggleComplete}
                    />,
                )}
                <Paper>
                    <div className={styles.statisticsWrapper}>
                        <p>
                            已完成：<span>{completedTodos.length}</span>
                        </p>
                        <p>
                            总数：<span>{todos.length}</span>
                        </p>
                    </div>
                </Paper>
                <Footer addTodo={addTodo} />
                <SideBar changeShowType={changeShowType} />
            </div>
        )
    }
}

export default TodoList
