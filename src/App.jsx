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
    //Client gets informed when there is connection to server
    this.socket.onopen = (event) => {
      console.log("Connected to server");
    };

    this.socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      switch(newMessage.type) {
        case "incomingMessage":
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
          // update the number of online users
          this.setState({
            userCount: newMessage.userCount
          });
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type" + data.type);
      }
    }
  }

  // send message to server
  sendMsg(message){
    const data = {type: 'postMessage', content: message, username: this.state.currentUser};
    this.socket.send(JSON.stringify(data));
  }

  // send a notification to server when there is a change of users
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
          <span className="user-counter">{this.state.userCount} users online</span>
        </nav>
        <MessageList messages={this.state.messages}/>
        <Chatbar currentUser={this.state.currentUser} sendMsg={ this.sendMsg } changeName={this.changeName} />
      </div>
    )
  }
}
export default App;
