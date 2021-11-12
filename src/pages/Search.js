import React, { Component } from 'react';
import Header from '../components/Header';
import LoadingMessage from '../components/LoadingMessage';
import Results from '../components/Results';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

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
      loading: true,
    }));
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
      <div data-testid="page-search">
        <Header />

        {loading ? <LoadingMessage
          onComponentOnmount={ this.onComponentOnmount }
        /> : (
          <form>
            <input
              type="text"
              name="searchArtistInput"
              value={ searchArtistInput }
              placeholder="Digite o nome da banda ou artista"
              data-testid="search-artist-input"
              onChange={ this.onSearchArtistInputChange }
            />
            <button
              type="submit"
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
