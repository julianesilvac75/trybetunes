import React, { Component } from 'react';
import Header from '../components/Header';
import LoadingMessage from '../components/LoadingMessage';
import Results from '../components/Results';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../styles/Search.css';

class Search extends Component {
  constructor() {
    super();

    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
    this.onSearchArtistInputChange = this.onSearchArtistInputChange.bind(this);
    this.onComponentOnmount = this.onComponentOnmount.bind(this);

    this.state = {
      searchArtistInput: '',
      chosenArtist: '',
      isSearchButtonDisabled: true,
      loading: false,
      resultAPI: '',
      isResultDone: false,
    };
  }

  onSearchArtistInputChange({ target }) {
    const { value } = target;
    const minValueLength = 2;

    this.setState({
      searchArtistInput: value,
      isSearchButtonDisabled: value.length < minValueLength,
    });
  }

  onSearchButtonClick(event) {
    event.preventDefault();

    this.setState((previousState) => ({
      chosenArtist: previousState.searchArtistInput,
      searchArtistInput: '',
      isSearchButtonDisabled: true,
      loading: true,
    }), () => this.onComponentOnmount());
  }

  async onComponentOnmount() {
    const { chosenArtist } = this.state;

    this.setState({
      resultAPI: await searchAlbumsAPI(chosenArtist),
    }, () => this.setState({ loading: false, isResultDone: true }));
  }

  render() {
    const { searchArtistInput,
      isSearchButtonDisabled,
      loading,
      isResultDone,
      chosenArtist,
      resultAPI } = this.state;

    return (
      <div
        className="page-search"
        data-testid="page-search"
      >
        <Header />

        {loading ? <LoadingMessage /> : (
          <form className="search-bar">
            <input
              type="text"
              name="searchArtistInput"
              value={ searchArtistInput }
              placeholder="Digite o nome da banda ou artista"
              className="search-artist-input"
              data-testid="search-artist-input"
              onChange={ this.onSearchArtistInputChange }
            />
            <button
              type="submit"
              className="search-artist-button"
              data-testid="search-artist-button"
              onClick={ this.onSearchButtonClick }
              disabled={ isSearchButtonDisabled }
            >
              Pesquisar
            </button>
          </form>)}

        {isResultDone && <Results
          chosenArtist={ chosenArtist }
          resultAPI={ resultAPI }
        />}
      </div>
    );
  }
}

export default Search;
