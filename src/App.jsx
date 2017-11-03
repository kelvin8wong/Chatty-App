import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Chatbar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type:'',
      currentUser:'Bob',
      messages: [],
      userCount: 0
    };
    this.sendMsg = this.sendMsg.bind(this);
    this.changeName = this.changeName.bind(this)
  }
  
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = (event) => {
      console.log("Connected to server");
    };

    this.socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      console.log("checking",newMessage);
      switch(newMessage.type) {
        case "incomingMessage":
          // handle incoming message
          this.setState({
            messages: this.state.messages.concat(newMessage)
          });
          break;
        case "incomingNotification":
          this.setState({
            messages: this.state.messages.concat(newMessage)
          });
          break;
        case "userCount":
          this.setState({
            userCount: newMessage.userCount
          });
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
      }
    }
  }
  sendMsg(message){
    
      // Add a new message to the list of messages in the data store
    const data = {type: 'postMessage', content: message, username: this.state.currentUser};
    this.socket.send(JSON.stringify(data));
  }

  changeName(name){
    const data = {type: 'postNotification', content: `${this.state.currentUser} has changed their name to ${name}`};
    this.socket.send(JSON.stringify(data));
    this.setState({
      currentUser: name
    })
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="user-counter">{this.state.userCount} users Online</span>
        </nav>
        <MessageList messages={this.state.messages}/>
        <Chatbar currentUser={this.state.currentUser} sendMsg={ this.sendMsg } changeName={this.changeName} />
      </div>
    )
  }
}
export default App;
