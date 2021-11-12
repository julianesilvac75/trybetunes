import React, { Component } from 'react';
import { Redirect } from 'react-router';
import LoadingMessage from '../components/LoadingMessage';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();

    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);

    this.state = {
      userName: '',
      loading: false,
      logged: false,
      isLoginButtonDisabled: true,
    };
  }

  onUserNameChange({ target }) {
    const { value } = target;
    const minNameLength = 3;

    this.setState({
      userName: value,
      isLoginButtonDisabled: value.length < minNameLength,
    });
  }

  async onSaveButtonClick(event) {
    event.preventDefault();
    const { userName } = this.state;

    this.setState({
      loading: true,
    });
    await createUser({ name: userName });
    this.setState({
      loading: false,
      logged: true,
    });
  }

  render() {
    const { userName,
      logged,
      loading,
      isLoginButtonDisabled } = this.state;

    if (logged) {
      return <Redirect to="/search" />;
    }

    // Referência: https://github.com/tryber/sd-016-b-project-trybetunes/pull/74

    return (
      <div data-testid="page-login">
        {loading ? <LoadingMessage /> : (
          <form>
            <h1>Login</h1>
            <input
              type="text"
              name="userName"
              value={ userName }
              data-testid="login-name-input"
              placeholder="Insira o seu nome"
              onChange={ this.onUserNameChange }
            />

            <button
              type="submit"
              data-testid="login-submit-button"
              onClick={ this.onSaveButtonClick }
              disabled={ isLoginButtonDisabled }
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default Login;
