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

@observer
class TodoItem extends React.Component<any, any> {

    @observable editEnable: boolean = false

    @action
    toggleEditState = (): void => {
        this.editEnable = !this.editEnable
    }

    render() {
        return (
            <Paper>
                <div className={styles.container}>
                    {
                        this.editEnable ?
                            (
                                <TextField hintText="请建立你的任务" />
                            ) :
                            (
                                <div>
                                    <Checkbox style={{ maxWidth: 40, display: 'block' }} />
                                    <p>测试todo</p>
                                </div>
                            )
                    }
                    <div>
                        <IconButton tooltip={this.editEnable ? "确定" : "编辑"} tooltipPosition="top-right">
                            {this.editEnable ? <ActionCheck onClick={this.toggleEditState} /> : <ActionEdit onClick={this.toggleEditState} />}
                        </IconButton>
                        <IconButton tooltip="删除" tooltipPosition="top-right"><ActionDelete /></IconButton>
                    </div>
                </div>
            </Paper>
        )
    }
}

export default TodoItem
