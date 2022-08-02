import React from 'react';
import Header from '../Components/Header';

class Search extends React.Component {
  state = {
    btnSearchDisable: true,
    search: '',
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
    const { btnSearchDisable, search } = this.state;
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
              type="button"
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
