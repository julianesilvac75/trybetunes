import React, { Component } from 'react';
import '../styles/Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer>
        <section className="about-section">
          <div>
            <h1>
              <i className="fas fa-guitar" />
              <span>TrybeTunes</span>
              ®
            </h1>
            <ul className="links">
              <li>Sobre Nós</li>
              <li>Política de Privacidade</li>
              <li>Suporte</li>
              <li>Trabalhe conosco</li>
            </ul>
          </div>
          <div className="social-media">
            {/* <h3>Redes Sociais</h3> */}
            <i className="fab fa-instagram" />
            <i className="fab fa-facebook-square" />
            <i className="fab fa-google-play" />
            <i className="fab fa-app-store-ios" />
          </div>
        </section>
        <section className="info-section">
          <p>
            Desenvolvido por
            {' '}
            <a href="https://julianesilvac75.github.io/">Juliane Cardoso</a>
            {' '}
            💚

          </p>
          <p>
            Imagem de
            {' '}
            <a href="https://pixabay.com/pt/users/gdj-1086657/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1781579">Gordon Johnson</a>
            {' '}
            por
            {' '}
            <a href="https://pixabay.com/pt/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=153212">Pixabay</a>
          </p>
        </section>
      </footer>
    );
  }
}

export default Footer;
