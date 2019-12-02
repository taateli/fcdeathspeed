import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPlayers } from '../../actions/players';
import Player from './Player';

const Players = ({ players: { players, loading }, getPlayers }) => {
  useEffect(() => {
    getPlayers();
  }, [getPlayers]);

  return (
    <div>
      <h1 class='center'>Pelaajat</h1>
      {loading
        ? 'loading'
        : players.map(player => {
            return <Player player={player}></Player>;
          })}
    </div>
  );
};

Players.propTypes = {
  getPlayers: PropTypes.func.isRequired,
  players: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  players: state.players
});

export default connect(mapStateToProps, { getPlayers })(Players);
