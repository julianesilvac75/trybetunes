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
      <div
        className="page-profile"
        data-testid="page-profile"
      >
        <Header />
        {loading ? <LoadingMessage /> : (
          <section className="user-profile">
            <img
              className="user-image"
              // src={ image }
              src={ !image ? 'https://thumbs.dreamstime.com/b/%C3%ADcone-liso-do-usu%C3%A1rio-an%C3%B4nimo-105446565.jpg' : image }
              alt={ userName }
              data-testid="profile-image"
            />
            <div>
              <h3>Nome:</h3>
              <p>{ userName }</p>
            </div>
            <div>
              <h3>E-mail:</h3>
              <p>{ !email ? 'Nenhum e-mail cadastrado' : email }</p>
            </div>
            <div>
              <h3>Descrição:</h3>
              <p>{ !description ? 'Nenhuma descrição cadastrada' : description }</p>
            </div>
            <Link to="/profile/edit">
              <button className="edit-button" type="button">
                Editar perfil
              </button>
            </Link>
          </section>)}
      </div>
    );
  }
}

export default Profile;
