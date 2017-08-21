import * as React from 'react'
import { observer, inject } from 'mobx-react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import * as styles from './index.less'

@observer
class SideBar extends React.Component<any, any> {
    render() {
        return (
            <div className={styles.container}>
                <FloatingActionButton><span>已完成</span></FloatingActionButton>
                <FloatingActionButton><span>未完成</span></FloatingActionButton>
                <FloatingActionButton><span>所有</span></FloatingActionButton>
            </div>
        )
    }
}

export default SideBar
