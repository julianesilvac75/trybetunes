import React, { Component } from 'react';
import Header from '../components/Header';
import LoadingMessage from '../components/LoadingMessage';
import { getUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.handleUser = this.handleUser.bind(this);
    this.onInputChange = this.onInputChange.bind(this);

    this.state = {
      loading: true,
      userName: '',
      email: '',
      image: '',
      description: '',
    };
  }

  componentDidMount() {
    this.handleUser();
  }

  handleUser() {
    getUser()
      .then((user) => {
        const { name, email, image, description } = user;
        this.setState({
          userName: name,
          email,
          image,
          description,
          loading: false,
        });
      });
  }

  onInputChange({ target }) {
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { loading,
      userName,
      email,
      image,
      description } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading ? <LoadingMessage /> : (
          <form>
            <img
              className="user-image"
              // src={ image }
              src={ !image ? 'https://thumbs.dreamstime.com/b/%C3%ADcone-liso-do-usu%C3%A1rio-an%C3%B4nimo-105446565.jpg' : image }
              alt={ userName }
            />
            <label htmlFor="edit-input-image">
              URL da imagem
              <input
                name="image"
                type="text"
                value={ image }
                id="edit-input-image"
                data-testid="edit-input-image"
                onChange={ this.onInputChange }
              />
            </label>

            <label htmlFor="edit-input-name">
              Nome
              <input
                name="userName"
                type="text"
                value={ userName }
                id="edit-input-name"
                data-testid="edit-input-name"
                onChange={ this.onInputChange }
              />
            </label>

            {/* Fazer validação com regex */}
            <label htmlFor="edit-input-email">
              E-mail
              <input
                name="email"
                type="text"
                value={ email }
                id="edit-input-email"
                data-testid="edit-input-email"
                onChange={ this.onInputChange }
              />
            </label>

            <label htmlFor="edit-input-description">
              Descrição
              <input
                name="description"
                type="text"
                value={ description }
                id="edit-input-description"
                data-testid="edit-input-description"
                onChange={ this.onInputChange }
              />
            </label>

            <button
              type="submit"
              data-testid="edit-button-save"
            >
              Salvar
            </button>
          </form>
        ) }
      </div>
    );
  }
}

export default ProfileEdit;
