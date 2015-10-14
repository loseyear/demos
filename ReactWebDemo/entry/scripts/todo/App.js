var React = require('react');
var ReactDom = require('react-dom');
var LocalDb = require('localDB');

var TodoHeader = require('./TodoHeader');
var TodoMain = require('./TodoMain');
var TodoFooter = require('./TodoFooter');

var App = React.createClass({
    getInitialState: function() {
        this.db = new LocalDb('React-Todos');
        return {
            todos: this.db.get("todos") || [],
            isAllChecked: false
        }
    },
    addTodo(todoItem) {
        this.state.todos.push(todoItem);
        this.setState(
            {todos: this.state.todos},
            function() {this.db.set('todos', this.state.todos)}
        );
    },
    deleteTodo(index) {
        this.state.todos.splice(index, 1);
        this.allChecked();
        this.setState(
            {todos: this.state.todos},
            function() {this.db.set('todos', this.state.todos)}
        );
    },
    changeTodo(index, isDone, isChangeAll = false) {
        if (isChangeAll) {
            this.setState({
                todos: this.state.todos.map((todo) => {
                    todo.isDone = isDone;
                    return todo;
                }),
                isAllChecked: isDone},
                function() {this.db.set('todos', this.state.todos)}
            );
        } else {
            this.state.todos[index].isDone = isDone;
            this.allChecked();
            this.setState(
                {todos: this.state.todos},
                function() {this.db.set('todos', this.state.todos)}
            );
        }
    },
    clearDone() {
        let todos = this.state.todos.filter(todo => !todo.isDone);
        this.setState(
            {todos: todos, isAllChecked: false},
            function() {this.db.set('todos', this.state.todos)}
        );
    },
    allChecked() {
        let isAllChecked = false;
        if(this.state.todos.every((todo)=> todo.isDone)){
            isAllChecked = true;
        }
        this.setState({todos: this.state.todos, isAllChecked});
    },
    render: function() {
        var props = {
            todoCount: this.state.todos.length || 0,
            todoDoneCount: (this.state.todos && this.state.todos.filter((todo) => todo.isDone)).length || 0
        };
        return (
            <div className='app'>
                <TodoHeader
                    addTodo = {this.addTodo}
                />
                <TodoMain
                    todos = {this.state.todos}
                    changeTodo = {this.changeTodo}
                    deleteTodo = {this.deleteTodo}
                />
                <TodoFooter
                    isAllChecked = {this.state.isAllChecked}
                    clearDone = {this.clearDone}
                    {...props}
                    changeTodo = {this.changeTodo}
                />
            </div>
        );
    }
});

ReactDom.render (
     <App />,
     document.getElementById("demo")
 );

