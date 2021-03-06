import React, {Component} from 'react';

class Message extends Component {
  render() {
    const message = this.props.message;
    if (message.type === "incomingNotification") {
      return (<div className="message system">{message.content}</div>);
    } else if (message.type === "imageMessage") {
      return (
        <div className="message">
          <span className="message-username">{message.username}</span>
          <img className="message-image" src={message.content}/>
        </div>
      )
    } else {
      return (
        <div className="message">
          <span className="message-username">{message.username}</span>
          <span className="message-content">{message.content}</span>
        </div>
      )
    }
  }
}
export default Message;
