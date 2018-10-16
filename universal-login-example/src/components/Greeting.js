import React, { Component } from 'react';
import GreetingView from '../views/GreetingView';
import PropTypes from 'prop-types';

class Greeting extends Component {
  showMainScreen() {
    this.props.identityService.emitter.emit('setView', 'MainScreen');
  }

  render() {
    const { identity } = this.props.identityService;
    return (
      <GreetingView
        identity={identity}
        onStartClick={this.showMainScreen.bind(this)}
        greetMode={0}
      />
    );
  }
}

Greeting.propTypes = {
  identityService: PropTypes.object,
  greetMode: PropTypes.number
};

export default Greeting;
