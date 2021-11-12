import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Results extends Component {
  handleAlbunsList(album) {
    const { collectionId,
      collectionName,
      artworkUrl100,
      artistName } = album;

    return (
      <div key={ collectionId }>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          { collectionName }
        </Link>
        <p>{ artistName }</p>
      </div>
    );
  }

  render() {
    const { chosenArtist,
      resultAPI } = this.props;

    return (
      <div>
        {resultAPI.length === 0 ? <p>Nenhum álbum foi encontrado</p> : (
          <div>
            <p>{`Resultado de álbuns de: ${chosenArtist}`}</p>
            {resultAPI.map(this.handleAlbunsList)}
          </div>) }
      </div>
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
