import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Chatbar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // type:'',
      currentUser:'',
      messages: [] // messages coming from the server will be stored here as they arrive
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
      this.setState({
        messages: this.state.messages.concat(newMessage)
      });
      // switch(newMessage.type) {
      //   case "incomingMessage":
      //     // handle incoming message
      //     this.setState({
      //       messages: this.state.messages.concat(newMessage)
      //     });
      //     break;
      //   case "incomingNotification":
      //     this.setState({
      //       messages: this.state.messages.concat(newMessage)
      //     });
      //     break;
      //   default:
      //     // show an error in the console if the message type is unknown
      //     throw new Error("Unknown event type " + data.type);
      }
    
  }

  sendMsg(message) {
    
      // Add a new message to the list of messages in the data store
      const data = {content: message, username: this.state.currentUser};
      this.socket.send(JSON.stringify(data));
  }

  changeName(name){
    this.setState({
      currentUser: name
    })
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <Chatbar currentUser={this.state.currentUser} sendMsg={ this.sendMsg } changeName={this.changeName} />
      </div>
    )
  }
}
export default App;
