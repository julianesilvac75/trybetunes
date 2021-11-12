import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
    this.onSearchArtistInputChange = this.onSearchArtistInputChange.bind(this);

    this.state = {
      searchArtistInput: '',
      isSearchButtonDisabled: true,
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
  }

  render() {
    const { searchArtistInput,
      isSearchButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
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
        </form>
      </div>
    );
  }
}

export default Search;
