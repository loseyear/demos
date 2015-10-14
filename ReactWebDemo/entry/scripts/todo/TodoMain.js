var React = require('react');
var ReactDom = require('react-dom');
var TodoItem = require('./TodoItem');

var TodoMain = React.createClass({
    render: function() {
        return (
            <ul className='list'>
                {this.props.todos.map((todo, index) => {
                    return <TodoItem key = {index} {...todo} index = {index} {...this.props} />
                })}
            </ul>
        );
    }
});

module.exports = TodoMain;

