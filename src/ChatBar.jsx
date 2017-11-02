import React, {Component} from 'react';

class Chatbar extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: '',
      message: ''
    }

    this.keyPress = this.keyPress.bind(this);
    this.onContent = this.onContent.bind(this);
  }

  onContent() {
    const { currentUser, message} = this.refs;
    
    this.setState({
      currentUser: currentUser.value,
      message: message.value
    });
  }
  
  keyPress(e){
    const state = {};
    if(e.keyCode == 13){
       this.props.onNewMessage(this.state);
       state.message='';
    }
     this.setState(state);
  }

  // setTimeout(function() {
  //   ReactDOM.render(<input value={null} />, mountNode);
  // }, 1000);

  render() {
    return (
        <footer className="chatbar">
            <input className="chatbar-username" ref="currentUser" onKeyDown={this.keyPress}  onChange={ this.onContent } value={this.state.currentUser} placeholder="Your Name (Optional)"/>
            <input className="chatbar-message" ref="message" onKeyDown={this.keyPress} onChange={ this.onContent } value={ this.state.message } placeholder="Type a message and hit ENTER" />
        </footer>
    );
  }
}

export default Chatbar;
