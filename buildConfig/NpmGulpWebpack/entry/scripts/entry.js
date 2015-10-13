var React = require('react');
var ReactDom = require('react-dom');
var HelloMessage = React.createClass({
    render: function() {
        return <div>Hello {this.props.name}</div>;
    }
});

ReactDom.render (
     <HelloMessage name="John" />,
     document.getElementById("demo")
 );
