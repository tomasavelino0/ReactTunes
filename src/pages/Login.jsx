import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../Components/Loading';

console.log(createUser({ name: 'Tomas' }));

class login extends React.Component {
  constructor() {
    super();
    this.state = {
      nameLogin: '',
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
    const { nameLogin } = this.state;
    const minCaracters = 3;
    if (nameLogin.length >= minCaracters) {
      this.setState({
        btnLogin: false,
      });
    }
  }

  saveNameUser = async () => {
    const { nameLogin } = this.state;
    this.setState({ statusLogin: 'LOADING' }, async () => {
      const loginSucess = await createUser({ nameLogin });
      this.setState({ statusLogin: loginSucess });
    });
  };

  render() {
    const { btnLogin, nameLogin, statusLogin } = this.state;
    return (
      <div data-testid="page-login">
        {statusLogin === 'UNDEFINED' ? (
          <div>
            <h1>Login</h1>
            <label htmlFor="nameLogin">
              Name:

              <input
                value={ nameLogin }
                data-testid="login-name-input"
                type="text"
                name="nameLogin"
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
