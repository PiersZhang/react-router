<!--
 * @Author: Piers.Zhang
 * @Date: 2021-01-03 13:10:32
 * @LastEditTime: 2021-01-05 17:57:39
 * @LastEditors: Do not edit
-->
### learning react-router and balabala width me 
### 启动
`npm i `、`npm run dev `
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
