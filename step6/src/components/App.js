import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'
import styles from './app.less'
import { Button } from 'antd-mobile'


// const A = props => {
//     return (
//         <div style={{ height: 300, width: 400, background: 'yellow', position: 'absolute', top: 0, left: 0 }}>

//         </div>
//     )
// }

// const B = props => {
//     return (
//         <div style={{ height: 300, width: 400, background: 'red', position: 'absolute', top: 0, left: 0 }}>

//         </div>
//     )
// }

// const C = props => {
//     return (
//         <div style={{ height: 300, width: 400, background: 'green', position: 'absolute', top: 0, left: 0 }}>

//         </div>
//     )
// }

// const mapStateToProps = (state, ownProps) => {
//     return state
// }

// const mapDispatchToProps = (dispatch, ownProps) => ({
//     linkToA: () => dispatch(push('/a')),
//     linkToB: () => dispatch(push('/b')),
//     linkToC: () => dispatch(push('/c')),
// })

// @withRouter
// @connect(mapStateToProps, mapDispatchToProps)
// class App extends Component {

//     state = {
//         type: false
//     }

//     click = ()=>{
//         //window.location.search = '?name=tom'
//         const { pathname } = this.props.router.location
//         this.props.history.push(pathname+'?name=tom')
//     }

//     componentDidMount() {
//         console.log(666);
//     }

//     render() {

//         const { pathname } = this.props.router.location

//         return (
//             <div>
//                 <div className={styles.container}>
//                     <TransitionGroup>
//                         <CSSTransition key={pathname} timeout={500} classNames={this.state.type ? 'slide' : 'fade'} mountOnEnter={true} unmountOnExit={true}>
//                             <Switch location={this.props.router.location}>
//                                 <Route exact path="/" component={A} />
//                                 <Route exact path="/a" component={A} />
//                                 <Route exact path="/b" component={B} />
//                                 <Route exact path="/c" component={C} />
//                             </Switch>
//                         </CSSTransition>
//                     </TransitionGroup>
//                 </div>
//                 <Button onClick={() => this.props.linkToA()}>A</Button>
//                 <Button onClick={() => this.props.linkToB()}>B</Button>
//                 <Button onClick={() => this.props.linkToC()}>C</Button>
//                 <br />
//                 <Button onClick={() => this.setState({ type: !this.state.type })}>{this.state.type ? '渐变' : '滑动'}</Button>
//             </div>
//         )
//     }
// }

import { TabBar, Icon } from 'antd-mobile';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'redTab',
            hidden: false,
        };
    }

    renderContent(pageText) {
        return (
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
                <div style={{ paddingTop: 60 }}>你已点击“{pageText}” tab， 当前展示“{pageText}”信息</div>
                <a style={{ display: 'block', marginTop: 40, marginBottom: 600, color: '#108ee9' }}
                    onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                            hidden: !this.state.hidden,
                        });
                    }}
                >
                    点击切换 tab-bar 显示/隐藏
        </a>
            </div>
        );
    }

    render() {
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
                hidden={this.state.hidden}
            >
                <TabBar.Item
                    title="生活"
                    key="生活"
                    icon={<div style={{
                        width: '0.44rem',
                        height: '0.44rem',
                        background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  0.42rem 0.42rem no-repeat'
                    }}
                    />
                    }
                    selectedIcon={<div style={{
                        width: '0.44rem',
                        height: '0.44rem',
                        background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  0.42rem 0.42rem no-repeat'
                    }}
                    />
                    }
                    selected={this.state.selectedTab === 'blueTab'}
                    badge={1}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'blueTab',
                        });
                    }}
                    data-seed="logId"
                >
                    {this.renderContent('生活')}
                </TabBar.Item>
                <TabBar.Item
                    icon={<Icon type="koubei-o" size="md" />}
                    selectedIcon={<Icon type="koubei" size="md" />}
                    title="口碑"
                    key="口碑"
                    badge={'new'}
                    selected={this.state.selectedTab === 'redTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'redTab',
                        });
                    }}
                    data-seed="logId1"
                >
                    {this.renderContent('口碑')}
                </TabBar.Item>
                <TabBar.Item
                    icon={
                        <div style={{
                            width: '0.44rem',
                            height: '0.44rem',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  0.42rem 0.42rem no-repeat'
                        }}
                        />
                    }
                    selectedIcon={
                        <div style={{
                            width: '0.44rem',
                            height: '0.44rem',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  0.42rem 0.42rem no-repeat'
                        }}
                        />
                    }
                    title="朋友"
                    key="朋友"
                    dot
                    selected={this.state.selectedTab === 'greenTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'greenTab',
                        });
                    }}
                >
                    {this.renderContent('朋友')}
                </TabBar.Item>
                <TabBar.Item
                    icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
                    selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
                    title="我的"
                    key="我的"
                    selected={this.state.selectedTab === 'yellowTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'yellowTab',
                        });
                    }}
                >
                    {this.renderContent('我的')}
                </TabBar.Item>
            </TabBar>
        );
    }
}

export default App