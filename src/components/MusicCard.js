import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/MusicCard.css';

class MusicCard extends Component {
  render() {
    const { trackName,
      previewUrl,
      trackId,
      isFavorite,
      handleFavoriteClick } = this.props;

    return (
      <div>
        <span>{ trackName }</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          {`O seu navegador não suporta o elemento ${<code>audio</code>}.` }
        </audio>
        <label
          htmlFor={ trackId }
          className="favorite-container"
        >
          Favorita
          <input
            type="checkbox"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}
          ` }
            className="checkbox-input"
            onChange={ handleFavoriteClick }
            checked={ isFavorite }
          />
          <i className="favorite-heart empty-heart far fa-heart " />
          <i className="favorite-heart full-heart fas fa-heart" />
          {/* Referência do botão de favorito: https://codepen.io/Guades/pen/bewZgO */}
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  handleFavoriteClick: PropTypes.func.isRequired,
};

export default MusicCard;
