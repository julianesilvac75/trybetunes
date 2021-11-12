import React, { Component } from 'react';
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
        <h1>Header</h1>
        <div data-testid="header-user-name">
          {userName ? `Olá, ${userName}!` : <LoadingMessage />}
        </div>
      </header>
    );
  }
}

export default Header;
