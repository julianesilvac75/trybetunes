import React, { Component } from 'react';
import '../styles/LoadingMessage.css';

class LoadingMessage extends Component {
  render() {
    return (
      <div className="loading">
        <div className="lds-default">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>

        {/* Loader reference: https://loading.io/css/ */}
        <span>Carregando...</span>
      </div>
    );
  }
}

export default LoadingMessage;
