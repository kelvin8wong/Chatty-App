import React, {Component} from 'react';

class Message extends Component {
  render() {
    // if (oldname && username) {
    //   return (<div className="message system">{this.props.oldUser} has changed thier name to {this.props.currentUser}</div>);
    // } else {
      return (
        <div className="message">
          <span className="message-username">{this.props.message.username}</span>
          <span className="message-content">{this.props.message.content}</span>
        </div>
      )
    }
  // }
}
export default Message;
