import React from 'react';
import { Link } from 'react-router-dom';
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
          <h2 data-testid="header-user-name">{name}</h2>
          {name ? (
            <div>
              <div>
                <nav>
                  <Link data-testid="link-to-search" to="/search">
                    Search
                  </Link>

                  <Link data-testid="link-to-favorites" to="/favorites">
                    Favorites
                  </Link>

                  <Link data-testid="link-to-profile" to="/profile">
                    Profile
                  </Link>
                </nav>
              </div>
            </div>
          ) : (
            <Loading />
          )}
        </header>
      );
    }
}

export default Header;
