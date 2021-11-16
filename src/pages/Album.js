import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import musicsAPI from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import LoadingMessage from '../components/LoadingMessage';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.getMusics = this.getMusics.bind(this);
    this.musicsList = this.musicsList.bind(this);

    this.state = {
      isResultDone: false,
      musicsResult: '',
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.getMusics();
  }

  async getMusics() {
    const { match: { params } } = this.props;
    const result = await musicsAPI(params.id);
    const favoriteSongs = await getFavoriteSongs();

    this.setState({
      musicsResult: result,
      favoriteSongs,
    }, () => this.setState({
      isResultDone: true,
    }));
  }

  musicsList(musicsResult) {
    const { favoriteSongs } = this.state;

    return musicsResult.map((music) => {
      const { kind,
        trackId,
        trackName,
        previewUrl } = music;

      if (kind === 'song') {
        return (
          <MusicCard
            key={ trackId }
            trackName={ trackName }
            previewUrl={ previewUrl }
            trackId={ trackId }
            favoriteSongs={ favoriteSongs }
          />);
      }

      return null;
    });
  }

  render() {
    const { musicsResult,
      isResultDone } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {isResultDone ? (
          <div>
            <h2
              data-testid="album-name"
            >
              { musicsResult[0].collectionName}
            </h2>
            <h3
              data-testid="artist-name"
            >
              { musicsResult[0].artistName }
            </h3>
            {this.musicsList(musicsResult)}
          </div>
        ) : <LoadingMessage />}
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
