import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import LoadingMessage from '../components/LoadingMessage';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../styles/Album.css';

class Album extends Component {
  constructor() {
    super();

    this.getMusicsList = this.getMusicsList.bind(this);
    this.musicsList = this.musicsList.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
    this.getFavoriteList = this.getFavoriteList.bind(this);

    this.state = {
      musicsResult: [],
      favoriteSongs: new Set(),
      loading: false,
      albumName: '',
      artistName: '',
    };
  }

  componentDidMount() {
    this.getMusicsList();
    this.getFavoriteList();
  }

  async handleFavoriteClick(song) {
    this.setState({
      loading: true,
    });
    const { favoriteSongs } = this.state;

    if (favoriteSongs.has(song.trackId)) {
      await removeSong(song);
      favoriteSongs.delete(song.trackId);
    } else {
      await addSong(song);
      favoriteSongs.add(song.trackId);
    }

    this.setState({
      loading: false,
    });
  }

  getFavoriteList() {
    getFavoriteSongs()
      .then((songs) => songs.map(({ trackId }) => trackId))
      .then((ids) => {
        const favoriteSongs = new Set(ids);
        this.setState({ favoriteSongs });
      });
  }

  getMusicsList() {
    const { match: { params } } = this.props;
    getMusics(params.id)
      .then((musicsResult) => {
        const { artistName, collectionName } = musicsResult[0];

        this.setState({
          musicsResult,
          artistName,
          albumName: collectionName,
        });
      });
  }

  musicsList() {
    const { favoriteSongs, musicsResult } = this.state;

    return (
      musicsResult.filter(({ kind }) => kind === 'song')
        .map((song) => {
          const { trackId, trackName, previewUrl } = song;
          const isFavorite = favoriteSongs.has(trackId);

          return (
            <MusicCard
              key={ trackId }
              trackName={ trackName }
              previewUrl={ previewUrl }
              trackId={ trackId }
              handleFavoriteClick={ () => this.handleFavoriteClick(song) }
              isFavorite={ isFavorite }
            />
          );
        })
    );
  }

  // Referência: Israel Sant'Anna (https://github.com/tryber/sd-016-b-project-trybetunes/pull/8)

  render() {
    const { loading,
      albumName,
      artistName } = this.state;

    return (
      <div className="album" data-testid="page-album">
        <Header />
        {loading ? <LoadingMessage /> : (
          <section className="album-section">
            <h2
              data-testid="album-name"
            >
              { albumName }
            </h2>
            <h3
              data-testid="artist-name"
            >
              { artistName }
            </h3>
            <div className="musics-list">
              {this.musicsList()}
            </div>
          </section>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
