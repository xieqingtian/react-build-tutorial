import * as React from 'react'
import { observer, inject } from 'mobx-react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import * as styles from './index.less'

interface SideBarProps {
    changeShowType: (type: number) => void
}

@observer
class SideBar extends React.Component<SideBarProps, {}> {
    render() {
        return (
            <div className={styles.container}>
                <FloatingActionButton
                    onClick={(): void => this.props.changeShowType(1)}
                >
                    <span>已完成</span>
                </FloatingActionButton>
                <FloatingActionButton
                    onClick={(): void => this.props.changeShowType(0)}
                >
                    <span>未完成</span>
                </FloatingActionButton>
                <FloatingActionButton
                    onClick={(): void => this.props.changeShowType(-1)}
                >
                    <span>所有</span>
                </FloatingActionButton>
            </div>
        )
    }
}

export default SideBar
