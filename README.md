<!--
 * @Author: Piers.Zhang
 * @Date: 2021-01-03 13:10:32
 * @LastEditTime: 2021-01-12 19:17:56
 * @LastEditors: Do not edit
-->
### learning react-router and balabala width me 
### 启动
`npm i `、`npm start `
### react-router如何使用
[React Router 使用教程](http://www.ruanyifeng.com/blog/2016/05/react_router.html)

### 原生js实现hashRouter
原生js实现hashRouter主要是监听它的hashchange事件的变化，然后拿到对应的location.hash更新对应的视图
```html
    <!-- index.html --> 
    <!-- hashRouter -->
    <ul class="nav">
        <li><a href='#/home'>home</a></li>
        <li><a href='#/about'>about</a></li>
    </ul>
```
```javascript
    window.addEventListener('hashchange', changeView);
    let content = '';
    function onLoad() {
        content = document.getElementById('content');
        changeView();
    }
    function changeView() {
        switch (location.hash) {
            case '#/home':
                content.innerHTML = 'home';
                break;
            case '#/about':
                content.innerHTML = 'about';
                break;
        }
    }
    onLoad();
```

### 原生js实现historyRouter
能够实现history路由跳转不刷新页面得益与H5提供的pushState(),replaceState()等方法，这些方法都是也可以改变路由状态（路径），但不作页面跳转，我们可以通过location.pathname来显示对应的视图
```html
    <!-- index.html -->
    <!-- historyRouter -->
    <ul class="nav">
        <li><a href='/home'>home</a></li>
        <li><a href='/about'>about</a></li>
    </ul>
```

```javascript
    window.addEventListener('popstate', changeViewHistory);
    let content = '';
    function onLoad() {
        content = document.getElementById('content')
        changeViewHistory();
        let event = document.getElementsByTagName('ul')[0];
        event.addEventListener('click', (e) => {
            if(e.target.nodeName === 'A'){
                e.preventDefault();
                history.pushState(null, "", e.target.getAttribute('href'));
                changeViewHistory();
            }
        })
    }
    function changeViewHistory() {
        switch (location.pathname) {
            case '/home':
                content.innerHTML = 'home';
                break;
            case '/about':
                content.innerHTML = 'about';
                break;
        }

    }
    onLoad();
```

### react-router与react-router-dom区别
[两者区别](https://github.com/mrdulin/blog/issues/42)
react-router: 实现了路由的核心功能
react-router-dom: 基于react-router，加入了在浏览器运行环境下的一些功能，例如：Link组件，会渲染一个a标签，Link组件源码a标签行; BrowserRouter和HashRouter 组件，前者使用pushState和popState事件构建路由，后者使用window.location.hash和hashchange事件构建路由。

`npm i react react-dom react-router-dom @babel/preset-react -D`
```html
    <!-- src/public/index.html -->
    <div id="root"> </div>   
```
```javascript
    // src/index.js
    import React from 'react'
    import ReactDom from 'react-dom'
    import { BrowserRouter, Route, Link } from 'react-router-dom'
    function App() {
        return (
            <BrowserRouter>
                <Link to='/home'>home</Link>
                <Link to='/about'>about</Link>
                <Route path='/home' render={()=><div>home</div>}></Route>
                <Route path='/about' render={()=><div>about</div>}></Route>
            </BrowserRouter>
        )
    }
    ReactDom.render(<App></App>,document.getElementById('root'))
```

### BrowserRouter实现
BrowserRouter组件主要做的是将当前的路径往下传，并监听popstate事件
[组件间传值的六种方法](https://juejin.cn/post/6844903972415750157)
```javascript
// src/browserRouter.js
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
```
Router组件主要做的是通过BrowserRouter传过来的当前值，与Route通过props传进来的path对比，然后决定是否执行props传进来的render函数
```javascript
// src/browserRouter.js
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


```
Link组件主要做的是，拿到prop,传进来的to,通过PushState()改变路由状态，然后拿到BrowserRouter传过来的onChangeView手动刷新视图
```javascript
// src/browserRouter.js
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
```

### HashRouter实现
实现方式与BrowserRouter大同小异
```javascript
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
```