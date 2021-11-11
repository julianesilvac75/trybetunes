import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoadingMessage extends Component {
  componentDidMount() {
    const { onComponentOnmount } = this.props;

    onComponentOnmount();
  }

  render() {
    return (
      <div>
        <span>Carregando...</span>
      </div>
    );
  }
}

LoadingMessage.propTypes = {
  onComponentOnmount: PropTypes.func.isRequired,
};

export default LoadingMessage;
