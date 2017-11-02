import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Chatbar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser:'',
      messages: [] // messages coming from the server will be stored here as they arrive
    };
    this.onNewMessage = this.onNewMessage.bind(this);
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
    }
  }

  onNewMessage(object) {
      // Add a new message to the list of messages in the data store
      const data = {type:'postMessage', content: object.message, username: object.currentUser};
      this.socket.send(JSON.stringify(data));
  }


  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <Chatbar onNewMessage={ this.onNewMessage } />
      </div>
    )
  }
}
export default App;
