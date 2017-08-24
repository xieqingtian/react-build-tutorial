import * as React from 'react'
import { observer } from 'mobx-react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import ActionCheck from 'material-ui/svg-icons/navigation/check'
import ActionEdit from 'material-ui/svg-icons/image/edit'
import { observable, action } from 'mobx'
import * as styles from './index.less'
import { Todo } from '../../interfaces/todo'

interface TodoItemProps {
    todo: Todo
    deleteTodo: (id: string) => void
    toggleComplete: (id: string) => void
    editTodo: (id: string, content: string) => void
}

@observer
class TodoItem extends React.Component<TodoItemProps, {}> {
    @observable editEnable: boolean = false
    @observable content = this.props.todo.content

    @action
    toggleEditState = (): void => {
        const { todo, editTodo } = this.props
        this.editEnable && editTodo(todo.id, this.content)
        this.editEnable = !this.editEnable
    }

    deleteTodo = (): void => {
        const { todo, deleteTodo } = this.props
        deleteTodo(todo.id)
    }

    @action
    editTodo = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.content = event.target.value
    }

    handleCheck = (): void => {
        const { todo, toggleComplete } = this.props
        toggleComplete(todo.id)
    }

    render() {
        return (
            <Paper>
                <div className={styles.container}>
                    {this.editEnable
                        ? <TextField
                              hintText="请建立你的任务"
                              value={this.content}
                              onChange={this.editTodo}
                              // tslint:disable-next-line:jsx-alignment
                          />
                        : <div>
                              <Checkbox
                                  checked={this.props.todo.complete}
                                  onCheck={this.handleCheck}
                                  style={{ maxWidth: 40, display: 'block' }}
                              />
                              <p>
                                  {this.props.todo.content}
                              </p>
                          </div>}
                    <div>
                        <IconButton
                            tooltip={this.editEnable ? '确定' : '编辑'}
                            tooltipPosition="top-right"
                        >
                            {this.editEnable
                                ? <ActionCheck onClick={this.toggleEditState} />
                                : <ActionEdit onClick={this.toggleEditState} />}
                        </IconButton>
                        <IconButton
                            onClick={this.deleteTodo}
                            tooltip="删除"
                            tooltipPosition="top-right"
                        >
                            <ActionDelete />
                        </IconButton>
                    </div>
                </div>
            </Paper>
        )
    }
}

export default TodoItem
