import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      message: '',
    }
    this.keyPressUser =this.keyPressUser.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.onContent = this.onContent.bind(this);
    this.onUser = this.onUser.bind(this);
  }

  onUser(event) {
    this.setState({
      currentUser: event.target.value
      
    });
  }

  onContent(event) {
    this.setState({
      type:'postMessage',
      message: event.target.value
    });
  }
  
  keyPressUser(e) {
    if(e.keyCode == 13){
      this.setState({
        currentUser: e.target.value
      });
      this.props.changeName(this.state.currentUser);
    }
  }  

  keyPress(e){
    if(e.keyCode == 13){
       this.props.sendMsg(this.state.message);
       this.setState({
         message: ''
      });
    }
  }

  // setTimeout(function() {
  //   ReactDOM.render(<input value={null} />, mountNode);
  // }, 1000);

  render() {
    return (
        <footer className="chatbar">
            <input className="chatbar-username" ref="currentUser" onKeyDown={this.keyPressUser}  onChange={ this.onUser } value={this.state.currentUser} placeholder="Your Name (Optional)"/>
            <input className="chatbar-message" ref="message" onKeyDown={this.keyPress} onChange={ this.onContent } value={ this.state.message } placeholder="Type a message and hit ENTER" />
        </footer>
    );
  }
}

export default Chatbar;
