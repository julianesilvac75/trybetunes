import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  render() {
    const { isLoginButtonDisabled,
      onUserNameChange,
      onSaveButtonClick,
      userName } = this.props;

    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <form>
          <input
            type="text"
            name="userName"
            value={ userName }
            data-testid="login-name-input"
            placeholder="Insira o seu nome"
            onChange={ onUserNameChange }
          />

          <button
            type="submit"
            data-testid="login-submit-button"
            onClick={ onSaveButtonClick }
            disabled={ isLoginButtonDisabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  userName: PropTypes.string.isRequired,
  isLoginButtonDisabled: PropTypes.bool.isRequired,
  onUserNameChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Login;
