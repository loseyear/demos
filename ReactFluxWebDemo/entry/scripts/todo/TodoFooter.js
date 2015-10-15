var React = require('react');
var ReactDom = require('react-dom');

var TodoFooter = React.createClass({
    handleAll: function(event) {
        this.props.changeTodo(null, event.target.checked, true);
    },
    handleClear: function() {
        this.props.clearDone();
    },
    render: function() {
        let allChecked = (this.props.isAllChecked || (this.props.todoDoneCount === this.props.todoCount));
        return (
            <footer>
                <input
                    type="checkbox"
                    checked = {allChecked}
                    onChange = {this.handleAll}
                />
                <span>{this.props.todoDoneCount}已完成/{this.props.todoCount}总数</span>
                <button
                    onClick = {this.handleClear}
                >delete checked</button>
            </footer>
        );
    }
});

module.exports = TodoFooter;

