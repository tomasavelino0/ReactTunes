import React, { Component } from 'react';
import propTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { musicObj, handleFavoriteCheckbox, favoriteSongs } = this.props;
    const { trackName, previewUrl, trackId } = musicObj;

    return (
      <div>
        <div>
          <h2>{trackName}</h2>
        </div>
        <div>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor="favorites">
            Favorita
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              name={ trackId }
              onChange={ (e) => {
                handleFavoriteCheckbox(e, musicObj);
              } }
              checked={ favoriteSongs.includes(trackId) }

            />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {

  musicObj: propTypes.shape({
    trackName: propTypes.string.isRequired,
    trackId: propTypes.number.isRequired,
    previewUrl: propTypes.string.isRequired,
  }).isRequired,
  handleFavoriteCheckbox: propTypes.func.isRequired,
  favoriteSongs: propTypes.arrayOf(propTypes.number).isRequired,
};

export default MusicCard;
