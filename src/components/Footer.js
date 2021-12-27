import React, { Component } from 'react';
import '../styles/Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer>
        <section className="about-section">
          <div>
            <h1>TrybeTunes®</h1>
            <ul className="links">
              <li>Sobre Nós</li>
              <li>Política de Privacidade</li>
              <li>Suporte</li>
              <li>Trabalhe conosco</li>
            </ul>
          </div>
          <div>
            <h3>Redes Sociais</h3>
          </div>
        </section>
        <section>
          Desenvolvido por Juliane Cardoso
        </section>
      </footer>
    );
  }
}

export default Footer;
