import React, { Component } from 'react';
import { Redirect } from 'react-router';
import LoadingMessage from '../components/LoadingMessage';
import { createUser } from '../services/userAPI';
import '../styles/Login.css';
import logo from '../images/logo.png';

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
      <section
        className="login-section"
        data-testid="page-login"
      >
        <div
          className="login-container"
        >
          <div className="logo">
            <i className="fas fa-guitar logo-img" />
            <h1>TrybeTunes</h1>
            <h2>O seu tocador de músicas favorito</h2>
          </div>
          {loading ? <LoadingMessage /> : (
            <form className="form-container">
              <h2>Login</h2>
              <input
                type="text"
                name="userName"
                value={ userName }
                className="login-name-input"
                data-testid="login-name-input"
                placeholder="Insira o seu nome"
                onChange={ this.onUserNameChange }
              />

              <button
                type="submit"
                className="login-submit-button"
                data-testid="login-submit-button"
                onClick={ this.onSaveButtonClick }
                disabled={ isLoginButtonDisabled }
              >
                Entrar
              </button>
            </form>
          )}
        </div>
      </section>
    );
  }
}

export default Login;
