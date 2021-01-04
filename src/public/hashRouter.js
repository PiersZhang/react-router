/*
 * @Author: Piers.Zhang
 * @Date: 2021-01-03 14:27:06
 * @LastEditTime: 2021-01-03 15:05:45
 * @LastEditors: Do not edit
 */
window.addEventListener('hashchange', changeViewHash);
let content = '';
function onLoad() {
    content = document.getElementById('content');
    changeViewHash();
}
function changeViewHash() {
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