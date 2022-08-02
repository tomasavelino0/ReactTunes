import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
    state = {
      user: {},
    }

    async componentDidMount() {
      const user = await getUser();
      this.setState({ user });
    }

    render() {
      const { user } = this.state;
      const { name } = user;

      return (
        <header data-testid="header-component">
          {name ? (
            <p data-testid="header-user-name">{name}</p>
          ) : (
            <Loading />
          )}
        </header>
      );
    }
}

export default Header;
