import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/MusicCard.css';
import { addSong } from '../services/favoriteSongsAPI';
import LoadingMessage from './LoadingMessage';

class MusicCard extends Component {
  constructor() {
    super();

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleFavoriteSong = this.handleFavoriteSong.bind(this);

    this.state = {
      loading: false,
      loadingAlbum: false,
      favorited: false,
    };
  }

  componentDidMount() {
    this.handleFavoriteSong();
  }

  handleFavoriteSong() {
    const { favoriteSongs, trackId } = this.props;

    this.setState({
      loadingAlbum: true,
      favorited: favoriteSongs.some((id) => id === trackId.toString()),
    }, () => this.setState({
      loadingAlbum: false,
    }));
  }

  handleCheckboxChange({ target }) {
    const { checked, value } = target;

    if (checked) {
      this.setState({
        loading: true,
      }, async () => {
        await addSong(value);
        this.setState({
          loading: false,
          favorited: true,
        });
      });
    } else {
      this.setState({
        loading: true,
        favorited: false,
      }, () => {
        this.setState({
          loading: false,
        });
      });
    }
  }

  render() {
    const { trackName,
      previewUrl,
      trackId } = this.props;
    const { loading,
      favorited,
      loadingAlbum } = this.state;

    if (loadingAlbum) {
      return <LoadingMessage />;
    }

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
              className="checkbox-input"
              onChange={ this.handleCheckboxChange }
              checked={ favorited }
            />
            <i className="favorite-heart empty-heart far fa-heart " />
            <i className="favorite-heart full-heart fas fa-heart" />
            {/* Referência do botão de favorito: https://codepen.io/Guades/pen/bewZgO */}
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
  favoriteSongs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MusicCard;
