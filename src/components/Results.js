import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/Results.css';

class Results extends Component {
  handleAlbunsList(album) {
    const { collectionId,
      collectionName,
      artworkUrl100,
      artistName } = album;

    return (

      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
        key={ collectionId }
      >
        <div className="album-container">
          <img src={ artworkUrl100 } alt={ collectionName } />
          <div>
            <span className="album-name">{ collectionName }</span>
            <span className="artist-name">{ artistName }</span>
          </div>
        </div>
      </Link>
    );
  }

  render() {
    const { chosenArtist,
      resultAPI } = this.props;

    return (
      <section>
        {resultAPI.length === 0
          ? (
            <div className="not-found">
              <i className="fas fa-exclamation" />
              Nenhum álbum foi encontrado
            </div>
          ) : (
            <div className="results-section">
              <p>{`Resultado de álbuns de: ${chosenArtist}`}</p>
              {resultAPI.map(this.handleAlbunsList)}
            </div>) }
      </section>
    );
  }
}

Results.propTypes = {
  chosenArtist: PropTypes.string.isRequired,
  resultAPI: PropTypes.arrayOf(PropTypes.shape({
    artistId: PropTypes.number,
    artistName: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    collectionPrice: PropTypes.number,
    artworkUrl100: PropTypes.string,
    releaseDate: PropTypes.string,
    trackCount: PropTypes.number,
  })),
};

Results.defaultProps = {
  resultAPI: PropTypes.arrayOf(PropTypes.shape({
    artistId: 0,
    artistName: '',
    collectionId: 0,
    collectionName: '',
    collectionPrice: 0,
    artworkUrl100: '',
    releaseDate: '',
    trackCount: 0,
  })),
};

export default Results;
