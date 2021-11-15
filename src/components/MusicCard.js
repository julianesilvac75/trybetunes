import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/MusicCard.css';
import { addSong } from '../services/favoriteSongsAPI';
import LoadingMessage from './LoadingMessage';

class MusicCard extends Component {
  constructor() {
    super();

    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);

    this.state = {
      loading: false,
      favorited: false,
    };
  }

  async handleFavoriteClick({ target }) {
    const { checked, value } = target;

    if (checked) {
      this.setState({
        loading: true,
      });
      await addSong(value);
      this.setState({
        loading: false,
        favorited: true,
      });
    } else {
      this.setState({
        favorited: false,
      });
    }
  }

  render() {
    const { trackName,
      previewUrl,
      trackId } = this.props;
    const { loading, favorited } = this.state;

    return (
      <div>
        <span>{ trackName }</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          {`O seu navegador não suporta o elemento ${<code>audio</code>}.` }
        </audio>
        {loading ? <LoadingMessage /> : (
          <label
            htmlFor={ `checkbox-music-${trackId}` }
            className="favorite-container"
          >
            <input
              value={ trackId }
              type="checkbox"
              id={ `checkbox-music-${trackId}` }
              data-testid={ `checkbox-music-${trackId}
            ` }
              onClick={ this.handleFavoriteClick }
              checked={ favorited }
              readOnly
            />
            <i className="favorite-heart empty-heart far fa-heart " />
            <i className="favorite-heart full-heart fas fa-heart" />
            {/* Referência: https://codepen.io/Guades/pen/bewZgO */}
            Favorita
          </label>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
