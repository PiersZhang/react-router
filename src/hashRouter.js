/*
 * @Author: Piers.Zhang
 * @Date: 2021-01-03 15:58:14
 * @LastEditTime: 2021-01-12 19:29:35
 * @LastEditors: Do not edit
 */
import React from 'react'

let { Provider, Consumer } = React.createContext()

export class HashRouter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPath: this.getCurrentPath.bind(this)(window.location.href)
        }
    }
    componentDidMount() {
        window.addEventListener('hashchange', this.onChangeView.bind(this))
    }
    componentWillUnmount() {
        window.removeEventListener('hashchange')
    }
    onChangeView(e) {
        let currentPath = this.getCurrentPath.bind(this)(window.location.href)
        this.setState({ currentPath })
    }
    getCurrentPath(url) {
        let hashRoute = url.split('#')
        return hashRoute[1]
    }
    render() {
        return (
            <Provider value={{ currentPath: this.state.currentPath }}>
                <div>
                    {
                        React.Children.map(this.props.children, function (child) {
                            return child
                        })
                    }
                </div>
            </Provider>
        )
    }
}

export class Route extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let { path, render } = this.props
        return (
            <Consumer>
                {
                    (value) => {
                        console.log(value)
                        return (
                            value.currentPath === path && render()
                        )
                    }
                }
            </Consumer>
        )
    }
}
export class Link extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let { to, ...props } = this.props
        return <a href={'#' + to} {...props} />
    }
}