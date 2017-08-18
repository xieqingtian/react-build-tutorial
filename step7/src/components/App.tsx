import * as React from 'react'
import * as styles from './app.less'
import { observable, action, useStrict } from 'mobx'
import { observer } from 'mobx-react'

useStrict(true)


@observer
class App extends React.Component<{}, {}> {

    @observable dialogState = {
        active: false
    }

    @action
    openDialog = () => {
        this.dialogState.active = true
    }

    render() {

        console.log('父组件render');

        return (
            <div>
                <button onClick={this.openDialog}>打开弹窗</button>
                <Dialog dialogState={this.dialogState}></Dialog>
            </div>
        )
    }
}

export default App


interface DialogProps {
    dialogState: any
}

@observer
class Dialog extends React.Component<DialogProps, {}> {

    @action
    handleClose = () => {
        this.props.dialogState.active = false
    }

    render() {

        console.log('子组件render');

        return this.props.dialogState.active ? (
            <div>
                <button onClick={this.handleClose}>关闭</button>
            </div>
        ) : null
    }
}

