import * as React from 'react'
import { observer } from 'mobx-react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import * as styles from './index.less'

@observer
class Footer extends React.Component<any, any> {
    render() {
        return (
            <Paper>
                <div className={styles.footerWrapper}>
                    <label>任务：</label>
                    <TextField hintText="请建立你的任务" />
                    <RaisedButton>发送</RaisedButton>
                </div>
            </Paper>
        )
    }
}

export default Footer
