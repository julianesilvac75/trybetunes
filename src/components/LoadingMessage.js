import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoadingMessage extends Component {
  componentDidMount() {
    const { onComponentOnmount } = this.props;

    return onComponentOnmount && onComponentOnmount();
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
  onComponentOnmount: PropTypes.func,
};

LoadingMessage.defaultProps = {
  onComponentOnmount: null,
};

export default LoadingMessage;
