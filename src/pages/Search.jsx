import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    btnSearchDisable: true,
    search: '',
    loading: false,
    albums: [],
    searchValue: '',
  }

  searchButtonClick = async () => {
    const { search } = this.state;
    this.setState({
      search: '',
      btnSearchDisable: true,
      loading: true,
    });
    const albumFound = await searchAlbumsAPI(search);
    this.setState({
      loading: false,
      searchValue: search,
      albums: albumFound,
    });
  }

  onInputChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: value,
    }, () => {
      this.btnEnable();
    });
  };

  btnEnable = () => {
    const minCaracters = 2;
    const { search } = this.state;
    this.setState({
      btnSearchDisable: search.length < minCaracters,
    });
  }

  render() {
    const { btnSearchDisable, search, loading, searchValue, albums } = this.state;
    if (loading) return <Loading />;

    return (
      <div data-testid="page-search">
        <Header />
        <div className="input-search">
          <form action="">
            <label htmlFor="search">
              <input
                onChange={ this.onInputChange }
                value={ search }
                type="text"
                name="search"
                data-testid="search-artist-input"
              />
            </label>
            <button
              disabled={ btnSearchDisable }
              onClick={ this.searchButtonClick }
              type="button"
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
          </form>
        </div>
        <div>
          {!albums.length ? 'Nenhum álbum foi encontrado' : (
            <div>
              <h1>{ `Resultado de álbuns de: ${searchValue}`}</h1>
              {albums.map(({
                artistName,
                collectionId,
                collectionName,
                artworkUrl100,
                collectionPrice,
                releaseDate,
                trackCount,
              }) => (
                <div key={ collectionId }>
                  <img src={ artworkUrl100 } alt={ artistName } />
                  <h3>{ artistName }</h3>
                  <p>{ collectionPrice }</p>
                  <p>{ releaseDate }</p>
                  <p>{ trackCount }</p>
                  <Link
                    to={ `/album/${collectionId}` }
                    data-testid={ `link-to-album-${collectionId}` }
                  >
                    { collectionName }
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
