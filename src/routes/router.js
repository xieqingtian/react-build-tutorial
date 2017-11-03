import React, { Component } from 'react'
import request from '../api'

class App extends Component {
    state = {
        text: 'hello',
    }

    async componentDidMount() {
        const result = await request.get('https://cnodejs.org/api/v1/topics/?page=1&tab=job&limit=5')
        console.log(result)
    }

    render() {
        return (
            <div>
                <h1>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia inventore voluptatibus rem blanditiis
                    libero commodi impedit laborum quaerat placeat debitis natus, molestiae maiores voluptate unde
                    accusantium repudiandae facere quasi suscipit?
                </h1>
                <p>{this.state.text}</p>
                <h2>world</h2>
            </div>
        )
    }
}

export default App
