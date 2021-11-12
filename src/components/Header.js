import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingMessage from './LoadingMessage';

class Header extends Component {
  constructor() {
    super();

    this.getUserName = this.getUserName.bind(this);

    this.state = {
      userName: '',
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  async getUserName() {
    const userInfo = await getUser();

    this.setState({
      userName: userInfo.name,
    });
  }

  render() {
    const { userName } = this.state;

    return (
      <header data-testid="header-component">
        <div data-testid="header-user-name">
          {userName ? `Olá, ${userName}!` : <LoadingMessage />}
        </div>
        <Link
          to="/search"
          data-testid="link-to-search"
        >
          Pesquisar
        </Link>
        |
        <Link
          to="/favorites"
          data-testid="link-to-favorites"
        >
          Músicas favoritas
        </Link>
        |
        <Link
          to="/profile"
          data-testid="link-to-profile"
        >
          Perfil
        </Link>
      </header>
    );
  }
}

export default Header;
