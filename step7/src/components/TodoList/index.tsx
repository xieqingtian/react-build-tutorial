import * as React from 'react'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'
import Footer from '../Footer'
import TodoItem from '../TodoItem'
import SideBar from '../SideBar'
import * as styles from './index.less'
import todoStore from '../../stores'

console.log(todoStore);

@withRouter
@observer
class TodoList extends React.Component<any, any> {
    render() {
        return (
            <div className={styles.container}>
                <AppBar title="TodoList" showMenuIconButton={false} style={{ textAlign: 'center' }} />
                <img src={require('../../assets/images/logo.svg')} width="100" alt="react-logo" />
                <TodoItem />
                <Paper>
                    <div className={styles.statisticsWrapper}>
                        <p>已完成：<span>2</span></p>
                        <p>总数：<span>5</span></p>
                    </div>
                </Paper>
                <Footer />
                <SideBar />
            </div>
        )
    }
}

export default TodoList
