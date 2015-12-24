var render = require('react-dom').render;
var Router = require('react-router').Router;
var createHistory = require('history/lib/createHashHistory');
//To Prevent random string appearing in react-router
var history = createHistory({
    queryKey: false
});
var AppRouter = require('./components/app-router');

render(
    <Router history={history} routes={AppRouter} />,
    document.getElementById('example')
)

