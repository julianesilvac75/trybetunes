import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import LoadingMessage from '../components/LoadingMessage';
import { getUser, updateUser } from '../services/userAPI';
import '../styles/ProfileEdit.css';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.handleUser = this.handleUser.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);

    this.state = {
      loading: true,
      userName: '',
      email: '',
      image: '',
      description: '',
      buttonDisabled: false,
      redirect: false,
    };
  }

  componentDidMount() {
    this.handleUser();
  }

  handleSaveButton() {
    const { userName,
      email,
      image,
      description } = this.state;
    const regexp = /^[^\s@]+@[^\s@]+\.com/;
    // Referência da regexp: https://stackoverflow.com/a/9204568/16902419

    const validation = [
      (userName.length > 0),
      (email.length > 0),
      (regexp.test(email)),
      (image.length > 0),
      (description.length > 0),
    ];

    const buttonDisabled = validation.every((el) => el);

    this.setState({
      buttonDisabled: !buttonDisabled,
    });
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

  handleSaveButtonClick(event) {
    event.preventDefault();
    this.setState({
      loading: true,
    });

    const { userName,
      email,
      image,
      description } = this.state;
    const userInfo = {
      name: userName,
      email,
      image,
      description,
    };

    updateUser(userInfo)
      .then(() => this.setState({
        redirect: true,
      }));
  }

  onInputChange({ target }) {
    const { value, name } = target;

    this.setState({
      [name]: value,
    }, () => { this.handleSaveButton(); });
  }

  render() {
    const { loading,
      userName,
      email,
      image,
      description,
      buttonDisabled,
      redirect } = this.state;

    return (
      <div
        className="page-profile-edit"
        data-testid="page-profile-edit"
      >
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
              Imagem
              <input
                name="image"
                type="text"
                value={ image }
                id="edit-input-image"
                data-testid="edit-input-image"
                onChange={ this.onInputChange }
                placeholder="Digite a URL da imagem"
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
                placeholder="Digite seu nome"
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
                placeholder="exemplo@exemplo.com"
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
                placeholder="Digite algo sobre você"
              />
            </label>

            <button
              className="edit-button"
              type="submit"
              data-testid="edit-button-save"
              onClick={ this.handleSaveButtonClick }
              disabled={ buttonDisabled }
            >
              Salvar
            </button>
          </form>
        ) }

        {redirect && <Redirect to="/profile" />}
      </div>
    );
  }
}

export default ProfileEdit;
