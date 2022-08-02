import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../Components/Loading';

class login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      btnLogin: true,
      statusLogin: 'UNDEFINED',
    };
  }

  onInputChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: value,
    }, () => {
      this.enableButton();
    });
  };

  enableButton = () => {
    const { name } = this.state;
    const minCaracters = 3;
    if (name.length >= minCaracters) {
      this.setState({
        btnLogin: false,
      });
    }
  }

  saveNameUser = async () => {
    const { name } = this.state;
    this.setState({ statusLogin: 'LOADING' }, async () => {
      const loginSucess = await createUser({ name });
      this.setState({ statusLogin: loginSucess });
    });
  };

  render() {
    const { btnLogin, name, statusLogin } = this.state;
    return (
      <div data-testid="page-login">
        {statusLogin === 'UNDEFINED' ? (
          <div>
            <h1>Login</h1>
            <label htmlFor="name">
              Name:

              <input
                value={ name }
                data-testid="login-name-input"
                type="text"
                name="name"
                onChange={ this.onInputChange }
              />
            </label>

            <button
              onClick={ this.saveNameUser }
              disabled={ btnLogin }
              data-testid="login-submit-button"
              type="button"

            >
              Entrar

            </button>
          </div>
        ) : (
          <div>
            {statusLogin === 'LOADING' ? (
              <Loading />
            ) : (
              <Redirect to="/search" />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default login;
