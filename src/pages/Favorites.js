import React, { Component } from 'react';
import Header from '../components/Header';
import LoadingMessage from '../components/LoadingMessage';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();

    this.handleFavoriteSongs = this.handleFavoriteSongs.bind(this);
    this.getFavoritesList = this.getFavoritesList.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);

    this.state = {
      loading: true,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.handleFavoriteSongs();
    // this.getFavoritesList();
  }

  handleFavoriteSongs() {
    getFavoriteSongs()
      .then((result) => {
        const favoriteSongs = result;
        this.setState({
          favoriteSongs,
          loading: false,
        });
      });
  }

  async handleFavoriteClick(song) {
    this.setState({
      loading: true,
    });
    await removeSong(song);
    this.handleFavoriteSongs();
  }

  getFavoritesList() {
    const { favoriteSongs } = this.state;

    return favoriteSongs.map((song) => {
      const { trackName,
        previewUrl,
        trackId } = song;
      const isFavorite = favoriteSongs.includes(song);

      return (
        <MusicCard
          key={ trackId }
          trackName={ trackName }
          previewUrl={ previewUrl }
          trackId={ trackId }
          isFavorite={ isFavorite }
          handleFavoriteClick={ () => this.handleFavoriteClick(song) }
        />
      );
    });
  }

  render() {
    const { loading } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? <LoadingMessage /> : this.getFavoritesList() }
      </div>
    );
  }
}

export default Favorites;
