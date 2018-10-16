import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Blockies from 'react-blockies';

class GreetingView extends Component {
  render() {
    return (
      <div className="greeting-view">
        <div className="container">
          <div className="row">
            <Blockies
              seed={this.props.identity.address.toLowerCase()}
              size={8}
              scale={8}
            />
            <div>
              <p className="user-id">{this.props.identity.name}</p>
              <p className="wallet-address">{this.props.identity.address}</p>
            </div>
          </div>
          <hr className="separator" />
          <div className="row">
            <span className="checkmark-ico icon-check" />
            <div>
              <strong>You created a new account</strong>
              <p>
                Received 20 <em>kliks</em>
              </p>
            </div>
          </div>
          <hr className="separator" />
          {this.props.greetMode > 0 ? (
            <div className="row">
              <span className="checkmark-ico icon-check order-2" />
              <div>
                <strong>You added a new device</strong>
                <p>
                  Received 5 <em>kliks</em>
                </p>
              </div>
            </div>
          ) : (
            <div className="row">
              <span className="bonus-ico icon-smartphone" />
              <div>
                <strong>Add a second device to increase security</strong>
                <p>
                  You&#39;ll get 5 extra <em>kliks</em>
                </p>
              </div>
            </div>
          )}
          <hr className="separator" />
          {this.props.greetMode > 1 ? (
            <div className="row">
              <span className="checkmark-ico icon-check order-3" />
              <div>
                <strong>You printed your backup code</strong>
                <p>
                  Received 10 <em>kliks</em>
                </p>
              </div>
            </div>
          ) : (
            <div className="row">
              <span className="icon-printer bonus-ico" />
              <div>
                <strong>Save a backup code</strong>
                <p>
                  You&#39;ll get 10 extra <em>kliks</em>
                </p>
              </div>
            </div>
          )}

          <button
            className="btn fullwidth start-btn"
            onClick={this.props.onStartClick.bind(this)}
          >
            Go to App
          </button>
        </div>
      </div>
    );
  }
}

GreetingView.propTypes = {
  identity: PropTypes.object,
  greetMode: PropTypes.number,
  onStartClick: PropTypes.func
};

export default GreetingView;
