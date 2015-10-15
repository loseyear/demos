var React = require('react');
var ReactDom = require('react-dom');
var TodoStore = require('../stores/TodoStore');
var Header = require('./TodoHeader');
var Main = require('./TodoMain');
var Footer = require('./TodoFooter');

function getTodos() {
    return {
        todos: TodoStore.getAll(),
        isAllChecked: false
    }
}

var App = React.createClass({
    getInitialState: function() {
        return getTodos();
    },
    _onChange: function() {
        this.setState(getTodos());
    },
    render: function() {
        return (
            <div>
                <Header />
                <Main />
                <Footer />
            </div>
        )
    }
});

ReactDom.render (
    <App />,
    document.getElementById('demo')
);
