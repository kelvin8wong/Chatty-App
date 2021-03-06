import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <main>{
        this.props.messages.map((currentMessage)=>{
          return <Message message={currentMessage} key={currentMessage.id}/>
        })
      }</main>
    );
  } 
} 

export default MessageList;

