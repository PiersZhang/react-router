/*
 * @Author: Piers.Zhang
 * @Date: 2021-01-03 12:39:53
 * @LastEditTime: 2021-01-12 19:49:47
 * @LastEditors: Do not edit
 */
import React from 'react';
import ReactDom from 'react-dom';
// import { BrowserRouter, Route, Link } from 'react-router-dom';
import { BrowserRouter, Route, Link } from './browserRouter';
// import { BrowserRouter, Route, Link } from './browserRouter/hashRouter';

function App() {
    const _style = {
        height: '600px',
        background: 'yellow'
    }
    return (
        <BrowserRouter >
            <Link to='/home'>Home</Link>
            <Link to='/about'>About</Link>
            <Route path='/home' render={()=><div style={_style}>home</div>}>home</Route>
            <Route path='/about' render={()=><div style={_style}>about</div>}>about</Route>
        </BrowserRouter>

    )
}
ReactDom.render(<App></App>,document.getElementById('root'))
