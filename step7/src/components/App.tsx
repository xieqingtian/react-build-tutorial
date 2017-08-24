import * as React from 'react'
import { observable, action, useStrict } from 'mobx'
import { observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import TodoList from './TodoList'
import './app.less'

useStrict(true)

@observer
class App extends React.Component<{}, {}> {
    render() {
        return (
            <Router basename="/">
                <div>
                    <Route exact={true} path="/" component={TodoList} />
                    {/* {__DEV__ ? <DevTools /> : null} */}
                </div>
            </Router>
        )
    }
}

export default App
