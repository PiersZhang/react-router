/*
 * @Author: Piers.Zhang
 * @Date: 2021-01-03 14:57:19
 * @LastEditTime: 2021-01-03 15:06:07
 * @LastEditors: Do not edit
 */
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
