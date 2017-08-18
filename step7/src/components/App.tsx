import * as React from 'react'
import * as styles from './app.less'
import { observable, action, useStrict } from 'mobx'
import { observer } from 'mobx-react'

useStrict(true)

interface State {
    name: string,
    age: number
}

@observer
class App extends React.Component<{}, State> {

    @observable num: number = 0
    @observable arr: string[] = ['a']

    async componentDidMount() {
        // await this.delay()
        // this.handleClick()
    }

    delay = () => new Promise((resolve, reject) => { setTimeout(resolve, 3000) })

    @action
    handleClick = (): void => {
        this.num++
    }

    @action
    handleClick2 = (): void => {
        this.arr.push('b')
    }

    render() {
        console.log(this.arr)
        return (
            <div>
                <h1>{this.num}</h1>
                <p>{this.arr[this.num]}</p>
                <button onClick={this.handleClick}>增加计数</button>
                <button onClick={this.handleClick2}>增加计数2</button>
            </div>
        )
    }
}

export default App
