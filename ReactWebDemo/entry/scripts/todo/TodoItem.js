var React = require('react');
var ReactDom = require('react-dom');

var TodoItem = React.createClass({
    handleMouseOver: function() {
        this.refs.delete.style.display='block';
    },
    handleMouseOut: function() {
        this.refs.delete.style.display='none';
    },
    handleClick: function(){
        this.props.deleteTodo(this.props.index);
    },
    handleChange: function(){
        let isDone = !this.props.isDone;
        this.props.changeTodo(this.props.index, isDone);
    },
    render: function() {
        let doneStyle = this.props.isDone ? {textDecoration: 'line-through'} : {textDecoration: 'none'};
        return (
            <li
                onMouseOver = {this.handleMouseOver}
                onMouseOut = {this.handleMouseOut}
            >
                <input
                    type='checkbox'
                    onChange = {this.handleChange}
                    checked = {this.props.isDone}
                />
                <span
                    style = {doneStyle}
                >{this.props.text}</span>
                <button ref='delete'
                    onClick = {this.handleClick}
                >delete</button>
            </li>
        );
    }
});

module.exports = TodoItem;

