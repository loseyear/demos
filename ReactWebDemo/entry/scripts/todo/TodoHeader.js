var React = require('react');
var ReactDom = require('react-dom');

var TodoHeader = React.createClass({
    handleKeyUp: function(event) {
        if (event.keyCode === 13) {
            let value = event.target.value;
            if (!value) return false;
            let newTodoItem = {
                text: value,
                isDone: false
            };
            event.target.value = '';
            this.props.addTodo(newTodoItem);
        }
    },
    render: function() {
        return (
            <header>
                <input
                    type = "text"
                    placeholder = "Todo ..."
                    onKeyUp = {this.handleKeyUp}
                />
            </header>
        );
    }
});

module.exports = TodoHeader;
