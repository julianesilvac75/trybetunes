import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import LoadingMessage from '../components/LoadingMessage';
import { getUser } from '../services/userAPI';
import '../styles/Profile.css';

class Profile extends Component {
  constructor() {
    super();

    this.handleUser = this.handleUser.bind(this);

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

  render() {
    const { loading,
      userName,
      email,
      image,
      description } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <LoadingMessage /> : (
          <div>
            <img
              className="user-image"
              // src={ image }
              src={ !image ? 'https://thumbs.dreamstime.com/b/%C3%ADcone-liso-do-usu%C3%A1rio-an%C3%B4nimo-105446565.jpg' : image }
              alt={ userName }
              data-testid="profile-image"
            />
            <h3>Nome</h3>
            <p>{ userName }</p>
            <h3>E-mail</h3>
            <p>{ !email ? 'Nenhum e-mail cadastrado' : email }</p>
            <h3>Descrição</h3>
            <p>{ !description ? 'Nenhuma descrição cadastrada' : description }</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>)}
      </div>
    );
  }
}

export default Profile;
