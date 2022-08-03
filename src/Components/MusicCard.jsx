import React, { Component } from 'react';
import propTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { music, trackName } = this.props;
    return (
      <div>
        <div>
          <p>{trackName}</p>
        </div>
        <div>
          <audio data-testid="audio-component" src={ music } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
        </div>
        <div>
          <input type="checkbox" />
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: propTypes.string.isRequired,
  trackName: propTypes.string.isRequired,
};

export default MusicCard;
