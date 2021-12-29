/* eslint-disable indent */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingMessage from './LoadingMessage';
import '../styles/Header.css';

class Header extends Component {
  constructor() {
    super();

    this.getUserName = this.getUserName.bind(this);

    this.state = {
      name: '',
      image: '',
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  async getUserName() {
    const userInfo = await getUser();
    const { name, image } = userInfo;

    this.setState({
      name,
      image,
    });
  }

  render() {
    const { name, image } = this.state;

    return (
      <header
        className="header-component"
        data-testid="header-component"
      >
        <div
          className="header-user-name"
          data-testid="header-user-name"
        >
          <div className="logo">
            <i className="fas fa-guitar" />
            <h1>TrybeTunes</h1>
          </div>
          { !name ? <LoadingMessage /> : (
            <div className="user-info">
              <img
                src={ !image ? 'https://thumbs.dreamstime.com/b/%C3%ADcone-liso-do-usu%C3%A1rio-an%C3%B4nimo-105446565.jpg' : image }
                alt="User"
              />
              <p>{ name }</p>
            </div>
          )}
        </div>
        <ul className="search-links">
          <li>
            <Link
              to="/search"
              data-testid="link-to-search"
            >
              Pesquisar
              <i className="fas fa-search" />
            </Link>
          </li>
          <li>
            <Link
              to="/favorites"
              data-testid="link-to-favorites"
            >
              Músicas favoritas
              <i className="fas fa-heart" />
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              data-testid="link-to-profile"
            >
              Perfil
              <i className="fas fa-user" />
            </Link>
          </li>
        </ul>
      </header>
    );
  }
}

export default Header;
