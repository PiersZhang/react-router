/*
 * @Author: Piers.Zhang
 * @Date: 2021-01-03 15:53:28
 * @LastEditTime: 2021-01-03 15:56:36
 * @LastEditors: Do not edit
 */
import React from 'react';

const { Consumer, Provider } = React.createContext()
export class BrowserRouter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPath: this.getParams.bind(this)(window.location.pathname)
        }
    }

    onChangeView() {
        const currentPath = this.getParams.bind(this)(window.location.pathname)
        this.setState({ currentPath });
    };

    getParams(url) {
        return url
    }

    componentDidMount() {
        window.addEventListener("popstate", this.onChangeView.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("popstate", this.onChangeView.bind(this));
    }

    render() {
        return (
            <Provider value={{ currentPath: this.state.currentPath, onChangeView: this.onChangeView.bind(this) }}>
                 <div>
                    {
                        React.Children.map(this.props.children, function (child) {
                            return child
                        })
                    }
                </div>
            </Provider>
        );
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
                {({ currentPath }) => currentPath === path && render()}
            </Consumer>
        )
    }
}
export class Link extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        let { to, ...props } = this.props
        return (
            <Consumer>
                {({ onChangeView }) => (
                    <a
                        {...props}
                        onClick={e => {
                            e.preventDefault();
                            window.history.pushState(null, "", to);
                            onChangeView();
                        }}
                    />
                )}
            </Consumer>
        )
    }
}




