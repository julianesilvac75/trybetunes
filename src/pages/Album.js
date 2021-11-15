import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import musicsAPI from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.getMusics = this.getMusics.bind(this);

    this.state = {
      isResultDone: false,
      musicsResult: '',
    };
  }

  componentDidMount() {
    this.getMusics();
  }

  async getMusics() {
    const { match: { params } } = this.props;
    const result = await musicsAPI(params.id);
    this.setState({
      isResultDone: true,
      musicsResult: result,
    });
  }

  musicsList(musicsResult) {
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
        {isResultDone && (
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
