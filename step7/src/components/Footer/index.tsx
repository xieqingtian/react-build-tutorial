import * as React from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import * as styles from './index.less'
import { Todo } from '../../interfaces/todo'

interface FooterProps {
    addTodo: (todo: Todo) => void
}

@observer
class Footer extends React.Component<FooterProps, {}> {
    @observable content = ''

    @action
    handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.content = event.target.value
    }

    @action
    handleClick = (): void => {
        this.props.addTodo({
            id: new Date().getTime() + '',
            content: this.content,
            complete: false,
        })
        this.content = ''
    }

    render() {
        return (
            <Paper>
                <div className={styles.footerWrapper}>
                    <label>任务：</label>
                    <TextField
                        hintText="请建立你的任务"
                        value={this.content}
                        onChange={this.handleChange}
                    />
                    <RaisedButton onClick={this.handleClick}>发送</RaisedButton>
                </div>
            </Paper>
        )
    }
}

export default Footer
