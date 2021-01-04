/*
 * @Author: Piers.Zhang
 * @Date: 2021-01-03 12:39:53
 * @LastEditTime: 2021-01-03 15:57:41
 * @LastEditors: Do not edit
 */
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
// import { BrowserRouter, Route, Link } from './browserRouter';

function App() {
    return (
        <BrowserRouter >
            <Link to='/home'>home</Link>
            <Link to='/about'>about</Link>
            <Route path='/home' render={()=><div>home</div>}></Route>
            <Route path='/about' render={()=><div>about</div>}></Route>
        </BrowserRouter>

    )
}
ReactDom.render(<App></App>,document.getElementById('root'))
