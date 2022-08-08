import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';
import Loading from '../Components/Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    loading: false,
    album: {},
    tracks: [],
    favoriteSongs: [],
  };

  async componentDidMount() {
    this.getTracksAndAlbum();
    this.loadFavoriteSongs();
  }

  loadFavoriteSongs = () => {
    this.setState({ loading: true }, async () => {
      const favoriteTracks = await getFavoriteSongs();
      const favoriteTracksId = favoriteTracks.map((song) => song.trackId);
      this.setState({ favoriteSongs: favoriteTracksId, loading: false });
    });
  };

  handleFavoriteCheckbox = (e, musicObj) => {
    const { favoriteSongs } = this.state;
    const { target } = e;
    const { name } = target;
    if (target.checked) {
      favoriteSongs.push(parseInt(name, 10));
      this.setState({ loading: true }, async () => {
        const response = await addSong(musicObj);
        if (response === 'OK') {
          this.setState({
            loading: false,
          });
        }
      });
    } else {
      favoriteSongs.splice(favoriteSongs.indexOf(parseInt(name, 10)), 1);
      this.setState({ loading: true }, async () => {
        const response = await removeSong(musicObj);
        if (response === 'OK') {
          this.setState({
            loading: false,
          });
        }
      });
    }
    this.setState({
      favoriteSongs,
    });
  }

  getTracksAndAlbum = () => {
    this.setState({ loading: true }, async () => {
      const { match } = this.props;
      const { id } = match.params;
      const response = await getMusics(id);
      const albumInfo = response[0];
      const musics = response.filter((music) => music.kind === 'song');
      this.setState({
        loading: false,
        album: albumInfo,
        tracks: musics,
      });
    });
  }

  render() {
    const { loading, album, tracks, favoriteSongs } = this.state;
    const { collectionName, artworkUrl100, artistName } = album;
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <div>
              <img
                src={ artworkUrl100 }
                alt={ collectionName }
              />
              <p data-testid="album-name">
                {collectionName}
              </p>
              <p data-testid="artist-name">
                {artistName}
              </p>
            </div>
            <div>
              {tracks.map((music) => (
                <MusicCard
                  key={ music.trackId }
                  handleFavoriteCheckbox={ this.handleFavoriteCheckbox }
                  favoriteSongs={ favoriteSongs }
                  musicObj={ music }
                  trackName={ music.trackName }
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
